---
outline: deep
---

# Permissions

Trivial Permissions make it possible to share resources by granting Users with access to perform different operations on various resources. Permissions currently make it possible to share the `App`, `Manifest`, `ManifestDraft`, and `CredentialSet` resources. For every one of those resources there exists grantable permissions for the following operations: `read`, `update`, `delete`, `transfer`, `grant`, and `revoke`.

## The Permissions API

Permissions can be granted through the Trivial API. 

The `/permission` endpoint is for interacting with singular permits. 

A request to the Permissions API follows the schema:
``` /permission/{permit}/{permissible_type}/{permissible_id}/users/{user_id} ```
- `{permit}` is the name of the operation.
- `{permissible_type}` is the name of the resource.
- `{permissible_id}` is the internal ID for that resource instance.
- `{user_id}` is the internal user ID for the user being granted the permission.

The `/permissions` endpoint also exists to handle multiple permits at once. A request to this endpoint will omit the `permit`:
```/permissions/{permissible_type}/{permissible_id}/users/{user_id}```

## Granting Users Permissions to Resources

As an example, send a `POST` request to `/permissions/credential_sets/1/users/5` to grant *all* permissions to user 5 for credential set 1. Assuming the API is running on port 3000:
:::code-group
```javascript [Request]
await fetch('http://localhost:3000/permissions/credential_sets/1/users/5', {
  method: "POST",
  headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())
```
```json [Response]
200: ok
```
::: 

## Revoking Permissions 

To revoke a user's Permission from a resource, a `DELETE` request can be sent to the desired endpoint:
:::code-group
```javascript [Request]
// revoke only the transfer permit from user 1 on manifest 1
await fetch('http://localhost:3000/permission/transfer/manifests/1/users/1', {
  method: "DELETE",
  headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())
```
```json [Response]
200: ok
```
:::

:::info
Revoking is not the same as deleting. When a user has all their permissions revoked there is an entry left in the database for historical record puroposes.
:::

