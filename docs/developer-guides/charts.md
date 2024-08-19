# Charts

Trivial `Charts` provide a way to store settings for `Reports` data associated with `Charts`.
This documentation provides an overview of the `Charts` endpoints and explains how to interact with the API, required parameters, potential errors, and response formats.

## Table of Contents

1. [Parameters](#parameters)
2. [Endpoints](#endpoints)
3. [Request Examples](#request-examples)
4. [Response Format Examples](#response-format-examples)
5. [Errors](#errors)

---

## Parameters

### Required Parameters

- **`register_id` :Integer** The id of the register used for this chart's report.
- **`name` :String** The name of this chart. Must be unique for all charts within a dashboard.
- **`report_period` :String** The `group_by_period` parameter to use for this chart's report.
:::info Supported values of report_period are currently: `day`, `week`, `month`, `quarter`, and `year`
:::

### Optional Parameters

- **`chart_type` :String** The type of the chart.
- **`color_scheme` :String** The color scheme of the chart such as 'default, 'trivial-dark, etc.
- **`report_groups` :Object** The meta-columns to use as `group_by` parameters for the chart's report.
:::info `report_groups` fields are aliases for the meta-columns of a `Register`. Alias mapping is done internally
:::

### Parameters Example

#### Create
```json
{
  "register_id": 1,
  "name": "New Chart",
  "report_period": "week",
}
```

#### Update
```json
{
  "name": "Updated Chart",
  "chart_type": "table",
  "color_scheme": "brand_core",
  "report_period": "year",
  "report_groups": {
    "customer_id": false,
    "income_account": true,
    "warehouse": true
  }
}
```

---

## Endpoints

- **Get All Charts for a Dashboard**
  - **URL:** `/dashboards/:dashboard_id/charts`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all charts for a specific dashboard.

- **Get Single Chart**
  - **URL:** `/dashboards/:dashboard_id/charts/:id`
  - **Method:** `GET`
  - **Description:** Retrieve details of a single chart.

- **Create Chart**
  - **URL:** `/dashboards/:dashboard_id/charts`
  - **Method:** `POST`
  - **Description:** Create a new chart under a specific dashboard.

- **Update Chart**
  - **URL:** `/dashboards/:dashboard_id/charts/:id`
  - **Method:** `PUT`
  - **Description:** Update an existing chart.

- **Delete Chart**
  - **URL:** `/dashboards/:dashboard_id/charts/:id`
  - **Method:** `DELETE`
  - **Description:** Delete a chart.

---

## Request Examples

### Commandline Example

#### Get All Charts for a Dashboard
```bash
curl "http://yourapiurl.com/dashboards/1/charts" \
  -H "Authorization: Bearer yyyy"
```

#### Create Chart
```bash
curl -X POST http://yourapiurl.com/dashboards/1/charts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer yyyy"
  --data-raw '{
    "register_id": 1,
    "name": "New Chart",
    "chart_type": "line_graph",
    "color_scheme": "trivial-dark",
    "report_period": "week",
    "report_groups": {
      "income_account": true,
      "warehouse": false
    }
  }'
```

### JavaScript Example

#### Get All Charts for a Dashboard
```javascript
let dashboard_id = currentOrganization.dashboards[0].id // supply a dashboard_id for the dashboard you want

var data = await fetch(`http://localhost:3000/dashboards/${dashboard_id}/charts`, {
  method: "GET",
  headers: {
    "Authorization": "Bearer yyyy"
  },
}).then((response) => response.json())
```

#### Create a Chart
```javascript
let dashboard_id = currentOrganization.dashboards[0].id // supply a dashboard_id for the dashboard you want
let chart_name = setChartName // get a title for the chart from the user
let chart_type = setChartType // select a chart type like 'table', 'line_graph', etc.
let report_period = setReportPeriod // select a report period
let report_groups = selectedReportGroups // example: { income_account: true, warehouse: true, customer_id: false }

var data = await fetch(`http://localhost:3000/dashboards/${dashboard_id}/charts`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer yyyy"
  },
  body: JSON.stringify({
    chart: {
      register_id: 1,
      name: chart_name,
      chart_type: chart_type,
      report_period: report_period,
      report_groups: report_groups
    }
  })
}).then((response) => response.json())
```

---

## Response Format Examples

### Get All Charts for a Dashboard
```json
{
  "charts": [
    {
      "id": 1,
      "dashboard_id": 1,
      "register_id": 1,
      "name": "Gross Revenue",
      "chart_type": "table",
      "color_scheme": "default",
      "report_period": "month",
      "report_groups": {
        "income_account": true,
        "customer_id": false
      }
    },
    ...
  ]
}
```

### Get a Single Chart
```json
{
  "chart": {
    "id": 1,
    "dashboard_id": 1,
    "register_id": 1,
    "name": "Income By Location",
    "chart_type": "data_map",
    "color_scheme": "default",
    "report_period": "day",
    "report_groups": {
      "income_account": true,
      "warehouse": false
    }
  }
}
```

---

## Errors

### Common Errors

- **422 Unprocessable Content**
  - **Description:** A parameter for updating or creating a chart was invalid.
  - **Response:**
    ```json
    {
      "error": "millisecond is not a valid report period"
    }
    ```

- **404 Not Found**
  - **Description:** Nonexistent chart.
  - **Response:**
    ```json
    {
      "error": "Chart not found"
    }
    ```

- **401 Unauthorized**
  - **Description:** Unauthorized access.
  - **Response:**
    ```json
    {
      "error": "Unauthorized"
    }
    ```
