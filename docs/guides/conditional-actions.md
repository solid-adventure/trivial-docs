---
outline: deep
---

# Conditional Actions Guide
Actions can define a condition, meaning they will only execute if the given condition is True. Conditional actions allow you to support simple filtering without needing to be nested in an If/Else block.

## Setting Conditions for Actions
In order for your action to require a condition, you must first modify it's `descriptor.js` file. Inside of `/actions/YOUR-SERVICE/YOUR-ACTION/descriptor.js`, return a `condition` key on `getDefinitionFields`:

```javascript
  getDefinitionFields() {
    return {
      condition: {
        type: String,
        required: true,
        editorComponent: 'Condition',
        placeholder: 'initialPayload.event_name == \'customer_signup\'',
        example: 'initialPayload.event_name == \'customer_signup\'',
        help: 'The condition that must be met for this action to run. If the condition is not met, the action will be skipped.'
      }
    }
  }
```
Now when you add your action to your app, you will see an input for a filter.
## Using Conditions
Conditions are evaluated as JavaScript expressions. Some examples include not executing your action unless there is a certain quantity of a single attribute:

```javascript
// payload is automatically set to the initial request's
// JSON body or the output of the previous action
payload = {
  "orders" : [
    {
      "id": 1,
    },{
      "id": 2,
    },
    ...
  ]
}
```
```javascript
payload.orders.length > 100
```
only executing on specific events:
```javascript
payload = {
  "event_id": "HFD7GD",
  "event_name": "customer_signup",
  ...
}
```
```javascript
payload.event_name === 'customer_signup'
```
or only executing if specific values are included:
```javascript
payload = {
    "order": {
      "id": "GFS678",
      "customer_group": [
        "VIP"
      ]
    }
}
```
```javascript
payload.order.customer_group.includes('VIP')
```

## `false` Conditions
In the case that the condition you provided for an action evaluates to `false`, your action will not execute and your app will continue running. This means if you have more actions after, they will run as expected even though a condition failed for a previous action. 
:::tip 
`false` conditions and other app logic can be verified in your app's Activity Log. 
:::
