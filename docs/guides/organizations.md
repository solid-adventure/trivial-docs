---
outline: deep
---

# Organizations

Organizations on Trivial allow you to collaborate with others by enabling powerful and customizable Role-based access control to Apps. When you create an Organization in Trivial, you control the set of users and their level of access to Apps owned by your Organization.


## Create an Organization
 
Organizations can be created through the Trivial API.

Send a `POST` request to `/organizations` with `name` and `billing_email` strings in the body of the request to create your first organization. Assuming the API is running on port 3000:
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
By default you are registered as an `admin` user of an organization you create. 

## Viewing your Organizations
Organizations you are a part of can be viewed in two ways- your individual organizations can be fetched by their ID's:
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

Or you can fetch all your organizations:
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
You only see an organization's list of users when you fetch the individual organization.
:::

## Organization Management
Attributes about the organization and its users can also be managed through the Trivial API.

Updates to an organization are handled with a `PATCH` request:
::: code-group
```javascript [Request]
const updatedOrganization = await fetch('http://localhost:3000/organization/{organizationId}', {
  method: "PATCH",
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

Organizations can also be deleted:
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
{ status: 200 }
```
:::

## Membership Management
Finally, user membership of Organizations is handled with it's own set of API requests.

Adding users:
::: code-group
```javascript [Request]
// adding a user as a member
const newMember = await fetch('http://localhost:3000/organizations/{organizationId}/create_org_role}', {
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
newMember: {
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

Updating members:
::: code-group
```javascript [Request]
// updating a user to admin role
const updatedMember = await fetch('http://localhost:3000/organizations/{organizationId}/update_org_role}', {
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
newMember: {
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

Deleting members/leaving organizations:
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
{ status: 200 }
```
:::