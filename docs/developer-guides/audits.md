<script setup>
import { useData } from 'vitepress'
const { isDark } = useData()
</script>

# Audits 

Trivial-API leverages the [Audited gem](https://github.com/collectiveidea/audited) to log and monitor alterations across many Model resources.

## Audits Overview
 Alterations audited by Trivial include any `Create`, `Update`, or `Delete` actions taken on audited Model resources along with related meta data such as the `user_id` and `remote_address` associated with the altering API request. 

### Audited Resources
The following Models are audited by Trivial along with associated child Models:
- `Apps`
  - `Manifests`
  - `Tags`
- `Credential Sets`
- `Dashboards`
  - `Charts`
- `Organizations`
  - `OrgRoles`
- `Permissions`
- `Registers`
  - `Register Items`
- `Users`

### Audit Data
Each audit entry includes the following data:
- `auditable_id`: the integer id of the audited resource
- `auditable_type`: the model type of the audited resource
- `associated_id`: the integer id of the audited resource's parent resource
- `associated_type`: the model type of the audited resource's parent resource
- `action`: the action taken on the audited resource, ie. create, update, or delete
- `audited_changes`: a json blob of the before and after state of the resource
- `version`: an integer count of the number of alterations to the audited resource
- `user_id`: the user_id associated with the api request for this alteration
- `remote_address`: the remote address assocaited with the api request for this alteration
- `created_at`: a time stamp of when this audit was created

### Note on `user_id`:

The `user_id` column in each audit entry provides information about the user responsible for a change. This column is populated when a user signs in and is typically filled in for all audit entries. However, there's a specific scenario where the `user_id` is left blank – when a user accepts an invitation. This behavior is expected as accepting an invitation doesn't require a user to sign in or undergo authentication.

**To identify the `user_id` of an accepted invitation:**

1. Look for audit entries with `auditable_type` column set to `OrgRole` and `action` column set to `create`. These entries indicate the acceptance of an invitation.
2. Once you've located the entry related to invitation acceptance, access the `audited_changes` column. Within this column, you'll find the `user_id` of the individual who accepted the invitation.

## Audits API

Trivial supports a read-only API for audits.

### Models supported by the API

Trivial supports retrieving audits via the API only for the following model types

- `Apps`
  - `Manifests`, through their associated `App`
  - `Tags`, through their associated `App`
- `Organizations`
  - `OrgRoles`, through their associated `Organization`

### Security & Authorization

Only **Admins** of a resource can view its audits, including audits for associated resources.

**Admins** are defined as the following:
- `Users` who are themselves the owner of an audited resource.
- `Users` with the 'admin' `OrgRole` for a resource owned by an `Organization`, or the `Organization` itself.


### URL Routes

The Audits API uses a RESTful structure with routes nested under auditable resources such as `apps` and `organizations`. The API provides two primary endpoints: `index` (for listing audits) and `show` (for retrieving a single detailed audit).

#### Example Routes

- **List all audits for an `App`:**
  ```
  GET /apps/:app_id/audits
  ```

- **Get a specific audit for an `Organization`:**
  ```
  GET /organizations/:organization_id/audits/:id
  ```

### Pagination

The index endpoint supports pagination via the optional `page` and `per_page` query parameters.

- `page`: The current page number (default is `1`).
- `per_page`: Number of audits per page (default and maximum is `100`).

For example, to fetch the second page of results with 20 audits per page:
```
GET /apps/1/audits?page=2&per_page=20
```

### Response Formats

#### Audits List (Index)

The `index` action returns a paginated list of audits which includes only general information about each audit. This list includes all audits for the resource as well as any audits of child resources. So, for example, an index of an `App` would return any audits on that `App` as well as any audits for `Manifests` or `Tags` associated with that `App`.

The response includes:
- `current_page`: The page number of the result set.
- `total_pages`: Total number of pages available.
- `audits`: A list of audits in the current page.

**Index Request Example:**
:::code-group
``` [Request]
GET /apps/1/audits?page=1&per_page=10
```

``` [Response]
{
  "current_page": 1,
  "total_pages": 1,
  "audits": [
    {
      "id": 4,
      "auditable_id": 1,
      "auditable_type": "App",
      "associated_id": null,
      "associated_type": null,
      "user_id": 2,
      "action": "update",
      "version": 2,
      "remote_address": "127.0.0.1",
      "created_at": "2024-09-22T14:23:42Z"
    },
    {
      "id": 3,
      "auditable_id": 1,
      "auditable_type": "Tag",
      "associated_id": 1,
      "associated_type": "App",
      "user_id": 2,
      "action": "create",
      "version": 1,
      "remote_address": "127.0.0.1",
      "created_at": "2024-09-21T17:45:18Z"
    },
    {
      "id": 2,
      "auditable_id": 1,
      "auditable_type": "Manifest",
      "associated_id": 1,
      "associated_type": "App",
      "user_id": 2,
      "action": "create",
      "version": 1,
      "remote_address": "127.0.0.1",
      "created_at": "2024-09-21T16:23:45Z"
    },
    {
      "id": 1,
      "auditable_id": 1,
      "auditable_type": "App",
      "associated_id": null,
      "associated_type": null,
      "user_id": 2,
      "action": "create",
      "version": 1,
      "remote_address": "127.0.0.1",
      "created_at": "2024-09-21T16:23:42Z"
    }
  ]
}
```
:::

#### Single Audit (Show)

The `show` action returns a single audit object by its ID. The full audit details are included with this response. Audits of child resources such as `Manifest` or `OrgRole` are retrieved as extensions of their parent resource.

**Primary Resource Request Example:**
:::code-group
``` [Request]
GET /apps/1/audits/12
```

``` [Response]
{
  "audit": {
    "id": 12,
    "auditable_id": 1,
    "auditable_type": "App",
    "associated_id": null,
    "associated_type": null,
    "user_id": 2,
    "action": "update",
    "audited_changes": {
      "name": ["Old Name", "New Name"] // updates are stored as arrays of the data before and after each change
    },
    "version": 3,
    "remote_address": "127.0.0.1",
    "created_at": "2024-09-22T14:23:42Z"
  }
}
```
:::

**Child Resource Request Example:**
:::code-group
``` [Request]
GET /apps/1/audits/24
```

``` [Response]
{
  "audit": {
    "id": 24,
    "auditable_id": 1,
    "auditable_type": "Tag",
    "associated_id": 1,
    "associated_type": "App",
    "user_id": 2,
    "action": "create",
    "audited_changes": {
      "name": "New Tag",
      "context": "start_at",
      "taggable_type": "App",
      "taggable_id": 1
    },
    "version": 3,
    "remote_address": "127.0.0.1",
    "created_at": "2024-09-22T14:27:42Z"
  }
}
```
:::

### Common Errors

- **Invalid Page or Per Page Parameters:**
  If an invalid `page` or `per_page` value is supplied, an error is raised.

- **Access Denied:**
  Unauthorized users will receive a `401 Forbidden` response if they attempt to access audits they do not have permission to view.

## Interacting with Audits via Console

The Audited gem allows users to retrieve relevant information in regards to model changes. Here are two commands available to use.

::: tip
To access the console, type the following: `bundle exec rails c`
:::

::: code-group
``` [Command]
user = User.find(1)
user.audits.last
user.audits.count
```

``` [Response]
=> #<User id: 1, provider: "email", uid: "admin@email.com", name: "admin", email: "admin@email.com", created_at: "2023-12-18 20:54:50.043892000 +0000", updated_at: "2024-01-22 19...
=>                                                                                     
#<Audited::Audit:0x00000001132744f8                                                    
 id: 184,                                                                              
 auditable_id: 1,                                                                      
 auditable_type: "User",                                                               
 associated_id: nil,                                                                   
 associated_type: nil,                                                                 
 user_id: 1,                                                                           
 user_type: "User",                                                                    
 username: nil,                                                                        
 action: "update",                                                                     
 audited_changes: {"tokens"=>"[FILTERED]"},                                            
 version: 16,                                                                          
 comment: nil,
 remote_address: "127.0.0.1",
 request_uuid: "c331612d-25c7-4c4b-b783-cf84e4715146",
 created_at: Mon, 22 Jan 2024 19:54:23.916760000 UTC +00:00>
 => 16
```
:::
