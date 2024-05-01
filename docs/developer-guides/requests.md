---
outline: deep
---

# Requests

Interacting with the trivial-api can be done through API calls. This guide details the steps towards sending authenticated API requests to endpoints available to Trivial-UI.

## 1. Retrieve a Bearer Token

A Bearer token is the only form of aunthentication needed to make valid API requests to all endpoints available via Trivial-API. Retreiving a Bear token for a specified user can be done with the following steps: 

1. Send a `POST` request to `/auth/sign_in` endpoint.
2. If successfully signed in, retreive Bearer Token from response header.

Assuming the API is running on port 3000, the following cURL command be used to locate the Bearer token:

:::code-group
```cURL [Request]
curl -X POST -d "email={email}&password={password}" -i http://localhost:3000/auth/sign_in
```
```[Response]
HTTP/1.1 200 OK
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 0
X-Content-Type-Options: nosniff
X-Download-Options: noopen
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: strict-origin-when-cross-origin
Content-Type: application/json; charset=utf-8
access-token: [ACCESS_TOKEN_PLACEHOLDER]
token-type: Bearer
client: [CLIENT_PLACEHOLDER]
expiry: [EXPIRY_PLACEHOLDER]
uid: [UID_PLACEHOLDER]
Authorization: Bearer [AUTHORIZATION_PLACEHOLDER] // [!code focus]
.....
```
:::

This cURL request is the fastest method to receiving a Bearer Token. Replicating the same results can be done using different API call methods such as Python, Javascript, and Postman.

## 2. Making the request

Once you have been able to retrieve a bearer token, the next step involves placing the token into the Authorization property in the request header of the API request.

Alongside specifying the correct parameters and their corresponding values, simply embedding the Bearer Token within the response header is all you need to make authenticated requests to Trivial-API endpoints.

Here is a simple example to validate that Bearer token works as expected:

:::code-group

```javascript [Request]
// must place inside async function
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








