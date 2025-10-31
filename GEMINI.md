# Project Overview

This project appears to be focused on data analytics using Google BigQuery, as indicated by the `.env` file configuring a BigQuery project.

# Key Files

*   `.env`: Contains environment variables for connecting to Google BigQuery, including the project ID and location.

# Usage

This directory is likely used for running scripts or notebooks that interact with BigQuery for data analysis, querying, and reporting.

## BigQuery Data Overview

### Dataset: `customer_data_retail`
### Table: `customers`

**Schema Summary:**
The `customers` table contains 5000 rows and includes the following key columns:
*   `customer_id`: Unique identifier for each customer.
*   `age`, `gender`, `location`: Demographic information.
*   `registration_date`, `first_purchase_date`, `date_of_last_purchase`: Customer lifecycle dates.
*   `acquisition_source`: How customers were acquired.
*   `total_number_of_orders`, `average_order_value`, `total_spent_ltv`: Purchase metrics, with `total_spent_ltv` representing Customer Lifetime Value.
*   `purchase_frequency`, `average_items_per_order`: Purchase behavior indicators.
*   `primary_shopping_channel`: Preferred shopping method.
*   `discount_affinity`: Propensity to use discounts.
*   `preferred_categories`, `style_preference`, `size_general`, `shoe_size`: Customer preferences.
*   `return_rate_percent`: Customer return behavior.

# Workflow: Adding New Customer Segments

When a new customer segment is identified and analyzed, follow these steps to document and integrate it into the repository:

1.  **Identify and Define the Segment:** Clearly define the criteria for the new customer segment based on data analysis.
2.  **Perform Analysis and Extract Data:** Use BigQuery (or other relevant tools) to extract the customer data for the identified segment.
3.  **Create a Dedicated Markdown File:**
    *   Create a new markdown file (e.g., `[segment_name].md`) in the root directory.
    *   Include a "Use Case Description" explaining the segment's value.
    *   Detail the "Segmentation Criteria" with any thresholds and their derivation.
    *   Provide the "BigQuery Implementation" (SQL query) used to retrieve the segment.
    *   Suggest "How to Use This Segment" with actionable insights.
4.  **Update `README.md`:**
    *   Under the `## Customer Segmentation` heading, add a new sub-heading for the new segment.
    *   Provide a brief description of the segment.
    *   Include a link to the newly created markdown file (e.g., `[Segment Name]([segment_name].md)`).