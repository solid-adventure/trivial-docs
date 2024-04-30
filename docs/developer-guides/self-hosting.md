# Self-Hosting

Trivial is available as open source software and can be self-hosted. There are four repositories that make up Trivial; the ReadMe in each repo is best resource for setting up each component. The easiest place to get started is with trivial-ui, using the [cloud staging API](/developer-guides/cloud-staging-api).




:::tip Self-hosting is for advanced users with a background in web infrastructure.
If you're just getting started with Trivial, we recommend using the [cloud-hosted version](https://www.trivialapps.io).
:::

## [trivial-ui](https://github.com/solid-adventure/trivial-ui)
A Vue-based UI to generate and debug NodeJS code within safe parameters, with minimal experience writing code.

## [trivial-core](https://github.com/solid-adventure/trivial-core)
The NodeJS event processor generator, importable into a GUI as an NPM module.

## [trivial-api](https://github.com/solid-adventure/trivial-api)
A RESTful API counterpart to allow trivial-ui to store users, app configurations, and runtime diagnostics used in the ui.

## [trivial-docs](https://github.com/solid-adventure/trivial-docs)
This documentation, which is shared across all Trivial codebases.
