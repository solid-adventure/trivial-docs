# Introduction

Trivial is an event-drive business rule manager for non-technical users. It provides an If/Then editing interface to generate NodeJS event-processor applications within safe parameters.

A hosted instance is available at [trivialapps.io](https://www.trivialapps.io).

## Repos
Trivial is comprised of several codebases:

### trivial-core
The NodeJS event processor generator, importable into a GUI as an NPM module.

### trivial-ui
A Vue-based UI to generate and debug NodeJS code within safe parameters, with minimal experience writing code.

### trivial-ui-backend
A RESTful API counterpart to trivial-ui to store users, app configurations, and runtime diagnostics used in the ui.

### trivial-docs
This documentation, which is shared across all Trivial codebases.


::: warning
trivial-ui and trivial-ui-backend have not yet been released as open source. They are expected to be released prior to Nov 2023.
:::