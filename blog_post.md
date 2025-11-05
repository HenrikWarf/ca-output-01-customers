# Unlocking Customer Insights: A Conversational Analytics Approach with BigQuery

In today's data-driven world, understanding your customers is paramount. This repository provides a powerful framework for performing conversational analytics on customer data stored in Google BigQuery, enabling businesses to quickly extract valuable insights and make informed decisions.

## What You Can Do and Its Value

This project empowers you to:

*   **Segment Customers Effectively:** Identify "at-risk" customers, "high-value young shoppers," and perform comprehensive RFM (Recency, Frequency, Monetary) segmentation. This allows for targeted marketing campaigns and personalized customer experiences.
*   **Analyze Shopping Behavior:** Understand primary shopping channel preferences across different age groups, purchase frequencies, and average order values.
*   **Gain Deep Customer Insights:** Explore demographic data, acquisition sources, discount affinity, preferred categories, and even return rates to build a holistic view of your customer base.
*   **Drive Data-Driven Decisions:** By making complex data accessible through conversational queries, you can rapidly answer critical business questions, optimize marketing spend, improve customer retention, and boost lifetime value.

The core value lies in transforming raw BigQuery data into actionable intelligence with unprecedented ease. Instead of writing complex SQL queries, you can interact with your data using natural language, making advanced analytics accessible to a wider audience within your organization.

## How Components Complement Each Other for Conversational Analytics

This repository is designed with a modular approach, where each component plays a crucial role in facilitating conversational analytics:

*   **Project Context (`GEMINI.md`):** The `GEMINI.md` file is critical for the Gemini-CLI solution. It provides essential context about the project, including an overview of the BigQuery data schema and key files. This document acts as a foundational knowledge base, enabling the Gemini-CLI to understand the data landscape and respond intelligently to your analytical queries.
*   **BigQuery Integration (`.env`):** The `.env` file securely configures your Google BigQuery project ID, acting as the central data warehouse for all your customer information. This ensures seamless and secure access to your valuable data.
*   **Pre-defined Analytical Configurations (`config/`):** The `config/` directory houses JSON files that define specific analytical queries and customer segments (e.g., `at_risk_customers.json`, `rfm_customer_segmentation.json`). These configurations act as blueprints, allowing the system to understand and execute complex analytical tasks based on simple requests.
*   **Use Case Documentation (`use_case_docs/`):** Markdown files in `use_case_docs/` provide detailed explanations for each analytical use case. This documentation is vital for both understanding the business context of each analysis and for guiding the conversational AI in interpreting user requests accurately.
*   **Pre-defined Prompts/Workflows (`.gemini/commands/*.toml`):** The `.gemini/commands/` directory contains TOML files that define pre-configured prompts and workflows for the Gemini-CLI. These include:
    *   `initiate_repo.toml`: A command to help populate the `GEMINI.md` file with BigQuery data structure details, ensuring the CLI has accurate context.
    *   `save_analysis.toml`: A comprehensive workflow for documenting and integrating new customer segment analyses, including creating Markdown documentation and JSON configuration files for the web application.
    *   `git_commit.toml`: An automated process for generating conventional commit messages and committing changes to the repository, streamlining version control.
    These workflows significantly enhance the efficiency and consistency of interacting with the repository and managing analytical outputs.
*   **Interactive Web Application (`app/`):** The `app/` directory contains a Node.js Express web application. This application serves as the front-end interface, allowing users to input natural language queries, visualize results, and interact with the analytical capabilities of the system. It acts as the bridge between the user's conversational input and the BigQuery backend.
*   **Conversational AI (You!):** The CLI agent (you, the Gemini model) acts as the brain of the operation. By understanding user prompts, you leverage the pre-defined configurations, BigQuery integration, and the web application to fetch, process, and present customer insights in a conversational manner.

Together, these components create a powerful ecosystem where business users can ask questions in plain language, and the system intelligently translates those questions into BigQuery queries, retrieves the data, and presents actionable insights, all within an interactive environment.

## How to Use the Repo and Set Everything Up

The work environment for this solution is a powerful combination of tools: the Gemini-CLI for conversational interaction, Visual Studio Code with Gemini-CLI integration for development, Google BigQuery as the data backbone, a Web Application for interactive insights and visualization, and GitHub for sharing insights and customer segments.

Getting started with this conversational analytics repository is straightforward:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-repo-link/cli_conversational_analytics.git
    cd cli_conversational_analytics
    ```

2.  **Set Up BigQuery Project:**
    *   Ensure you have a Google Cloud Project with BigQuery enabled.
    *   Your customer data should be loaded into a BigQuery dataset and table, as described in the `GEMINI.md` (e.g., `customer_data_retail.customers`).
    *   Create a `.env` file in the root directory of the project based on the `GEMINI.md.template` and populate it with your BigQuery project ID:
        ```
        BIGQUERY_PROJECT=your-gcp-project-id
        ```
    *   Ensure the service account used by the application has the necessary BigQuery roles (`BigQuery User` and `BigQuery Data Editor` are typically sufficient).

3.  **Install Dependencies:**

    *   **Web Application Dependencies:**
        ```bash
        cd app
        npm install
        cd ..
        ```
    *   **Python Virtual Environment (for CLI agent interaction, if applicable):**
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        # Install any Python dependencies here if needed, e.g., pip install google-cloud-bigquery
        ```

4.  **Run the Web Application:**
    ```bash
    cd app
    npm start
    ```
    This will start the web server, typically on `http://localhost:3000`.

5.  **Interact with the Conversational AI (You!) and Workflows:**
    Once the web application is running and your BigQuery is configured, you can begin interacting with the CLI agent (me!). You can ask questions like:
    *   "Show me the top 10 high-value young shoppers."
    *   "What is the average order value for customers acquired through social media?"
    *   "Identify customers at risk of churn based on their last purchase date."
    You can also leverage the pre-defined workflows by invoking them through the Gemini-CLI, for example, to initiate repository setup or save a new analysis.

By following these steps, you'll have a fully functional conversational analytics environment ready to unlock deep insights from your customer data.
