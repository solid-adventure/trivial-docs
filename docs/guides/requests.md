---
outline: deep
---

# Requests

Interacting with the trivial-api can be done via console or through API calls. This guide details how to make authenticated API requests to endpoints available to Trivial-UI.

## Retrieve a Bearer Token

A Bearer token is the only form of aunthentication needed to make valid API requests to all endpoints available via Trivial-API. Retreiving a Bear token for a specified user can be done with the following steps: 

1. Send a `POST` request to `/auth/sign_in` endpoint.
2. If successfully signed in, retreive Bearer Token from response header.

The following cURL command be used to locate the Bearer token:

:::code-group
```cURL [Request]
curl -X POST -d "email={email}&password={password}" -i http://localhost:3000/auth/sign_in | grep -i "Authorization"
```
```[Response]
Authorization: Bearer yyyy
```
:::

This cURL request is the fastest method to receiving a Bearer Token. Replicating the same steps using different API call methods such as Python, Javascript, and Postman should lead to the same results.

## Making a request

Once you have made a request, the next step involves placing the Bearer token into the Authorization property of your request header.

Here is an example to validate that Bearer token works as expected:

:::code-group

```javascript [Request]
// must place inside async function or remove `await`
await fetch("http://localhost:3000/profile", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer yyyy"
  },
}).then((response) => response.json());
```
```json [Response]
{
  user: {
    id: {id},
    name: 'example_name',
    email: 'example@email.com',
    role: 'member',
    approval: 'approved',
    color_theme: null,
    created_at: 'YYYY-MM-DDTHH:MM:SS.SSSZ',
    current_customer_token: null,
    account_locked: false,
    account_locked_reason: null,
    trial_expires_at: 'YYYY-MM-DDTHH:MM:SS.SSSZ'
  }
}
```
:::

Alongside including the correct parameters and their corresponding values, all you need when making authenticated requests to endpoints in Trivial-API is to place the Bearer Token in the response header.