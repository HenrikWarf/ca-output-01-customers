
# Customer Segmentation: At-Risk Customers

## Use Case Description

This segment identifies customers who are showing signs of disengagement and are at a higher risk of churning. Proactively identifying these customers allows for targeted re-engagement strategies to prevent churn and retain valuable customer relationships.

**Why this segment is valuable:**
*   **Proactive Retention:** Allows the business to intervene before customers fully churn.
*   **Cost-Effective:** Retaining existing customers is often more cost-effective than acquiring new ones.
*   **Customer Relationship Management:** Helps in maintaining a healthy customer base and understanding potential issues.

## Segmentation Criteria

To identify customers within this 'At-Risk' segment, we applied the following criteria:

1.  **Lack of Recent Activity:** More than 305 days since their last purchase.
    *   _Note:_ The `305` days threshold was determined as the 75th percentile of days since last purchase across all customers, indicating a longer-than-average period of inactivity.
2.  **Low Purchase Frequency:** Total number of orders is less than or equal to 4.
    *   _Note:_ The `4` orders threshold was determined as the 25th percentile of total orders, indicating customers who have made relatively few purchases.

## BigQuery Implementation

The following SQL query can be used to retrieve this specific customer segment from the `customer_data_retail.customers` table in Google BigQuery:

```sql
SELECT
  customer_id,
  date_of_last_purchase,
  total_number_of_orders,
  age,
  gender,
  location,
  total_spent_ltv
FROM
  `customer_data_retail.customers`
WHERE
  DATE_DIFF(CURRENT_DATE(), PARSE_DATE('%Y-%m-%d', SUBSTR(CAST(date_of_last_purchase AS STRING), 1, 10)), DAY) > 305
  AND total_number_of_orders <= 4;
```

## How to Use This Segment

This identified segment can be leveraged for various retention strategies, including but not limited to:

*   **Targeted Re-engagement Campaigns:** Send personalized emails, offers, or notifications to encourage a repeat purchase.
*   **Feedback Collection:** Reach out to understand reasons for inactivity and gather valuable feedback to improve services.
*   **Special Incentives:** Offer exclusive discounts or promotions to entice them back.
*   **Customer Service Outreach:** Proactively contact customers to offer assistance or address any potential issues they might have faced.
