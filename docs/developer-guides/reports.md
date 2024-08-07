# Reports

Trivial `Reports` provide a way to gain quick insight on all `register_items` associated with a `register`.
This documentation provides a concise overview of the `Reports` endpoints and explains how to interact with the API, required parameters, potential errors, and response formats.

## Table of Contents

1. [Parameters](#parameters)
2. [Endpoints](#endpoints)
3. [Request Examples](#request-example)
4. [Response Format Examples](#response-format-examples)
5. [Errors](#errors)

---

## Parameters

### Required Parameters

- **start_at**: The start date-time for the report (ISO 8601 format).
- **end_at**: The end date-time for the report (ISO 8601 format).
- **register_id**: The ID of the register to generate the report for.

### Optional Parameters

- **group_by_period**: The period to group results by.
:::info Valid values are: `day`, `week`, `month`, `quarter`, `year`
:::
- **timezone**: The timezone for date-time calculations.
:::info Valid values are retrievable via the following methods
:::
```ruby [Ruby Timezones]
TZInfo::Timezone.all_identifiers
```
```javascript [Javascript Timezones]
Intl.supportedValuesOf('timeZone')
```
- **group_by**: An array of meta-columns to group results by 
:::tip Valid meta-columns can be retrieved from a register's meta hash
:::

### Parameters Example

```json
{
  "start_at": "2024-01-01T00:00:00Z",
  "end_at": "2024-01-31T23:59:59Z",
  "register_id": 1,
  "group_by_period": "month",
  "timezone": "America/Detroit",
  "group_by": ["some_meta_column"]
}
```

---

## Endpoints

The `ReportsController` handles various report generation actions:
- **POST /reports/item_count**
:::info Provides a count of all register_items within the parameter bounds
:::
- **POST /reports/item_sum**
:::info Provides a sum on :amount of all register_items within the parameter bounds
:::
- **POST /reports/item_average**
:::info Provides the average of :amount across all register_items within the parameter bounds
:::

---

## Request Example

### Commandline Example:
```bash
curl -X POST http://yourapi.com/reports/item_count \
-H "Content-Type: application/json" \
-H "Authorization: Bearer yyyy" \
-d '{
  "start_at": "2024-01-01T00:00:00Z",
  "end_at": "2024-01-31T23:59:59Z",
  "register_id": 1,
  "group_by_period": "month",
  "timezone": "America/Detroit",
  "group_by": ["some_meta_column"]
}'
```

### Javascript Example:
``` javascript [Javascript Request]
// First we'll set the start of the time range for our report
let start_at = new Date('2023-01-01T00:00:00')

// Next, we'll set our end_at date at 2 months later
let end_at = new Date('2023-02-28T23:59:59')

// Finally, this is the ID of the register you want data on
let register_id = 1

var data = await fetch("http://localhost:3000/reports/item_sum", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer yyyy"
  },
  body: JSON.stringify({
    register_id: register_id,
    start_at: start_at.toISOString(),
    end_at: end_at.toISOString()
  }),
}).then((response) => response.json())

```

---

## Response Format Examples

### Count, Sum, Average Reports

The response will include the report title and the calculated count, sum, or average values. If grouping is applied, the results will be grouped accordingly.

#### Response Example Without Grouping
Request parameters: `POST reports/item_sum`
```json
{
  "start_at": "2023-01-01T00:00:00-05:00",
  "end_at": "2023-02-28T23:59:59-05:00",
  "register_id": 1,
}
```
Response:
```json [Sum, No Groups]
{
  "title": "Sum",
  "count": [
    {
      "period": "All",
      "group": "All",
      "value": 9151.15
    }
  ]
}
```

#### Response Examples With Grouping
Request parameters: `POST reports/item_count`
```json
{
  "start_at": "2023-01-01T00:00:00-05:00",
  "end_at": "2023-02-28T23:59:59-05:00",
  "register_id": 1,
  "group_by_period": "month",
  "timezone": "America/Detroit",
}
```
Response:
```json [Count, Group by Period]
{
  "title": "Count by Month",
  "count": [
    {
      "period": "Jan 2024",
      "group": "All",
      "value": 50
    },
    {
      "period": "Feb 2024",
      "group": "All",
      "value": 30
    }
  ]
}
```
Request parameters: `POST reports/item_sum`
```json
{
  "start_at": "2023-01-01T00:00:00-05:00",
  "end_at": "2023-02-28T23:59:59-05:00",
  "register_id": 1,
  "group_by": ["income_account"]
}
```
Response:
```json [Sum, Group by Column]
{
  "title": "Sum by Income Account",
  "count": [
    {
      "period": "All",
      "group": "b2b shipping",
      "value": 2880.75
    },
    {
      "period": "All",
      "group": "wholesale",
      "value": 6270.4
    }
  ]
}
```
Request parameters: `POST reports/item_average`
```json
{
  "start_at": "2023-01-01T00:00:00-05:00",
  "end_at": "2023-02-28T23:59:59-05:00",
  "register_id": 1,
  "group_by_period": "month",
  "timezone": "America/Detroit",
  "group_by": ["income_account"]
}
```
Response:
```json [Average, Group by Period and Column]
{
  "title": "Average by Month and Income Account",
  "count": [
    {
      "period": "Jan 2024",
      "group": "b2b shipping",
      "value": 12.3
    },
    {
      "period": "Feb 2024",
      "group": "b2b shipping",
      "value": 10.1
    },
        {
      "period": "Jan 2024",
      "group": "wholesale",
      "value": 6.7
    },
    {
      "period": "Feb 2024",
      "group": "wholesale",
      "value": 8.22
    }
  ]
}
```
Request parameters: `POST reports/item_count`
```json
{
  "start_at": "2023-01-01T00:00:00-05:00",
  "end_at": "2023-02-28T23:59:59-05:00",
  "register_id": 1,
  "group_by_period": "month",
  "timezone": "America/Detroit",
  "group_by": ["income_account", "warehouse"]
}
```
Response:
```json [Average, Group by Period and Column]
{
  "title": "Count by Month and Income Account, Warehouse",
  "count": [
    {
      "period": "Jan 2024",
      "group": ["b2b shipping", "ann_arbor"],
      "value": 10
    },
    {
      "period": "Feb 2024",
      "group": ["b2b shipping", "ann_arbor"],
      "value": 20
    },
        {
      "period": "Jan 2024",
      "group": ["b2b shipping", "new_york"],
      "value": 12
    },
    {
      "period": "Feb 2024",
      "group": ["b2b shipping", "new_york"],
      "value": 16
    },
    {
      "period": "Jan 2024",
      "group": ["warehouse", "ann_arbor"],
      "value": 7
    },
    {
      "period": "Feb 2024",
      "group": ["warehouse", "ann_arbor"],
      "value": 13
    },
        {
      "period": "Jan 2024",
      "group": ["warehouse", "new_york"],
      "value": 11
    },
    {
      "period": "Feb 2024",
      "group": ["warehouse", "new_york"],
      "value": 12
    }
  ]
}
```

---

## Errors

### Common Errors

- **Invalid invalid xmlschema format**: The `start_at` or `end_at` parameter is missing or not iso8601 format.
- **start_at must be earlier than end_at**: The `start_at` parameter is invalid due to being later than `end_at`.
- **Invalid invalid timezone**: The `timezone` parameter is missing or invalid.
- **timezone mismatched from time range timezones**: The `timezone` provided does not match the timezone of `start_at` or `end_at`.
- **Invalid register_id**: The `register_id` parameter is missing or does not correspond to an existing register.
- **Invalid group by period**: The `group_by_period` parameter is invalid.
- **Invalid group_by**: The specified column in `group_by` is not a valid meta-column for the register.

### Error Response Example

```json
{
  "error": "Invalid start_at"
}
```

### HTTP Status Codes

- **422 Unprocessable Entity**: Returned when a specific argument error occurs.
- **500 Internal Server Error**: Returned when an unspecified error occurs during report generation.

---

