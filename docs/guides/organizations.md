---
outline: deep
---

# Organizations

Trivial Organizations allow you to collaborate with other users by enabling powerful and customizable Role-based access control to Apps. When you create an Organization in Trivial, you control the set of users and their level of access to Apps owned by your Organization.


## Create an Organization
 
Organizations can be created through the Trivial API.

Send a `POST` request to `/organizations` with `name` and `billing_email` strings in the body of the request to create your first Organization. Assuming the API is running on port 3000:
::: code-group
```javascript [Request]
const organization = await fetch('http://localhost:3000/organizations', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "name": "My Organization",
    "billing_email": "organization@email.com"
  })
})
.then(response => response.json())
```
```json [Response]
organization: {
    "id": 1,
    "name": "My Organization",
    "billing_email": "organization@email.com"
}
```
:::
By default you are registered as an `admin` user of an Organization you create. 

## Viewing your Organizations
Organizations you are a part of can be viewed in two ways- your individual Organizations can be fetched by their ID's:
::: code-group
```javascript [Request]
const organization = await fetch('http://localhost:3000/organizations/{organizationId}', {
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
```
```json [Response]
organization: {
    "id": 1,
    "name": "My Organization",
    "billing_email": "organization@email.com",
    "users": [
      {
        "user_id": 1,
        "name": "admin",
        "email": "admin@email.com",
        "role": "admin"
      }
    ]
}
```
:::

Or you can fetch all your Organizations:
::: code-group
```javascript [Request]
const organizations = await fetch('http://localhost:3000/organizations', {
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
```
```json [Response]
organizations: [
  {
    "id": 1,
    "name": "My Organization",
    "billing_email": "organization@email.com"
  },
  {
    "id": 2,
    "name": "My Second Organization",
    "billing_email": "organizationTwo@email.com"
  }
]
```
:::
:::info
You only see an Organization's list of users when you fetch the individual Organization.
:::

## Organization Management
Attributes about the Organization and its users can also be managed through the Trivial API. Only `admin` users are authorized to make these changes.

### Updating Organizations
::: code-group
```javascript [Request]
const updatedOrganization = await fetch('http://localhost:3000/organization/{organizationId}', {
  method: "PUT",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "name": "New Organization Name"
  })
})
.then(response => response.json())
```
```json [Response]
updatedOrganization: {
    "id": 1,
    "name": "New Organization Name",
    "billing_email": "organization@email.com"
}
```
:::

### Deleting Organizations
::: code-group
```javascript [Request]
await fetch('http://localhost:3000/organization/{organizationId}', {
  method: "DELETE",
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
```
```json [Response]
{ message: 'Delete OK' }
```
:::

Finally, `admin` users can also manage users of Organizations.

### Adding users
::: code-group
```javascript [Request]
// adding a user as a member
const newUser = await fetch('http://localhost:3000/organizations/{organizationId}/create_org_role}', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "user_id": 2,
    "role": "member"
  })
})
.then(response => response.json())
```
```json [Response]
newUser: {
    "id": 1,
    "name": "My Organization",
    "billing_email": "organization@email.com",
    "users": [
      {
        "user_id": 1,
        "name": "admin",
        "email": "admin@email.com",
        "role": "admin"
      },
      {
        "user_id": 2,
        "name": "user2",
        "email": "user2@email.com",
        "role": "member"
      }
    ]
}
```
:::

### Updating users
::: code-group
```javascript [Request]
// updating a user to admin role
const updatedUser = await fetch('http://localhost:3000/organizations/{organizationId}/update_org_role}', {
  method: "PUT",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "user_id": 2,
    "role": "admin"
  })
})
.then(response => response.json())
```
```json [Response]
updatedUser: {
    "id": 1,
    "name": "My Organization",
    "billing_email": "organization@email.com",
    "users": [
      {
        "user_id": 1,
        "name": "admin",
        "email": "admin@email.com",
        "role": "admin"
      },
      {
        "user_id": 2,
        "name": "user2",
        "email": "user2@email.com",
        "role": "admin"
      }
    ]
}
```
:::

### Deleting users/leaving Organizations
::: code-group
```javascript [Request]
await fetch('http://localhost:3000/organizations/{organizationId}/delete_org_role}', {
  method: "DELETE",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "user_id": 2
  })
})
.then(response => response.json())
```
```json [Response]
{ message: 'Delete OK' }
```
:::