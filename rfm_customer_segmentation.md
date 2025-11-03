# RFM Customer Segmentation

## Use Case Description
This analysis segments customers based on their Recency (how recently they purchased), Frequency (how often they purchase), and Monetary (how much they spend) values. This helps in identifying different customer groups for targeted marketing strategies. RFM segmentation allows for a deeper understanding of customer behavior, enabling businesses to tailor campaigns, improve retention, and optimize resource allocation. For example, 'Champions' (high R, F, M) are your best customers, while 'At-Risk' customers (low R, F, M) might need re-engagement.

## Segmentation Criteria
Customers are segmented based on their Recency, Frequency, and Monetary values.
*   **Recency**: How recently a customer made a purchase (lower values are better).
*   **Frequency**: How often a customer makes purchases (higher values are better).
*   **Monetary**: How much money a customer spends (higher values are better).

## BigQuery Implementation
The following SQL query is used to retrieve the Recency, Frequency, and Monetary values for each customer:

```sql
SELECT
  customer_id,
  DATE_DIFF(CURRENT_DATE(), PARSE_DATE('%Y-%m-%d', SUBSTR(CAST(date_of_last_purchase AS STRING), 1, 10)), DAY) AS Recency,
  total_number_of_orders AS Frequency,
  total_spent_ltv AS Monetary
FROM
  `customer_data_retail.customers`
```

## How to Use This Segment
This segment can be used to:
*   Identify your most valuable customers (Champions).
*   Target specific customer groups with tailored marketing campaigns.
*   Develop strategies to re-engage at-risk customers.
*   Optimize resource allocation for customer retention and acquisition.
