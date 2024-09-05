---
outline: deep
---

# Cloud Staging API

The easiest way to test that your trivial-ui install is working correctly is to use the hosted staging API server.

## Using the Staging API Server

To run <strong>trivial-ui</strong> locally against the cloud staging API:

1. Register for an account on the [cloud staging site](https://www.staging.trivialapps.io/register?enableFeatures=registration). This is the user and password you'll use locally. Password reset and invitations emails work on staging, making it preferable to use the cloud staging site instead of your local install for account management.


2. Download the trivial-ui [repository](https://github.com/solid-adventure/trivial-ui) and follow the instructions in the readme.


3. In your .env file in <strong>trivial-ui</strong>, add or uncomment the following:
:::code-group
```YAML [.env]

VITE_TRIVIAL_API_URL = https://trivial-api-staging.herokuapp.com

```
:::

4. Start your local trivial-ui by running `npm run dev`. For more about the env file, please refer to the trivial-ui [repository](https://github.com/solid-adventure/trivial-ui).


5. Trivial UI should now be running against the staging API at http://localhost:5173/


The staging API accepts CORS requests from common Vite ports 5173 and 4173, but blocks browser requests from other ports.
