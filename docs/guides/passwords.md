---
outline: deep
---

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

# Passwords
The creation and resetting of passwords is a process that interacts with many endpoints and frontend paths. This guide breaks down every single step. 

## Signing Up
To undergo a signup the user must navigate to the `/register` path via trivial-ui. Once the user fills out the form. A post request is sent to the endpoint `/auth`at trivial-api.  Here is a sample post request: 

::: tip Please note that passwords require a minimum length of 12 characters, the inclusion of at least one uppercase letter, one lowercase letter, one digit, and one symbol or special character.
:::

::: code-group
```javascript [Request]
const organization = await fetch('http://localhost:3000/auth', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "name": "User Name",
    "email": "user@email.com",
    "password": "SamplePass!789"
  })
})
.then(response => response.json())
```
```json [Response]
organization: {
    "status": 'success',
    "data": {User Metadata}
}
```
:::

## Resetting Password
Here is an outline of the steps involved with using `/recoverpassword` endpoint.

<div>
<img src="../assets/Reset_Password_Flow.png" >


  <!-- {% if $theme.mode === 'light' %}
    <img src="../assets/Reset_Password_Flow.png" width="600" height="600" alt="Light Image">
  {% else %}
    <img src="/path/to/dark-image.png" width="600" height="600" alt="Dark Image">
  {% endif %} -->
</div>

## Accept Invite
Accepting an invite through trivial-ui begins with signing in or creating account through the `/acceptinvitation` path. Once you're information has been filled out, trivial-ui send a PUT request to the `auth/invitaiton` endpoint at trivial-api to confirm your invitation. Here is a sample request:
::: code-group
```javascript [Request]
  await fetch("http://localhost:3000/auth/invitation", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "invitation_token": "qRyvCYBszHt7A1aWacyF",
    "password": "SamplePass!789",
    "password_confirmation": "SamplePass!789"
  }),
})
  .then((response) => response.json())
```
```json [Response]
{
  success: [ 'Invite Accepted']
}  
```
:::