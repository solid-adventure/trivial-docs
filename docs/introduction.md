# Introduction

TrivialJS is an event-drive business rule manager for non-technical users. It provides an If/Then editing interface to generate NodeJS event-processor applications within safe parameters.

A hosted instance is available at [trivialapps.io](https://www.trivialapps.io).

## Repos
TrivialJS is comprised of several codebases:

## [trivial-ui](https://github.com/solid-adventure/trivial-ui)
A Vue-based UI to generate and debug NodeJS code within safe parameters, with minimal experience writing code.

## [trivial-core](https://github.com/solid-adventure/trivial-core)
The NodeJS event processor generator, importable into a GUI as an NPM module.

## trivial-ui-backend
::: warning
trivial-ui-backend has not yet been released as open source. It is expected to be released prior to Nov 2023.
:::
A RESTful API counterpart to allow trivial-ui to store users, app configurations, and runtime diagnostics used in the ui.

## [trivial-docs](https://github.com/solid-adventure/trivial-docs)
This documentation, which is shared across all Trivial codebases.
