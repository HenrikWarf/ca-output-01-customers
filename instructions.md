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

3.  **Configure Environment Variables (`.env`):
    The `.env` file is crucial for connecting to your BigQuery project.
    *   Open the `.env` file in your new project directory.
    *   Set the `BIGQUERY_PROJECT` variable to your Google Cloud Project ID where your BigQuery data resides.
    *   Optionally, set `BIGQUERY_LOCATION` if your dataset is not in the default location.

    Example `.env` content:
    ```
    BIGQUERY_PROJECT=your-gcp-project-id
    BIGQUERY_LOCATION=us-central1
    ```

## II. Integrating New BigQuery Data and Updating `GEMINI.md`

The `GEMINI.md` file serves as the primary context for the Gemini CLI, describing your BigQuery data structure. This section guides you on updating it for your new project.

1.  **Identify Your BigQuery Data:**
    Determine the specific BigQuery dataset(s) and table(s) you intend to analyze in your new project.

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

This repository uses `config/` for defining specific analytical queries and `use_case_docs/` for documenting them.

1.  **Create/Modify Configuration Files (`config/*.json`):
    *   Examine the existing JSON files in `config/` (e.g., `at_risk_customers.json`). These files define the parameters for BigQuery queries, such as fields to select, filters to apply, and metrics to calculate.
    *   Create new JSON files or modify existing ones to define the specific analyses you want to perform on your new BigQuery data.
    *   **Example:** If you want to analyze product sales by region, you might create `product_sales_by_region.json` with appropriate `model`, `explore`, `fields`, and `filters` for your new data.

2.  **Document Use Cases (`use_case_docs/*.md`):
    *   For every new or modified configuration file in `config/`, create a corresponding Markdown file in `use_case_docs/`.
    *   These documentation files should explain:
        *   The objective of the analysis.
        *   The BigQuery tables and columns involved.
        *   How the results should be interpreted.
        *   Any assumptions or limitations.

## IV. Running Analyses with Gemini CLI

Once your `GEMINI.md` is updated and your use cases are defined, you can leverage the Gemini CLI to run your analyses.

1.  **Execute Ad-hoc SQL Queries:**
    For quick data exploration or specific queries not covered by pre-defined commands:
    ```tool_code
    print(default_api.execute_sql(sql="SELECT * FROM `your-gcp-project-id.your_dataset_id.your_table_id` LIMIT 10"))
    ```

2.  **Use Pre-defined Commands (`.gemini/commands/`):
    The `.gemini/commands/` directory contains shell scripts that encapsulate common analytical tasks, often leveraging the `config/*.json` files.
    *   **Example:** To run the "at-risk customers" analysis (assuming you've adapted `at_risk_customers.json` to your new data):
        ```bash
        gemini run at_risk_customers_command.sh # (assuming a command script exists for this)
        ```
    *   Review the existing command scripts and adapt them or create new ones to execute your custom queries defined in `config/`. These scripts typically use `execute_sql` or other BigQuery tools with parameters from the JSON config files.

## V. Advanced Usage and Customization

*   **Creating New Gemini Commands:** To automate complex workflows or frequently used analyses, create new shell scripts in the `.gemini/commands/` directory. These scripts can combine multiple Gemini CLI tool calls (e.g., `execute_sql`, `analyze_contribution`, `forecast`) and leverage your `config/*.json` files.
*   **Leveraging Other BigQuery Tools:** Explore other available BigQuery tools in the Gemini CLI (e.g., `analyze_contribution`, `forecast`) to perform more advanced data analytics tasks.