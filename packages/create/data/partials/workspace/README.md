# {{prompt.name}} 

## 🔑 Installation

```bash
npm install {{prompt.name}} 
# or 
pnpm add {{prompt.name}} 
# or 
yarn add {{prompt.name}} 
# or 
bun add {{prompt.name}} 
# or 
deno install {{prompt.name}} 
```

## 🔑 Usage

## As a CLI

```bash
{{prompt.name}} <options>
```

### Simple way

Run with anything and a user prompt will appear.

```bash
{{prompt.name}} 
```

### Show help

```bash
{{prompt.name}} --help
```

### With flags

```bash
{{prompt.name}} --input ts --output ./build --name 'my-library'
```

### As a JavaScript module

```js
import { create } from '{{prompt.name}}'

await create( {
	input: '...',
	output: '...',
	...
} )
```

## Development

1. Download repository.
2. Run the following command in the root of the repository: `pnpm install`
3. Develop the project.

## Testing

Run the following command in the root of the repository: `pnpm test`

## License

This project is under the [GPL v3](./LICENSE).
