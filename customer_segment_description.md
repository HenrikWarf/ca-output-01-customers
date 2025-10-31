xx
# Customer Segmentation: High-Value, High-Frequency Young Adults

## Use Case Description

This document outlines a customer segmentation strategy focused on identifying a highly valuable and engaged group of young adult customers. The primary goal of this segment is to enable targeted marketing efforts, personalized campaigns, and optimized customer relationship management for a demographic that shows strong purchasing behavior and lifetime value potential.

**Why this segment is valuable:**
*   **High Lifetime Value (`total_spent_ltv`):** These customers have already demonstrated significant spending, indicating strong potential for continued revenue.
*   **High Purchase Frequency:** Regular purchases suggest loyalty and consistent engagement with the brand.
*   **Young Adult Demographic (20-39 years old):** This age group often represents a long-term customer base with evolving needs and purchasing power, making them ideal candidates for fostering brand loyalty and growth.

## Segmentation Criteria

To identify customers within this segment, we applied the following criteria:

1.  **Age:** Customers between 20 and 39 years old (inclusive).
2.  **Purchase Frequency:** Customers categorized with a `purchase_frequency` of 'High'.
3.  **Total Spent LTV:** Customers with a `total_spent_ltv` greater than or equal to `1090.77`.
    *   _Note:_ The `1090.77` threshold was determined as the 75th percentile of `total_spent_ltv` specifically for customers with a 'High' `purchase_frequency`, ensuring we capture the top spenders within this already engaged group.

## BigQuery Implementation

The following SQL query can be used to retrieve this specific customer segment from the `customer_data_retail.customers` table in Google BigQuery:

```sql
SELECT
  customer_id,
  age,
  gender,
  location,
  total_spent_ltv,
  purchase_frequency,
  average_order_value,
  total_number_of_orders,
  primary_shopping_channel,
  preferred_categories,
  style_preference
FROM
  `customer_data_retail.customers`
WHERE
  age BETWEEN 20 AND 39
  AND purchase_frequency = 'High'
  AND total_spent_ltv >= 1090.77;
```

## How to Use This Segment

This identified segment can be leveraged for various business strategies, including but not limited to:

*   **Personalized Marketing Campaigns:** Tailor product recommendations, promotional offers, and content specifically for young adults with high spending and frequent purchasing habits.
*   **Loyalty Programs:** Offer exclusive benefits or early access to new products to further incentivize their continued engagement and spending.
*   **Customer Retention Strategies:** Develop targeted communication strategies to ensure these valuable customers remain satisfied and loyal.
*   **Feedback and Insights:** Engage with this segment to gather feedback on new products or services, as their behavior is indicative of strong market trends.
