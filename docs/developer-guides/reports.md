---
outline: deep
---

# Reports
Trivial reports provide a way to gain quick insight on all `register_items` associated with a `register`.

These are the available report api paths:
- `/reports/item_sum`
- `/reports/item_average`
- `/reports/item_count`

Assuming API is running on 3000, here is an example of an API call retreviing `item_sum`:
::: code-group
``` javascript [Request]

let end_at = new Date()
let start_at = new Date()
start_at.setYear('2020') 
let register_id = 1

var data = await fetch("http://localhost:3000/reports/item_sum", {
method: "POST",
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer yyyy"
},
body: JSON.stringify({
    register_ids: register_id,
    start_at: start_at.toISOString(),
    end_at: end_at.toISOString()
}),
}).then((response) => response.json())

```
``` json [Response]
{ title: 'Sum', count: '6662.09' }
```

::: tip The `register_ids` param is intended to be plural.
:::

