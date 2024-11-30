# 🚀 Usage

Create a cli and a library project with `{{pkg.extra.id}}`

Simple usage example:

## Project structure

Create a project with the following structure:

```bash
📂 src
  ├── bin.js
  ├── lib.js
  └── main.js
📂 templates
  └── 📂 js-project
  └── 📂 ts-project
📄 package.json
```

## src/main.js

Create a new instance of `{{pkg.extra.id}}` and export it as `core`

```javascript

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { version }  from './package.json'
import { Creatium } from '{{pkg.extra.id}}'

const currentDir   = join( dirname( fileURLToPath( import.meta.url ) ) )
const templatesDir = join( currentDir, '..', 'templates' )

export const core = new Creatium( {
 name: 'Simple test',
 version,
 templates : {
  js : {
   input : join( templatesDir, 'js-project' ),
   name  : 'JavaScript project',
  },
  ts : {
   input : join( templatesDir, 'ts-project' ),
   name  : 'TypeScript project',
  },
 },
} )
```

## src/bin.js

Create a bin file and call the `cli` method of the `core` instance.

```javascript

// create cli
import { core } from './main.js'
await core.cli()
```

## src/lib.js

Create a library file and export the `create` function for use outside.

```javascript
import { core } from './main.js'

/**
 * Create project template.
 * @param {Parameters<typeof core.build>[0]} params - The parameters required for creation.
 * @returns {Promise<Object>} A promise that resolves to the result of the creation process.
 */
export const create = async ( params ) => {

 return await core.build( params )

}
```

## package.json

```json
{
 "name": "create-{my-library-name}",
 "version": "0.0.1",
 "type": "module",
 "main": "src/lib.js",
 "module": "src/lib.js",
 "bin": {
  "create-{my-library-name}": "bin.js"
 },
 "files": [
  "src",
  "templates",
 ]
}
```

## templates

Create a template folder with your templates.
