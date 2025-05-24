# Creatium

## 🔑 Installation

::: code-group

```bash [npm]
npm install creatium
```

```bash [pnpm]
pnpm install creatium
```

```bash [yarn]
yarn add creatium
```

```bash [bun]
bun add creatium
```

```bash [deno]
deno add creatium
```

:::

---

## 🚀 Usage

Create a cli and a library project with `creatium`

### Simple use case

Recommended for most use cases.

Below we show a practical example.

> {my-library-name} refers to the name of your library. Change it to the name of your library.

#### Project structure

Create a project with the following structure:

```text
📂 data
├── 📂 templates
│   ├── 📂 js-project
│   │   └── ... (files, folders...)
│   └── 📂 ts-project
│       └── ... (files, folders...)
📂 src
├── bin.js
├── lib.js
├── core.js
📄 package.json
│
```

#### src/core.js

Create a new instance of `creatium` and export it as `core`

```javascript

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { version }  from './package.json'
import { Creatium } from 'creatium'

const currentDir   = join( dirname( fileURLToPath( import.meta.url ) ) )
const templatesDir = join( currentDir, '..', 'data','templates' ) // absolute path for `templates` folder

export const core = new Creatium( {
 name: '{my-library-name}', // recomended use the name of your package.json becasue it will be used by updater function
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

#### src/bin.js

Create a bin file and call the `cli` method of the `core` instance.

```javascript

#!/usr/bin/env node

// create cli
import { core } from './core.js'
await core.cli()
```

#### src/lib.js

Create a library file and export the `create` function for use outside.

```javascript
import { core } from './core.js'

/**
 * Create project template.
 * @param {Parameters<typeof core.build>[0]} params - The parameters required for creation.
 * @returns {Promise<Object>} A promise that resolves to the result of the creation process.
 */
export const create = async ( params ) => {

 return await core.build( params )

}
```

#### package.json

Create a package.json file with the following structure:

```json
{
 "name": "create-{my-library-name}",
 "version": "0.0.1",
 "type": "module",
 "main": "src/lib.js",
 "module": "src/lib.js",
 "bin": {
  "create-{my-library-name}": "src/bin.js"
 },
 "scripts": {
   "dev": "node src/bin.js",
 },
 "files": [
  "src",
  "data",
 ]
}
```

#### Data (templates)

Create a data folder with your `templates`.

```text
📂 data
├── 📂 templates
│   ├── 📂 js-project
│   │   └── ... (files, folders...)
│   ├── 📂 ts-project
│   │   └── ... (files, folders...)
│
```

#### Execute

Once the package is published you can use it with:

```bash
npm create {my-library-name}
# or
pnpm create {my-library-name}
# or
yarn create {my-library-name}
# or
bun create {my-library-name}
# or
deno create {my-library-name}
```

### Advanced use case

You can use the `CreatiumCore` class to create a fully customized __cli__ and __user prompt__.

This class is the one that the main `Creatium` class uses to function.

Below we show a practical example.

> {my-library-name} refers to the name of your library. Change it to the name of your library.

#### Project structure

Create a project with the following structure:

```text
📂 data
├── 📂 templates
│   ├── 📂 js-project
│   │   └── ... (files, folders...)
│   ├── 📂 ts-project
│   │   └── ... (files, folders...)
│   📂 partials
│       ├── 📂 workspace (used in example)
│       │   └── ... (files, folders...)
│       └── 📂 .../
📂 src
├── bin.js
├── lib.js
├── core.js
📄 package.json
│
```

#### src/core.js

- Create a new instance of `CreatiumCore` and export it as `core`
- Create and export `createTemplate` function for use outside in `src/lib.js` and `src/bin.js`

```javascript
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { version }  from './package.json'
import { CreatiumCore } from 'creatium'

const currentDir   = join( dirname( fileURLToPath( import.meta.url ) ) )
const dataDir      = join( currentDir, '..', 'data' ) // Absolute path for the `data` folder
const partialsDir = join( dataDir, 'partials' )
const templatesDir = join( dataDir, 'templates' )

export const core = new CreatiumCore( {
 name: '{my-library-name}',
 version,
 updater  : true,
 cache    : true,
 prompt   : {
  output : {
   type         : 'output',
   alias        : [ 'o' ],
   desc         : 'Where do you want create a new project?',
  },
  name : {
   type  : 'name',
   alias : [ 'n' ],
  },
  wsFiles : {
   type      : 'boolean',
   desc      : 'Include workspace files',
   promptMsg : 'Do you want add a workspace files like LICENSE, .npmrc and .gitignore?',
  },
  desc : {
   type : 'text',
   desc : 'Add a description of your project',
  },
  input : {
   type    : 'template',
   desc    : 'Select template',
   options : {
    js : {
     input : join( templatesDir, 'js-project' ),
     name  : 'JavaScript project',
    },
    ts : {
     input : join( templatesDir, 'ts-project' ),
     name  : 'TypeScript project',
    },
   },
  },
  install : {
   type        : 'install',
   desc        : 'Select package manager',
   onlyOptions : [
    'pnpm',
    'npm',
    'deno',
   ], // Only these package managers can be selected
  },
  openEditor : { type: 'openEditor' },
 },
} )

/**
 * Function for create a new project template.
 * @param {Awaited<ReturnType<typeof core.cli>>} params - The values to create the template.
 * @returns {Promise<void>} - A promise that resolves when the template is created.
 */
export const createTemplate = async ( params ) => {

 try {

  const {
   output,
   input,
   install,
   openEditor,
   name,
   wsFiles,
  } = params

  const { prompt } = core.utils // extract prompt utils and use it for write in prompt line

  // Copy the workspace partials folder if wsFiles is true.
  // this must be first than the creatium.createTemplate because creatium.createTemplate ends the line process
  // and wsFiles must be override in the creatium.createTemplate function.
  if ( wsFiles ) {

   await core.copyDir( {
    input : join( partialsDir, 'workspace' ),
    output,
   } )

   prompt.log.success( 'Added workspace files!' )

  }

  // example of dynamic pkg json config
  const pkgJSON = {
   name        : name,
   description : consts.desc,
   version     : '0.0.1',
   license     : wsFiles ? 'MIT' : undefined
  }

  await core.createTemplate( {
   output,
   input,
   install,
   openEditor,
   name,
   // custom parameters for been susbstituted in the template files
   consts : {
    // example of dynamic pkg json config
    pkg : JSON.stringify( pkgJSON, null, 2 ),
   },
  } )

 }
 catch ( error ) {

  if ( error instanceof Error ) prompt.log.error( error.message ) // show error message in prompt line
  else console.error( 'Unexpected error:', error )

  core.cancel() // cancel the process

 }

}

```

#### src/bin.js

Create a bin file and call the `cli` method of the `core` instance.

```javascript
#!/usr/bin/env node

import { core, createTemplate } from './core.js'
// Run the CLI and obtain the prompt values
const res = await core.cli()
// Call to the create function for create the template
await createTemplate( res )

```

#### src/lib.js

Create a library file and export the `create` function for use outside.

```javascript
import { core, createTemplate } from './core.js'

/**
 * Create project template.
 * @param {Parameters<typeof core.build>[0]} params - The parameters required for creation.
 * @returns {Promise<Object>} A promise that resolves to the result of the creation process.
 */
export const create = async ( params ) => {

  const res = await core.build( params )
  await createTemplate( res )
  return res

}
```

#### package.json

Create a package.json file with the following structure:

```json
{
 "name": "create-{my-library-name}",
 "version": "0.0.1",
 "type": "module",
 "main": "src/lib.js",
 "module": "src/lib.js",
 "bin": {
  "create-{my-library-name}": "src/bin.js"
 },
  "scripts": {
   "dev": "node src/bin.js",
 },
 "files": [
  "src",
  "data",
 ]
}
```

#### Data (templates & partials)

Create a data folder with your templates and your partials.

```text
📂 data
├── 📂 templates
│   ├── 📂 js-project
│   │   └── ... (files, folders...)
│   ├── 📂 ts-project
│   │   └── ... (files, folders...)
│   📂 partials
│       ├── 📂 workspace (used in example)
│       │   └── ... (files, folders...)
│       └── 📂 .../
│
```

#### Execute

Once the package is published you can use it with:

```bash
npm create {my-library-name}
# or
pnpm create {my-library-name}
# or
yarn create {my-library-name}
# or
bun create {my-library-name}
# or
deno create {my-library-name}
```

## ➕ More

- 💡 [Examples](examples.md)
- 📖 [API Docs](api.md)
- 📦 [NPM](https://www.npmjs.com/package/creatium)
