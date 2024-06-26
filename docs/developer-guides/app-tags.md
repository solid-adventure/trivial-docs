---
outline: deep
---

# App Tags Guide
Trivial apps can have *tags* assigned to them to distinguish specific properties and enable robust app filtering. 

Tags are made up of a `context` and a `value` pairing. An example tag would be `{currency: "USD"}`, where `currency` is the tag's context and `"USD"` is the tag's value.

Adding tags to apps lets you filter responses from the Trivial API.

## Assigning Tags to Apps

Tags can be added or removed through the Trivial API.

You can send a `POST` request to `/apps/{appId}/tags` with `context` and `name` strings in the body of the request to add a tag. 

:::info Note
`{appId}` refers to the "name" (e.g., "b73a02bfe5aa50") of the app, not the "id."
:::

Assuming the API is running on port 3000:
::: code-group
```javascript [Request]
const tag = await fetch('http://localhost:3000/apps/{appId}/tags', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "context": "currency",
    "name": "USD"
  })
})
.then(response => response.json())
```

```json [Response]
tag: {
  "id": 1,
  "context": "color",
  "name": "red",
  "taggable_type": "App",
  "taggable_id": 1,
  "created_at": "2023-09-28T22:16:19.297Z",
  "updated_at": "2023-09-28T22:16:19.297Z"
}
```
:::
To remove a tag, send a `DELETE` request to the same endpoint, with the same body:

::: code-group 
```javascript [Request]
await fetch('http://localhost:3000/apps/{appId}/tags', {
  method: "DELETE",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "context": "currency",
    "name": "USD"
  })
})
.then(response => response.json())
```
```json [Response]
{ "status": 200 }
```
:::

:::tip
A single Trivial app can support multiple tags, but they should be added (or removed) individually and not in batches.
:::

## Filtering Apps with Tags

By including the `tagged_with` query parameter, we can filter the response from `apps/` to only include apps with certain tags:

::: code-group
```javascript [Request]
const url = new URL('apps/', 'http:localhost:3000/')
const query = {
      tagged_with: JSON.stringify([
        {currency: "USD"},
        {colors: "red"}
      ])
    }
const search = new URLSearchParams(query)
url.search = search.toString()

// url.href == 'http://localhost:3000/apps/?tagged_with=%5B%7B%22currency%22%3A%22USD%22%7D%2C%7B%22colors%22%3A%22red%22%7D%5D'

const taggedApps = await fetch(url.href,{
  headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())

```

```json [Response]
taggedApps: [
    {
        "id": 1,
        "name": "XXXXX",
        "descriptive_name": "App one",
        "hostname": "XXXXX",
        "domain": "staging.trivialapps.io",
        "load_balancer": "staging-lb",
        "panels": null,
        "readable_by": null,
        "schedule": null,
        "aws_role": "arn:aws:iam::1234:role/AAlambda-ex-1",
        "created_at": "2023-09-28T00:00:00.292Z",
        "updated_at": "2023-09-28T00:00:00.292Z",
        "manifest": {},
        "tags": [
            {
                "id": 1,
                "context": "colors",
                "name": "red",
                "taggable_type": "App",
                "taggable_id": 1,
                "created_at": "2023-09-28T00:00:10.297Z",
                "updated_at": "2023-09-28T00:00:10.297Z"
            },
            {
                "id": 2,
                "context": "currency",
                "name": "USD",
                "taggable_type": "App",
                "taggable_id": 1,
                "created_at": "2023-09-28T00:00:29.297Z",
                "updated_at": "2023-09-28T00:00:29.297Z"
            },
        ]
    },
    {
        "id": 2,
        "name": "YYYYY",
        "descriptive_name": "App two",
        "hostname": "YYYYY",
        "domain": "staging.trivialapps.io",
        "load_balancer": "staging-lb",
        "panels": null,
        "readable_by": null,
        "schedule": null,
        "aws_role": "arn:aws:iam::1234:role/AAlambda-ex-1",
        "created_at": "2023-09-28T00:10:00.292Z",
        "updated_at": "2023-09-28T00:10:00.292Z",
        "manifest": {},
        "tags": [
            {
                "id": 3,
                "context": "colors",
                "name": "red",
                "taggable_type": "App",
                "taggable_id": 1,
                "created_at": "2023-09-28T00:10:10.297Z",
                "updated_at": "2023-09-28T00:10:10.297Z"
            },
            {
                "id": 4,
                "context": "currency",
                "name": "USD",
                "taggable_type": "App",
                "taggable_id": 1,
                "created_at": "2023-09-28T00:10:29.297Z",
                "updated_at": "2023-09-28T00:10:29.297Z"
            },
        ]
    },
    {
        "id": 3,
        "name": "ZZZZZ",
        "descriptive_name": "App three",
        "hostname": "ZZZZZ",
        "domain": "staging.trivialapps.io",
        "load_balancer": "staging-lb",
        "panels": null,
        "readable_by": null,
        "schedule": null,
        "aws_role": "arn:aws:iam::1234:role/AAlambda-ex-1",
        "created_at": "2023-09-28T00:20:00.292Z",
        "updated_at": "2023-09-28T00:20:00.292Z",
        "manifest": {},
        "tags": [
            {
                "id": 5,
                "context": "colors",
                "name": "red",
                "taggable_type": "App",
                "taggable_id": 1,
                "created_at": "2023-09-28T00:20:10.297Z",
                "updated_at": "2023-09-28T00:20:10.297Z"
            },
            {
                "id": 6,
                "context": "currency",
                "name": "USD",
                "taggable_type": "App",
                "taggable_id": 1,
                "created_at": "2023-09-28T00:20:29.297Z",
                "updated_at": "2023-09-28T00:20:29.297Z"
            },
        ]
    },
]
```
:::

Filtering with tags that do not exist yields empty results:
::: code-group
```javascript [Request]
const url = new URL('apps/', 'http:localhost:3000/')
const query = {
      tagged_with: JSON.stringify([
        {currency: "CAD"},
      ])
    }
const search = new URLSearchParams(query)
url.search = search.toString()

const taggedApps = await fetch(url.href,{
  headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())

```
``` json [Response]
taggedApps: []
```
:::