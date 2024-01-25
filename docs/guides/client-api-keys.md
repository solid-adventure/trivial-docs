---
outline: deep
---

# Client API Keys

In situations where authorized access to Trivial's API is required for an indefinite amount of time, you can utilize a client API key in your requests. Client API keys are not tied to a specific user or app, and have access to all available apps.

This walkthrough demonstrates how to generate and use a long-lived API key over Trivial's API. 

:::info
Client Keys only suitable in **server:server connections**, and should not be used in the UI. Client Keys provide *unscoped* access to the API, overriding user and organization authorization schemes.
:::

## Generating Client Keys

To generate a client key, on the command line, run the following from inside of the `trivial-api` directory to get the Ruby on Rails console started: 
```
bundle exec rails c
```

Now, using the Rails console, store a new client key inside a `key` variable:
```
key = ApiKeys.issue_client_key!
```

An example response from the console will look like:
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
The generated `key_id` is encrypted into `key_access_token`, and they are only available in the result of the call. If the id or key is lost, it is unrecoverable.
:::

Store your `key_id` and `key_access_token` safely on your device.
## Using Client Keys

The first step in using the key is to set the `key_id` value as an environment variable. If you're running the API locally, you can add the `CLIENT_KEYS` variable to `trivial-api/.env`, separating multiple clients with a comma:
```
CLIENT_KEYS=xxx, another-key # key_id from key
```
After restarting your local server, your local instance will now accept the token for authorization.

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
