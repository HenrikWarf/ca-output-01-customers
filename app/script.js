const useCaseList = document.getElementById('use-case-list');
const useCaseDetails = document.getElementById('use-case-details');

let allUseCases = []; // To store all fetched use case configurations

// Function to load a use case and render its details
async function loadUseCase(fileName) {
    try {
        const useCase = allUseCases.find(uc => uc.fileName === fileName);
        if (!useCase) {
            console.error(`Use case for ${fileName} not found.`);
            useCaseDetails.innerHTML = `<p style="color: red;">Error: Use case not found.</p>`;
            return;
        }

        useCaseDetails.innerHTML = `
            <h2>${useCase.name}</h2>
            <p><strong>Description:</strong> ${useCase.description}</p>
            <div class="insights-content"><strong>Insights:</strong> ${marked.parse(useCase.insights)}</div>
            <h3>BigQuery SQL Query:</h3>
            <div class="query-container">
                <pre><code class="language-sql" id="bigquery-query">${useCase.query}</code></pre>
                <button class="copy-button" onclick="copyQuery()">Copy</button>
            </div>
            <h3>Visualization:</h3>
            <div class="visualization-container" id="d3-visualization"></div>
        `;
        hljs.highlightElement(document.getElementById('bigquery-query'));

        // Visualize data
        await visualizeData(useCase);

        // Update active class for navigation
        Array.from(useCaseList.querySelectorAll('a')).forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`a[data-file="${fileName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

    } catch (error) {
        console.error('Error loading use case:', error);
        useCaseDetails.innerHTML = `<p style="color: red;">Error loading use case details.</p>`;
    }
}

// Function to simulate BigQuery query and visualize with D3.js
async function visualizeData(useCase) {
    const visualizationContainer = document.getElementById('d3-visualization');
    if (!visualizationContainer) {
        console.error('Visualization container not found.');
        return;
    }
    visualizationContainer.innerHTML = ''; // Clear previous visualization

    if (!useCase.visualization) {
        visualizationContainer.innerHTML = `<p>No visualization configuration found for this use case.</p>`;
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/query-bigquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: useCase.query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            visualizationContainer.innerHTML = `<p>No data returned for this query.</p>`;
            return;
        }

        const visConfig = useCase.visualization;
        const margin = { top: 20, right: 30, bottom: 60, left: 60 }; // Increased bottom and left margin for labels

        // Calculate width and height based on the container's actual size
        const containerWidth = visualizationContainer.clientWidth;
        const containerHeight = 450; // Set a default height or make it dynamic if needed

        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        const svg = d3.select(visualizationContainer)
            .append("svg")
            .attr("width", containerWidth)
            .attr("height", containerHeight)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add Tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px");

        // X and Y labels
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .style("text-anchor", "middle")
            .text(visConfig.x_axis);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .style("text-anchor", "middle")
            .text(visConfig.y_axis);

        if (visConfig.type === 'bar') {
            const x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d[visConfig.x_axis]))
                .padding(0.2);
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d[visConfig.y_axis])]).range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            svg.selectAll("mybar")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", d => x(d[visConfig.x_axis]))
                .attr("y", d => y(d[visConfig.y_axis]))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d[visConfig.y_axis]))
                .attr("fill", "#69b3a2")
                .on("mouseover", function(event, d) {
                    tooltip.style("opacity", 1);
                    let tooltipHtml = `<strong>${visConfig.x_axis}:</strong> ${d[visConfig.x_axis]}<br/><strong>${visConfig.y_axis}:</strong> ${d[visConfig.y_axis]}`;
                    if (visConfig.tooltip) {
                        visConfig.tooltip.forEach(col => {
                            tooltipHtml += `<br/><strong>${col}:</strong> ${d[col]}`;
                        });
                    }
                    tooltip.html(tooltipHtml)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 20) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.style("opacity", 0);
                });

        } else if (visConfig.type === 'scatter') {
            const x = d3.scaleLinear()
                .domain([d3.min(data, d => d[visConfig.x_axis]), d3.max(data, d => d[visConfig.x_axis])]).range([0, width]);
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d[visConfig.y_axis]), d3.max(data, d => d[visConfig.y_axis])]).range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            const color = d3.scaleOrdinal(d3.schemeCategory10);

            svg.append("g")
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => x(d[visConfig.x_axis]))
                .attr("cy", d => y(d[visConfig.y_axis]))
                .attr("r", 5)
                .style("fill", d => visConfig.color_by ? color(d[visConfig.color_by]) : "#69b3a2")
                .on("mouseover", function(event, d) {
                    tooltip.style("opacity", 1);
                    let tooltipHtml = `<strong>${visConfig.x_axis}:</strong> ${d[visConfig.x_axis]}<br/><strong>${visConfig.y_axis}:</strong> ${d[visConfig.y_axis]}`;
                    if (visConfig.color_by) {
                        tooltipHtml += `<br/><strong>${visConfig.color_by}:</strong> ${d[visConfig.color_by]}`;
                    }
                    if (visConfig.tooltip) {
                        visConfig.tooltip.forEach(col => {
                            tooltipHtml += `<br/><strong>${col}:</strong> ${d[col]}`;
                        });
                    }
                    tooltip.html(tooltipHtml)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 20) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.style("opacity", 0);
                });

        } else {
            visualizationContainer.innerHTML = `<p>Unsupported visualization type: ${visConfig.type}</p>`;
        }

        const titleElement = document.createElement('h4');
        titleElement.textContent = useCase.name;
        visualizationContainer.prepend(titleElement);

    } catch (error) {
        console.error('Error visualizing data:', error);
        visualizationContainer.innerHTML = `<p style="color: red;">Error visualizing data: ${error.message}</p>`;
    }
}

// Populate the navigation list
async function populateNavigation() {
    const categories = new Map(); // Map to store categories and their use cases

    try {
        const response = await fetch('http://localhost:3000/list-config-files');
        const fileNames = await response.json();

        // Fetch content for each use case file
        const fetchPromises = fileNames.map(async fileName => {
            try {
                const configResponse = await fetch(`./config/${fileName}`);
                const useCase = await configResponse.json();
                return { ...useCase, fileName }; // Store fileName along with useCase data
            } catch (error) {
                console.error(`Error loading config file ${fileName}:`, error);
                return null; // Return null for failed fetches
            }
        });

        allUseCases = (await Promise.all(fetchPromises)).filter(uc => uc !== null); // Filter out failed fetches

    } catch (error) {
        console.error('Error fetching config file list:', error);
        useCaseList.innerHTML = `<p style="color: red;">Error loading use cases: ${error.message}</p>`;
        return;
    }

    useCaseList.innerHTML = ''; // Clear existing list

    // Group use cases by category
    allUseCases.forEach(useCase => {
        if (!categories.has(useCase.category)) {
            categories.set(useCase.category, []);
        }
        categories.get(useCase.category).push(useCase);
    });

    for (const [category, cases] of categories.entries()) {
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category;
        useCaseList.appendChild(categoryHeader);

        const categoryUl = document.createElement('ul');
        cases.forEach(useCase => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = "#";
            link.textContent = useCase.name;
            link.setAttribute('data-file', useCase.fileName);
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadUseCase(useCase.fileName);
            });
            listItem.appendChild(link);
            categoryUl.appendChild(listItem);
        });
        useCaseList.appendChild(categoryUl);
    }

    // Load the first use case of the first category by default
    if (allUseCases.length > 0) {
        const firstCategory = categories.keys().next().value;
        if (firstCategory) {
            const firstUseCase = categories.get(firstCategory)[0];
            if (firstUseCase) {
                loadUseCase(firstUseCase.fileName);
            }
        }
    }
}

function copyQuery() {
    const queryElement = document.getElementById('bigquery-query');
    const queryText = queryElement.textContent;
    navigator.clipboard.writeText(queryText).then(() => {
        alert('BigQuery query copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy query: ', err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateNavigation();
});