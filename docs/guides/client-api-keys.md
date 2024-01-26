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

To generate a client key,

Step 1) Create a client secret and copy to your clipboard:
```bash
openssl rand -hex 32 | pbcopy
```

Then, set the `CLIENT_SECRET` environment variable to the value of the secret you just generated:
```yaml

# .env
CLIENT_SECRET=8d105ffc... # paste your secret here

```

Step 2) Now that your `CLIENT_SECRET` is set, still on the command line, run the following from inside of the `trivial-api` directory to get the Ruby on Rails console started:
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

Step 4) Now that we have a key, we need to save the key_id to allow access with it, separating multiple clients with a comma:
```yaml
#.env
CLIENT_SECRET=8d105ffc... # Already set during Step 1
CLIENT_KEYS=xxx, another-key # key_id from key
```
After restarting your local server, your local instance will now accept the token for authorization.


:::info
The generated `key_id` is encrypted into `key_access_token`, and they are only available in the result of the call. If the id or key is lost, it is unrecoverable.
:::

## Using Client Keys

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
