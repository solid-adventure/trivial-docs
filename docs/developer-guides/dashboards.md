# Dashboards

Trivial `Dashboards` provide a way to group and display different `Reports` data through associated `Charts`.
This documentation provides an overview of the `Dashboards` endpoints and explains how to interact with the API, required parameters, potential errors, and response formats.

## Table of Contents

1. [Parameters](#parameters)
2. [Endpoints](#endpoints)
3. [Request Examples](#request-examples)
4. [Response Format Examples](#response-format-examples)
5. [Errors](#errors)

---

## Parameters

### Required Parameters

#### Create
:::warning Only `Organization` type owners are currently supported
:::
- **`owner_type` :String**, The internal object type of the owner
- **`owner_id` :Integer**, The internal id of the owner object
- **`name` :String**, A name for the dashboard. Must be unique among dashboards with this owner.

### Optional Parameters

#### Create
- **`dashboard_type` :String**, automatically set to `default` when no parameter is passed

#### Update
- **`name` :String**
- **`dashboard_type` :String**
:::info A Dashboard's owner can only be changed through the permissions API
:::

### Parameters Example

#### Create
```json
{
  "dashboard": {
    "owner_type": "Organization",
    "owner_id": 1,
    "name": "New Dashboard",
    "dashboard_type": "default"
  }
}
```

#### Update
```json
{
  "dashboard": {
    "name": "Updated Dashboard",
    "dashboard_type": "new_type"
  }
}
```

---

## Endpoints

- **Get All Dashboards**
  - **URL:** `/dashboards`
  - **Method:** `GET`
  - **Description:** Retrieve a list of all dashboards associated with the current user.

- **Get Single Dashboard**
  - **URL:** `/dashboards/:id`
  - **Method:** `GET`
  - **Description:** Retrieve details of a single dashboard.

- **Create Dashboard**
  - **URL:** `/dashboards`
  - **Method:** `POST`
  - **Description:** Create a new dashboard.

- **Update Dashboard**
  - **URL:** `/dashboards/:id`
  - **Method:** `PUT`
  - **Description:** Update an existing dashboard.

- **Delete Dashboard**
  - **URL:** `/dashboards/:id`
  - **Method:** `DELETE`
  - **Description:** Delete a dashboard.

---

## Request Examples

### Commandline Examples

#### Get All Dashboards
```bash
curl "http://localhost:3000/dashboards" \
  -H "Authorization: Bearer yyyy"
```

#### Create Dashboard
```bash
curl "http://localhost:3000/dashboards" -X POST \
  -H "Authorization: Bearer yyyy" \
  -H "Content-Type: application/json" \
  --data-raw '{
    "owner_type": "Organization",
    "owner_id": 1,
    "name": "New Dashboard",
    "dashboard_type": "default"
  }'
```

### JavaScript Examples

#### Get A Dashboard
```javascript
let dashboard_id = currentOrganization.dashboards[0].id // supply a dashboard_id for the dashboard you want

var data = await fetch(`http://localhost:3000/dashboards/${dashboard_id}`, {
  method: "GET",
  headers: {
    "Authorization": "Bearer yyyy"
  },
}).then((response) => response.json())
```

#### Create Dashboard
```javascript
let owner_id = currentOrganization.id // use the id of the desired organization
let dashboard_name = setDashboardName // get a name for the dashboard from the user

var data = await fetch("http://localhost:3000/dashboards", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer yyyy"
  },
  body: JSON.stringify({
    owner_type: "Organization",
    owner_id: owner_id,
    name: "New Dashboard"
  }),
}).then((response) => response.json())
```

---

## Response Format Examples

### Get All Dashboards
```json
{
  "dashboards": [
    {
      "id": 1,
      "owner_type": "Organization",
      "owner_id": 1,
      "name": "Default Dashboard",
      "dashboard_type": "default",
      "charts": [
        {
          "id": 1,
          "dashboard_id": 1,
          "register_id": 1,
          "name": "Gross Revenue",
          "chart_type": "table",
          "color_scheme": "default",
          "report_period":"month",
          "report_groups": {
            "income_account": true,
            "customer_id": false
          }
        },
        ...
      ]
    },
    ...
  ]
}
```

### Get Single Dashboard
```json
{
  "dashboard": {
    "id": 1,
    "owner_type": "Organization",
    "owner_id": 1,
    "name": "Default Dashboard",
    "dashboard_type": "default",
    "charts": [
      {
        "id": 1,
        "dashboard_id": 1,
        "register_id": 1,
        "name": "Gross Revenue",
        "chart_type": "table",
        "color_scheme": "default",
        "report_period":"month",
        "report_groups": {
          "income_account": true,
          "customer_id": false
        }
      },
      ...
    ]
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
      "error": "Only Organization owned Dashboards are currently supported"
    }
    ```


- **404 Not Found**
  - **Description:** Nonexistent dashboard.
  - **Response:**
    ```json
    {
      "error": "Dashboard not found"
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
