# Core web utils [![Build Status](https://travis-ci.com/eigen-space/utils.svg?branch=master)](https://travis-ci.com/eigen-space/utils)

Package that contains helpful utils for developing projects.

# Project structure

Project should adhere to this structure:
```
    /config - files for configuration project modules
    /src - files used by this application (modules, templates, ligic)
        /common - folder for common stuff
            /types - common types
        /utils - set of components
            /async - async utils
            /common - common utils
            
        package-api.js - a public interface for a library consumer         
                     
    package.json - project configuration, contains project information, dependencies and settings
    webpack.config.package.json - main configuration for webpack
    yarn.log - file fixing specific dependency numbers
    README.md
    <other root configuration files> - for example, jest.config.ts, .gitignore, ...                                             
```
# Why do we have that dependencies?

* `@eigenspace/common-types` - common types.

# Why do we have that dev dependencies?

* `@eigenspace/codestyle` - includes lint rules, config for typescript.
* `@eigenspace/helper-scripts` - common scripts for dev. environment.
* `@types/*` - contains type definitions for specific library.
* `jest` - testing framework to write unit specs (including snapshots).
* `ts-jest` - it lets you use Jest to test projects written in TypeScript.
* `ts-loader` - it is used to load typescript code with webpack. 
* `eslint` - it checks code for readability, maintainability, and functionality errors.
* `eslint-plugin-eigenspace-script` - includes set of script linting rules and configuration for them.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
See `webpack.config.js`.
* `webpack` - it create app bundle for dev mode and production. 
* `copy-webpack-plugin` - used for copy package.json in package bundle.
* `clean-webpack-plugin` - used for clean bundle before run building.
* `husky` - used for configure git hooks.
* `lint-staged` - used for configure linters against staged git files.
* `webpack-cli` - command line interface dor webpack.

# CI

**Important!**

Travis creates the .npmrc file during ci startup. This file contains the access token to the npm repository.
