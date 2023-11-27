---
outline: deep
---

# Testing

The easiest way to test your trivial-ui install is working correctly is to use the hosted staging API server.

## Accessing Staging API Server

To host your trivial-ui on staging enviorment do the following:

1. Create an account via the registration [site](https://www.staging.trivialapps.io/register).

2. In you env file, add or set the following: 
:::code-group
```YAML [.env]
TRIVIAL_URL = https://trivial-api-staging.herokuapp.com. 
```
For more specifics, please refer to the trivial-ui [repository](https://github.com/solid-adventure/trivial-ui).

3. 