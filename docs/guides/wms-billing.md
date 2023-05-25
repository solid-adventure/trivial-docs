---
outline: deep
---

# WMS Billing Guide

This walkthrough demonstrates how Trivial can be used as the billing engine for a WMS. It assumes the Trivial editor has already been [setup](/getting-started) to deploy AWS Lambdas on save.

In this pattern, the WMS will send events when billable activity occurs, such as shipping an order. The rule processor will receive the event, calculate a charge based on the business rules, and respond with the amount to charge.

## Listening for Events
First, we'll create a processor for billable events.

1. Go to `<your trivial url>/apps/new`
2. Name your app, e.g. "WMS Billing Engine" and hit **Create**
3. Click into SendResponse and set `status` to `200`
4. Click **Save**
5. Under App Trigger, select *Receive Webhook*  and hit **Copy Webhook URL**

At this stage, your rules are empty. When the app receives events, it will save the run into the diagnostics and return a `200: OK` without any further action.

Use the *Activity Log* link in the left menu to review the run.

## Sending Events
Next, the WMS should be configured to make a POST request to the processor's webhook URL when billable activities occur. The event should have a JSON body describing the activity.

For example, a shipped order might look like:
```
POST <processor webhook domain>/webhooks/receive
```
```json
{
    "event":
    {
        "type": "order_shipped",
        "order_id": "ABC-001",
        "customer_id": 123,
        "billing_plan": "starter",
        "items":
        [
            {
                "sku": 456,
                "quantity": 1
            }
        ]
    }
}

```

Go to `<your trivial-url>/activity` to verify that the processor has received the event. The JSON body you sent should be visible as `InitialPayload`.

:::tip
The trivial builder can send events to itself for testing. Look for the *App Trigger* section at the top of the builder and set to *Manual*. Use the *Edit Payload* button to set the data your app will be run with for the initital event.
:::

## Creating Event Rules
Now that we have event data, we can create rules that process events differently, based on their attributes. For our example, let's assume we have two billing plans, "starter" and "growth". We'll create two sets of rules, and sort the incoming events into the appropriate bucket.

::: tip
We use custom functions here to build an MVP quickly, but building financial calculators from out-of-the-box actions is somewhat tedious.

In a real use case, we would likely create custom actions for our users specific to calculating money. See [Creating Actions](/concepts/actions#creating-actions) for more info.
:::

1. In the App Builder, click **Add Action**
2. Choose **If** and hit **Add This Action**
3. Drag the If action into the top position, then click into it.
4. In *Condition*, type `event.billing_plan == 'starter'`
5. Under *Then*, hit **Add Action** and choose **If** again.
6. This time, in *Condition*, enter `event.type == 'order_shipped'`

Now we've got nested logic that will only affect Order Shipped events on the Starter Plan. Our app tree should look like:

```
├─ ReceiveWebhook
├─ If event.billing_plan is 'starter'
│  ├─ If event.type is 'order_shipped'



```
7. Create a function called `starterOrderShipped` with the following:
```javascript
function starterOrderShipped (initialPayload) {

  return {
    "charge":
        {
            "amount": 3.00,
            "currency": "USD",
            "description": `Order Shipped, ${initialPayload.event.order_id}`
        }
    }

}
```
8. In the *Then* section of Order Shipped, add the **SendReponse** action.

9. Click into SendResponse and set the `body` value to call your method:
```javascript
starterOrderShipped(initialPayload)
```
10. Set status to `200` and hit **Save**

Now, if we send an event to our app, we'll get a response with the amount to charge.

Click **Receive Webhook** to navigate back to the root of your app, and repeat steps 2-9 to handle additional scenarios.






