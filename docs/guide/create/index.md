# Init Creatium Project

Create a new creatium project

## 🔑 Installation

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

## 🚀 Usage

### As a CLI

```bash
create-creatium [options]
```

### Simple way

Run with anything and a user prompt will appear.

```bash
create-creatium
```

### Show help

```bash
create-creatium --help
```

### With flags

```bash
create-creatium --input ts --output ./build --name 'my-library'
```

### As a JavaScript module

```js
import { create } from 'create-creatium'

await create( {
 input: '...',
 output: '...',
 ...
} )
```

## More

- 📖 [API Docs](api.md)
- 📦 [NPM](https://www.npmjs.com/package/create-creatium)
