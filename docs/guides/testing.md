---
outline: deep
---

# Testing

The easiest way to test your trivial-ui install is working correctly is to use the hosted staging API server.

## Accessing Staging API Server

To host your trivial-ui on staging enviorment do the following:

1. Create an account via the staging environment registration [site](https://www.staging.trivialapps.io/register).

2. In you env file, add or uncomment the following: 
:::code-group
```YAML [.env]
TRIVIAL_URL = https://trivial-api-staging.herokuapp.com
```
Once the env variable is added, restart your local trivial-ui. For more about the env file, please refer to the trivial-ui [repository](https://github.com/solid-adventure/trivial-ui).

3. Login to your local trivial-ui using the credentials created on step 1.