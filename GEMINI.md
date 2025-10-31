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