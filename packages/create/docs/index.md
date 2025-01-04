# Usage

```bash
npm create creatium
# or
pnpm create creatium
# or
yarn create creatium
# or
bun create creatium
# or
deno create creatium
```

## As a CLI

```bash
{{name}} [options]
```

## Simple way

Run with anything and a user prompt will appear.

```bash
{{name}}
```

## Show help

```bash
{{name}} --help
```

## With flags

```bash
{{name}} --input ts --output ./build --name 'my-library'
```

## As a JavaScript module

```js
import { create } from '{{name}}'

await create( {
 input: '...',
 output: '...',
 ...
} )
```
