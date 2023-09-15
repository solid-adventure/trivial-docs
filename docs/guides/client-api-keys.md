---
outline: deep
---

# Client API Keys

In situations where authorized access to Trivial's API is required for a variable amount of time, you want to utilize a client API key in your requests. Client API keys are not tied to a specific user or app, and have access to all available apps.

This walkthrough demonstrates how to generate and use a long-lived API key over Trivial's API. 

:::warning
This way of authenticating is only suitable in **server:server connections**, and should never be used in the UI. Exposing the token to your network provides *wide-open access* to the API.
:::

## Generating Client Keys

To generate a client key, on the command line, run the following from inside of the `trivial-api` directory to get the Ruby on Rails console started: 
```
bundle exec rails c
```
:::tip
Issues with getting the Rails console started could be troubleshooted by looking over the [repository README](https://github.com/solid-adventure/trivial-api#readme).
:::

Now, using the Rails console, store a new client key inside a `key` variable:
```
key = ApiKeys.issue_client_key!
```

An example response from the console might look like:
```json
=>
{:key_id=>"xxx",                        
. . .
```

You can print the entire object by simply typing `key` into the console:

```json
=>
{:key_id=>"xxx",                        
 :key_access_token=>"yyy"}
```

Or, you can directly copy the `key_access_token` value to your clipboard:
```
`echo #{key[:key_access_token]} | pbcopy`
```

:::info
The generated `key_id` is encrypted into `key_access_token` and is only available in the result of the call. If the key is lost, it is unrecoverable.
:::

Store your `key_id` and `key_access_token` safely on your device.
## Using Client Keys

The first step in using the key is to set the `key_id` value as an environment variable in your local API. Inside of the `trivial-api/.env` file add the `CLIENT_KEYS` variable, separate multiple clients with a comma:
```
CLIENT_KEYS=xxx, another-key # key_id from key
```
With that change, your local instance now has access to the token for authorization.

In your client, you can now use the access token in an API call as a Bearer token. Assuming the API is running on port 3000:
```json
const data = await fetch('http://localhost:3000/apps', {
headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer yyy` // key_access_token from key
  }
})
.then(response => response.json())

// data: [
//  {
//    "id": 1,
//    "user_id": 1,
//    "name": "ba6811fb3e073d"...

```

## Example Case
Leveraging the full capabilities of Trivial can include things like managing an event processor that chooses which app to run depending on given conditions. A client API key ensures consistent authorization to all those apps for successful event processing.
