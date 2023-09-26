---
outline: deep
---

# Conditional Actions Guide
Actions can be defined with a condition, meaning they can execute depending on the success or failure of a given condition. Conditional actions allow your action to support simple filtering without needing to nest your actions inside If/Else actions. 

## Setting Conditions for Actions
In order for your action to require a condition to execute, you must first modify it's `descriptor.js` file. Inside of `/actions/YOUR-SERVICE/YOUR-ACTION/descriptor.js`, return a `condition` key on `getDefinitionFields`:

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
payload.orders.length > 100
```
only executing on specific events:

```javascript
payload.event_name === 'customer_signup'
```
or only executing if specific values are included:

```javascript
payload.order.customer_group.includes('VIP')
```
