# Target Users

Given the technical nature of the Gemini CLI and its integration with BigQuery for data analytics, this solution is primarily designed for:

*   **Data Analysts and Scientists:** Professionals who regularly perform complex queries, analyze large datasets in BigQuery, and need to extract insights for reporting and strategic planning.
*   **Data Engineers:** Responsible for building, managing, and optimizing data pipelines and infrastructure that interact with BigQuery.
*   **Business Intelligence Developers:** Who leverage BigQuery data to create and maintain analytical reports and dashboards.
*   **Cloud Data Specialists:** Managing and administering BigQuery resources, datasets, and tables.

# Gemini CLI BigQuery Project Template Instructions

This document provides comprehensive instructions for setting up and utilizing this repository as a template for new BigQuery data analytics projects with the Gemini CLI. It covers initial setup, integrating new BigQuery data, defining analytical use cases, and running analyses.

## I. Initial Project Setup

1.  **Clone or Copy the Repository:**
    Start by duplicating this repository to your local machine or a new project directory.
    ```bash
    git clone <this_repo_url> my-new-bq-project
    cd my-new-bq-project
    ```
    (If you're copying, ensure you remove the `.git` directory if you intend to initialize a new Git repository.)

2.  **Install Gemini CLI:**
    Ensure you have the Gemini CLI installed and configured. Refer to the official Gemini CLI documentation for installation instructions if needed.

3.  **Install BigQuery Extension:**
    To enable BigQuery functionalities, install the BigQuery extension for Gemini CLI: 
    ```bash
    gemini extensions install https://github.com/gemini-cli-extensions/bigquery-data-analytics
    ```

4.  **Configure Environment Variables (`.env`):
    The `.env` file is crucial for connecting to your BigQuery project.
    *   Open the `.env` file in your new project directory.
    *   Set the `BIGQUERY_PROJECT` variable to your Google Cloud Project ID where your BigQuery data resides.
    *   Optionally, set `BIGQUERY_LOCATION` if your dataset is not in the default location.

    Example `.env` content:
    ```
    BIGQUERY_PROJECT=your-gcp-project-id
    BIGQUERY_LOCATION=us-central1
    ```

5.  **Install Application Dependencies:**
    If you plan to use the `app/` directory for frontend visualization or other Node.js-based functionalities, you need to install its dependencies.
    ```bash
    cd app/
    npm install
    cd ..
    ```

6.  **Running and Accessing the Application:**
    The `app/` directory contains a simple Node.js application that can serve as a frontend for your data visualizations.

    *   **To Run the Application:**
        From the project root directory, execute:
        ```bash
        cd app/
        npm start
        ```
        This will typically start a local web server.
    *   **To Access the Application:**
        Open your web browser and navigate to the address provided by the `npm start` command (usually `http://localhost:3000` or similar).

## II. Integrating New BigQuery Data and Updating `GEMINI.md`

The `GEMINI.md` file serves as the primary context for the Gemini CLI, describing your BigQuery data structure. This section guides you on updating it for your new project.

1.  **Identify Your BigQuery Data:**
    Determine the specific BigQuery dataset(s) and table(s) you intend to analyze in your new project. You can use the Gemini CLI to help discover your available data.

    **Examples of questions to ask the Gemini CLI to identify your BigQuery data:**
    *   "List all datasets in my BigQuery project."
    *   "Show me all tables in the 'your_dataset_id' dataset."
    *   "What is the schema for the 'your_dataset_id.your_table_id' table?"
    *   "Describe the 'your_dataset_id.your_table_id' table."

2.  **Discover BigQuery Schema using Gemini CLI Tools:**
    You can use the Gemini CLI's BigQuery extension to inspect your data. This extension allows you to list available datasets within your Google Cloud Project and then list the tables within a specific dataset. You can also retrieve detailed schema information (column names, types, descriptions) for any given table.

3.  **Automate `GEMINI.md` Update (Using the `/initiate_repo` command):**
    The `/initiate_repo` command is designed to set up the connection to BigQuery and document the data structure in the `GEMINI.md` context file. It uses the information gathered from discovering your BigQuery schema to populate the "BigQuery Data Overview" section of `GEMINI.md`.

    *   **How to Use:**
        ```bash
        /initiate_repo
        ```
        This command will guide you through selecting the dataset and table to document.

4.  **Manually Refine `GEMINI.md`:**
    After the automated update, open `GEMINI.md` and review the "BigQuery Data Overview" section.
    *   Ensure the `Project Overview` and `Key Files` sections are relevant to your new project.
    *   Add any additional context, business logic, or important notes about your data that the automated schema might not capture. For example, clarify the meaning of specific columns or relationships between tables.

## III. Defining Analytical Use Cases

This repository uses the `/save_analysis` command to streamline the process of documenting and integrating new customer segments or analyses. When you have a use case ready to be saved, you can call this command, and it will automate the following steps:

*   **Create a Dedicated Markdown File:** A new markdown file (e.g., `[segment_name].md`) will be created in the `use_case_docs/` directory. This file will include a "Use Case Description," "Segmentation Criteria," "BigQuery Implementation" (SQL query), and "How to Use This Segment."
*   **Update `README.md`:** The `README.md` file will be updated under the `## Customer Segmentation` heading with a new sub-heading for the segment, a brief description, and a link to the newly created markdown file.
*   **Create JSON Configuration File:** A corresponding JSON configuration file will be created in the `config/` directory. This file will adhere to a predefined structure, including fields for `name`, `category`, `description`, `insights`, `query`, and `visualization` parameters.

**How to Use the `/save_analysis` Command:**
When you have completed an analysis and are ready to save it, simply run:
```bash
/save_analysis
```
The command will then prompt you for the necessary details to generate the documentation and configuration files.

## IV. Running Analyses with Gemini CLI

Once your `GEMINI.md` is updated and your data context is established, you can leverage the Gemini CLI for natural language data analysis. The Gemini CLI, powered by its BigQuery Extension, can interpret your questions, generate the appropriate SQL queries, and execute them against your BigQuery data. This allows you to derive insights without writing SQL manually.

**Process for Natural Language Analysis:**

1.  **Ask a Question:** Simply pose your data-related questions in natural language directly to the Gemini CLI. The more context you provide (referencing column names, metrics, and desired outcomes), the better the generated SQL will be.
2.  **SQL Generation and Execution:** The Gemini CLI will use its BigQuery Extension to understand your query, generate the corresponding BigQuery SQL, and then execute it.
3.  **Receive Insights:** The results of the SQL query will be presented to you, providing the insights you requested.

**Examples of Questions to Ask:**

*   "Show me the total number of orders and average order value by acquisition source."
*   "What is the distribution of customers by age and gender."
*   "Identify the top 10 customers by total spent (LTV) and their primary shopping channel."
*   "How many customers registered in the last quarter?"
*   "Calculate the average return rate percentage for each preferred category."
*   "Find customers who have a high purchase frequency but a low average order value."
*   "What are the most preferred categories among customers with high total spent?"
*   "Analyze the average items per order for each style preference."
*   "Show me the trend of new customer registrations over time."

## V. Advanced Usage and Customization

*   **Creating New Gemini Commands:** To automate complex workflows or frequently used analyses, create new shell scripts in the `.gemini/commands/` directory. These scripts can combine multiple Gemini CLI tool calls (e.g., `execute_sql`, `analyze_contribution`, `forecast`) and leverage your `config/*.json` files.
*   **Leveraging Other BigQuery Tools:** Explore other available BigQuery tools in the Gemini CLI (e.g., `analyze_contribution`, `forecast`) to perform more advanced data analytics tasks.