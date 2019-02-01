## Common libraries for Azure SDK clients

Common libraries.

## Building the project

```sh
npm install
npm run build
```

Run tests via:

```sh
npm test
```

## Implementation Details

The overall build pipeline looks like the following:

1. TypeScript builds all source files under `./src` to ECMAScript Modules (ESM) under `./dist-esm`
2. Rollup builds `./dist-esm` to an optimized single file at `./dist/index.js` as the Node entry point.
3. Rollup builds `./dist-esm` to an optimized browser bundle under `./browser/index.js`.

Tests follow a similar pipeline, however output folders have the `test-` prefix.
