---
outline: deep
---


# Writing Code for Trivial Rules

In the builder UI, rule logic is written in JavaScript. There are a few key conveniences and constraints to keep in mind when writing code for rules:


1. **Provided variables** In addition to any functions you define on the contract, the runtime makes a short list of variables available to rules. They are:
  - `initialPayload`: The payload that was sent to the rule when it was triggered. By convention, this is JSON.
  - `services`: An object containing capabilities provided by the runtime context. This is where you can make network requests, such as in a case where an API wrapper instance was passed as a service.

2. **Async functions**: You can use async functions to make network requests or run other asynchronous code, but they will not display a preview in the builder UI.

## Create Rules that make API Calls
If you need to make an API call from a rule, you can use the `services` object that is passed to the rule. This object contains the capabilities provided by the runtime context. A common use-case for services is an API wrapper passed to your rules as a service, allowing you to make API calls in rules to fetch statistics, etc.. This requires some setup in your runtime context, and takes 3 main  steps:

1. **Create a service**: This is a class that contains the logic for making the API call.
2. **Add the service to the runtime context**: This makes your service class available to the app when it runs.
3. **Add the service instance to the rule evaluation**: If your class needs a shared instance across all rules, pass it in.
4. **Use the service in the rule**: Create rules that use your new class via the `services` object.

Let's tackle each of these in more detail, with a code example.

### Step 1. Create a Service

For our example, we'll create a small class with an async method that fetches a random number from a public API. Here's what that might look like:

```javascript
class RandomNumberService {
  constructor() {
  }
  async call() {
    return await fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new')
    .then(response => response.text())
    .then(data => Number(data));
  }
}
```

:::danger A note on security
When making API calls, be sure to consider the security implications. If you're making a call to an API that requires an API key, never hard-code the key into the builder. Instead, store the key as an environement variable in the runtime context, and allow the service to access it. With this pattern, the API key is never be exposed outside of the runtime context.
:::

### Step 2. Add the Service to the Runtime Context

When we generate our app for the runtime context, we'll pass the service class to the generator. When the generator builds the app, it will make the service available to our rules as a global `services` object.

Here's how you might do that, with `ManifestInput` being the JSON of the manifest we're building an app for, and `dir` being the directory where the generated code will be placed.

```javascript
  const services = {RandomNumberService: RandomNumberService};
  const generator = new Generator(manifestInput, dir, services)
  await generator.main()
```

### Step 3. Add the service instance to the rule evaluation


```javascript

const Rules = require(`../${dir}/rules.js`)
const initialPayload = {
  // your initial payload here
}
const diagnostics = [
  // An array to store diagnostic messages
]
const serviceInstances = {
  randomNumberService: new RandomNumberService()
}

await Rules.apply(initialPayload, diagnostic, serviceInstances)



```

### Step 4. Use the Service in the Rule

Now that we have an app generated with the service, we can use it in a rule. Here's an example rule that uses the `RandomNumberService` to fetch a random number:

In the builder, we can create a rule output that calls our service. If we wanted a rule that only executed if the random number was greater than 50, we could write the following code:

```javascript
// rule condition
await services.randomNumberService.call().then(int => int > 50)
```

## Custom Functions

You can also use services in custom functions, with the caveat that you must pass the services object to your function as parameter. Here's an example of a custom function that uses the `RandomNumberService`:

```javascript
// custom function
async function getRandomNumber(services) {
  return await services.randomNumberService.call();
}
```

When we call the function in a rule, it will look like this:

```javascript
// rule condition
await getRandomNumber(services).then(int => int > 50)
```


