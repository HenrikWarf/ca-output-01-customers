document.addEventListener('DOMContentLoaded', () => {
    const useCaseList = document.getElementById('use-case-list');
    const useCaseDetails = document.getElementById('use-case-details');

    // Hardcoded list of use case files for demonstration purposes.
    // In a real application, this would be fetched from a backend API.
    const useCaseFiles = [
        'at_risk_customers.json',
        'high_value_young_shoppers.json'
    ];

    // Function to load a use case and render its details
    async function loadUseCase(fileName) {
        try {
            const response = await fetch(`./config/${fileName}`);
            const useCase = await response.json();

            useCaseDetails.innerHTML = `
                <h2>${useCase.name}</h2>
                <p><strong>Description:</strong> ${useCase.description}</p>
                <p><strong>Insights:</strong> ${useCase.insights}</p>
                <h3>Visualization:</h3>
                <div class="visualization-container" id="d3-visualization"></div>
            `;

            // Simulate BigQuery query execution and visualize data
            await visualizeData(useCase.query);

            // Update active class for navigation
            Array.from(useCaseList.children).forEach(li => {
                li.querySelector('a').classList.remove('active');
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
    async function visualizeData(query) {
        const visualizationContainer = document.getElementById('d3-visualization');
        if (!visualizationContainer) {
            console.error('Visualization container not found.');
            return;
        }
        visualizationContainer.innerHTML = ''; // Clear previous visualization

        // In a real application, this query would be sent to a backend
        // which then executes it against BigQuery and returns the results.
        // For this simple web app, we'll use mock data based on the query intent.

        let mockData = [];
        let chartType = '';

        if (query.includes('total_spent_ltv') && query.includes('age')) {
            // Mock data for high_value_young_shoppers: age vs total_spent_ltv
            chartType = 'Scatter Plot (Age vs. LTV)';
            for (let i = 0; i < 50; i++) {
                mockData.push({
                    age: Math.floor(Math.random() * 15) + 18, // Ages 18-32
                    ltv: Math.floor(Math.random() * 2000) + 500 // LTV $500-$2500
                });
            }
        } else if (query.includes('return_rate_percent') && query.includes('customer_id')) {
            // Mock data for at_risk_customers: return_rate_percent distribution
            chartType = 'Bar Chart (Return Rate Distribution)';
            const bins = ["0-5%", "5-10%", "10-15%", "15-20%", "20%+ "];
            mockData = bins.map(bin => ({
                range: bin,
                count: Math.floor(Math.random() * 100) + 20
            }));
        } else {
            visualizationContainer.innerHTML = `<p>No specific visualization logic for this query. Query: ${query}</p>`;
            return;
        }

        // D3.js Visualization
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(visualizationContainer)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        if (chartType.includes('Scatter Plot')) {
            // Scatter plot for Age vs. LTV
            const x = d3.scaleLinear()
                .domain([d3.min(mockData, d => d.age) - 1, d3.max(mockData, d => d.age) + 1]).range([0, width]);
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            const y = d3.scaleLinear()
                .domain([d3.min(mockData, d => d.ltv) - 100, d3.max(mockData, d => d.ltv) + 100]).range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            svg.append("g")
                .selectAll("dot")
                .data(mockData)
                .enter()
                .append("circle")
                .attr("cx", d => x(d.age))
                .attr("cy", d => y(d.ltv))
                .attr("r", 5)
                .style("fill", "#69b3a2");

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 5)
                .style("text-anchor", "middle")
                .text("Age");

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left + 10)
                .attr("x", -height / 2)
                .style("text-anchor", "middle")
                .text("Total Spent LTV");

        } else if (chartType.includes('Bar Chart')) {
            // Bar chart for Return Rate Distribution
            const x = d3.scaleBand()
                .range([0, width])
                .domain(mockData.map(d => d.range))
                .padding(0.2);
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            const y = d3.scaleLinear()
                .domain([0, d3.max(mockData, d => d.count) + 20]).range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            svg.selectAll("mybar")
                .data(mockData)
                .enter()
                .append("rect")
                .attr("x", d => x(d.range))
                .attr("y", d => y(d.count))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.count))
                .attr("fill", "#69b3a2");

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 5)
                .style("text-anchor", "middle")
                .text("Return Rate Range");

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left + 10)
                .attr("x", -height / 2)
                .style("text-anchor", "middle")
                .text("Number of Customers");
        }

        // Create and prepend the title more robustly
        const titleElement = document.createElement('h4');
        titleElement.textContent = chartType;
        visualizationContainer.prepend(titleElement);
    }

    // Populate the navigation list
    useCaseFiles.forEach(fileName => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = "#";
        link.textContent = fileName.replace('.json', '').replace(/_/g, ' ');
        link.setAttribute('data-file', fileName);
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadUseCase(fileName);
        });
        listItem.appendChild(link);
        useCaseList.appendChild(listItem);
    });

    // Load the first use case by default
    if (useCaseFiles.length > 0) {
        loadUseCase(useCaseFiles[0]);
    }
});