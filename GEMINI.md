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

# Workflow: Creating JSON Configuration Files for Analysis

For each significant analysis or customer segment identified, a corresponding JSON configuration file should be created in the `config/` directory. These files serve to standardize the documentation of analysis results and provide a machine-readable format for potential applications.

Each JSON file should adhere to the following structure:

```json
{
  "name": "[Name of the Segment/Analysis]",
  "category": "[Category of the analysis, e.g., 'Customer Segmentation']",
  "description": "[A brief description of the segment or analysis]",
  "insights": "[Key insights derived from the analysis, actionable information]",
  "query": "[The BigQuery SQL query used to retrieve the data for this segment/analysis]",
  "visualization": {
    "type": "[Type of D3 plot, e.g., 'bar', 'line', 'scatter']",
    "x_axis": "[Column name for the x-axis]",
    "y_axis": "[Column name for the y-axis]",
    "color_by": "[Optional: Column name to color data points by]",
    "tooltip": "[Optional: Array of column names to display in tooltips]"
  }
}
```

**Fields Description:**

*   `name` (string): A concise, human-readable name for the customer segment or analysis.
*   `category` (string): A broad category for the analysis or segment (e.g., 'Customer Segmentation', 'Product Performance').
*   `description` (string): A more detailed explanation of what the segment represents or what the analysis covers.
*   `insights` (string): A summary of the key findings, actionable recommendations, or strategic implications derived from this segment/analysis.
*   `query` (string): The complete and executable BigQuery SQL query that can be used to reproduce or retrieve the data for this specific segment or analysis. The query should be a single-line string with escaped newlines if necessary.
*   `visualization` (object): Defines how the data should be visualized using D3.
    *   `type` (string): The type of D3 plot to generate (e.g., 'bar', 'line', 'scatter').
    *   `x_axis` (string): The column name from the query results to be used for the x-axis.
    *   `y_axis` (string): The column name from the query results to be used for the y-axis.
    *   `color_by` (string, optional): The column name to use for coloring data points or bars.
    *   `tooltip` (array of strings, optional): A list of column names whose values should be displayed in tooltips when hovering over data points.

