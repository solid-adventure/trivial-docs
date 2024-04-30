---
outline: deep
---

# Cloud Staging API

The easiest way to test that your trivial-ui install is working correctly is to use the hosted staging API server.

## Using the Staging API Server

To run <strong>trivial-ui</strong> locally against the cloud staging API:

1. Register for an account on the [cloud staging site](https://www.staging.trivialapps.io/register?enableFeatures=registration). This is the user and password you'll use locally. Password reset and invitations emails work on staging, making it preferable to use the staging UI for account management.


2. In your .env file in <strong>trivial-ui</strong>, add or uncomment the following:
:::code-group
```YAML [.env]

VITE_TRIVIAL_API_URL = https://trivial-api-staging.herokuapp.com

```
:::

Once the env variable is added, restart your local trivial-ui. For more about the env file, please refer to the trivial-ui [repository](https://github.com/solid-adventure/trivial-ui).

2. At this stage, the UI should present the login screen, but all API calls will fail (i.e., you can't login). If you look in the browser console, you'll see CORS errors. To work around this, start a special Chrome instance with security and personalization features disabled.

On Mac:

```

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir="/var/tmp/Chrome"

```

3. You should now be able to login at the address logged by Vite, using your user/password from Step 1, typically http://localhost:5173/

