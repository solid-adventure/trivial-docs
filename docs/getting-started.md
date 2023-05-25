# Getting Started

The fastest way to get started is to import Trivial into a fresh Vue project, which will provide a UI for editing rules and deploying event processors.

## Fresh Install
:::warning
These instructions have not yet been finalized.
:::


1. Create a new [Vue](https://vuejs.org/guide/quick-start.html#creating-a-vue-application) project:
```
npm init vue@latest
```

2. Start the Vue dev environment:
```
cd <your-project-name>
npm install
npm run dev
```

3. Import Trivial Core:

```
npm install trivial-core --save
```

4.  A URL will be displayed where your Vue site can be reached. Visit this link, and sign up for a Trivial account to create a user.

5. To save changes in the UI, you must provide a URL for the API. In .env:

```
# .env

TRIVIAL_API_URL= <Your Trivial API URL>

# Uncomment to use Trivial's secure cloud for the backend:
# TRIVIAL_API_URL=https://trivialapps.io


```

6. To automatically deploy event processors as AWS Lambdas, provide an ARN
```
# .env
LAMBDA_ROLE= <Your AWS ARN>
```