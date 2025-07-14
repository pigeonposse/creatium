# `creatium` - API documentation

## Classes

### Creatium

Class of `Creatium` for create project templates (CLI and Library).

#### Example

```ts
//////////////// core.js ///////////////////

import { Creatium } from 'creatium'
export const core = new Creatium({
  name: 'My Project',
  version: '1.0.0',
  templates: {
    ...
  },
})

//////////////// bin.js ///////////////////

import { core } from './core.js'
core.cli()

//////////////// lib.js ///////////////////

import { core } from './core.js'
export const create = core.build
```

#### Constructors

##### new Creatium()

```ts
new Creatium(options: {
  cache: boolean;
  consts: Record<string, string>;
  intro: false | (data: HookParams) => Response<void>;
  name: string;
  onCancel: false | (data: HookParams) => Response<void>;
  opts: {
     install: false | [
        | "deno"
        | "bun"
        | "npm"
        | "pnpm"
        | "yarn", 
        | "deno"
        | "bun"
        | "npm"
        | "pnpm"
        | "yarn", ...("deno" | "bun" | "npm" | "pnpm" | "yarn")[]];
     name: boolean;
     openEditor: false | ["code" | "subl" | "webstorm", "code" | "subl" | "webstorm", ...("code" | "subl" | "webstorm")[]];
    };
  outro: false | (data: HookParams) => Response<void>;
  templates: {};
  updater: boolean;
  version: string;
 }): Creatium
```

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `object` | - |
| `options.cache`? | `boolean` | Use cache **Default** `true` |
| `options.consts`? | `Record`\<`string`, `string`\> | Add consts to use in your templates. |
| `options.intro`? | `false` \| (`data`: `HookParams`) => [`Response`](#responsev)\<`void`\> | Set custom intro |
| `options.name` | `string` | Set name of you project |
| `options.onCancel`? | `false` \| (`data`: `HookParams`) => [`Response`](#responsev)\<`void`\> | Set custom function foor when user cancels the process |
| `options.opts`? | `object` | Set your prompt options |
| `options.opts.install`? | `false` \| [ \| `"deno"` \| `"bun"` \| `"npm"` \| `"pnpm"` \| `"yarn"`, \| `"deno"` \| `"bun"` \| `"npm"` \| `"pnpm"` \| `"yarn"`, ...("deno" \| "bun" \| "npm" \| "pnpm" \| "yarn")\[\]] | Active/deactivate the install prompt Also, You can set the installators that you want to use. |
| `options.opts.name`? | `boolean` | Active/deactivate the name prompt |
| `options.opts.openEditor`? | `false` \| [`"code"` \| `"subl"` \| `"webstorm"`, `"code"` \| `"subl"` \| `"webstorm"`, ...("code" \| "subl" \| "webstorm")\[\]] | Active/deactivate the openEditor prompt. Also, You can set the editors that you want to use. |
| `options.outro`? | `false` \| (`data`: `HookParams`) => [`Response`](#responsev)\<`void`\> | Set custom outro |
| `options.templates` | `object` | Set your template ooptions |
| `options.updater`? | `boolean` | Use updater **Default** `false` |
| `options.version` | `string` | Set version of you current project Used in for the updater notifications. |

###### Returns

[`Creatium`](#creatium)

#### Methods

##### build()

```ts
build(values?: {
  input: string;
  install: Installer;
  name: string;
  openEditor: TextEditor;
  output: string;
 }, opts?: CreateOpts): Promise<{
  input: string;
  install: undefined;
  name: undefined;
  openEditor: undefined;
  output: string;
}>
```

A simplified version of the `build` method from the main class.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values`? | `object` | The values to override the CLI prompts. If not set, the CLI prompts will be executed. |
| `values.input`? | `string` | Set the input path or the template key |
| `values.install`? | `Installer` | Set the installer |
| `values.name`? | `string` | Set the name of the template |
| `values.openEditor`? | `TextEditor` | Open editor |
| `values.output`? | `string` | Set the output path |
| `opts`? | [`CreateOpts`](#createopts) | The options to pass to the CLI. |

###### Returns

`Promise`\<\{
  `input`: `string`;
  `install`: `undefined`;
  `name`: `undefined`;
  `openEditor`: `undefined`;
  `output`: `string`;
 \}\>

A promise resolving to the prompt values obtained after executing the CLI.

| Name | Type |
| ------ | ------ |
| `input`? | `string` |
| `install`? | `undefined` |
| `name`? | `undefined` |
| `openEditor`? | `undefined` |
| `output`? | `string` |

###### Examples

```ts
// simple usage
await core.build()
```

```ts
// custom usage
await core.build( { args : process.argv.slice(4), hideBin : false } )
```

##### cli()

```ts
cli(props?: CliOpts): Promise<{
  input: string;
  install: undefined;
  name: undefined;
  openEditor: undefined;
  output: string;
}>
```

A simplified version of the `cli` method from the main class.
Initializes and executes the command-line interface (CLI) process.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props`? | [`CliOpts`](#cliopts) | Optional CLI options to configure the initialization process. |

###### Returns

`Promise`\<\{
  `input`: `string`;
  `install`: `undefined`;
  `name`: `undefined`;
  `openEditor`: `undefined`;
  `output`: `string`;
 \}\>

A promise resolving to the prompt values obtained after executing the CLI.

| Name | Type |
| ------ | ------ |
| `input`? | `string` |
| `install`? | `undefined` |
| `name`? | `undefined` |
| `openEditor`? | `undefined` |
| `output`? | `string` |

###### Examples

```ts
// simple usage
await core.cli()
```

```ts
// custom usage
await core.cli( { args : process.argv.slice(4), hideBin : false } )
```

***

### CreatiumCore\<C\>

Customizable class of `Creatium` for create project templates (CLI and Library).

#### Example

```ts
//////////////// core.js ///////////////////

export const core = new CreatiumCore({
  name: 'My Project',
  version: '1.0.0',
  prompts: {
    ...
  },
  ...
})

//////////////// bin.js ///////////////////

import { core } from './core.js'
const res = await core.cli()
// do something with res...
await core.createTemplate( res )

//////////////// lib.js ///////////////////

import { core } from './core.js'
export const create = async (args) => {
  const res = await core.build( args )
  // do something with res...
  await core.createTemplate( res )
}
```

#### Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `C` *extends* [`Config`](#config) | [`Config`](#config) |  |

#### Accessors

##### debugMode

###### Set Signature

```ts
set debugMode(value: boolean): void
```

Force debug mode

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `boolean` |

###### Returns

`void`

#### Constructors

##### new CreatiumCore()

```ts
new CreatiumCore<C>(config: C): CreatiumCore<C>
```

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | `C` |

###### Returns

[`CreatiumCore`](#creatiumcorec)\<`C`\>

#### Methods

##### build()

```ts
build(values?: { [K in string | number | symbol]: { [K in string | number | symbol]: { [K in string | number | symbol]?: { [K in string | number | symbol]: ((...)[(...)] extends Object ? (...) extends (...) ? (...) : (...) : never)[K] } }[K] }[K] }, opts?: CreateOpts): Promise<{ [K in string | number | symbol]: { [K in string | number | symbol]?: { [K in string | number | symbol]: (C["prompt"][K] extends Object ? T extends keyof OptionsClasses ? { [K in (...) | (...) | (...)]: (...)[(...)] } : never : never)[K] } }[K] }>
```

Initialize the CLI and executes the callback function passed in the config.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values`? | \{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]?: \{ \[K in string \| number \| symbol\]: ((...)\[(...)\] extends Object ? (...) extends (...) ? (...) : (...) : never)\[K\] \} \}\[K\] \}\[K\] \} | The values to override the CLI prompts. If not set, the CLI prompts will be executed. |
| `opts`? | [`CreateOpts`](#createopts) | The options to pass to the CLI. |

###### Returns

`Promise`\<\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]?: \{ \[K in string \| number \| symbol\]: (C\["prompt"\]\[K\] extends Object ? T extends keyof OptionsClasses ? \{ \[K in (...) \| (...) \| (...)\]: (...)\[(...)\] \} : never : never)\[K\] \} \}\[K\] \}\>

The result of the callback function.

##### cancel()

```ts
cancel(message?: string): Promise<void>
```

Cancels the current process and exits with code 0.

If a `message` is provided, it will be displayed in the console.
If `onCancel` is set in the config, it will be called with the current data.
If `onCancel` is not set, a default message will be displayed.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message`? | `string` | The message to display before exiting. |

###### Returns

`Promise`\<`void`\>

##### cli()

```ts
cli(props?: CliOpts): Promise<{ [K in string | number | symbol]: { [K in string | number | symbol]?: { [K in string | number | symbol]: (C["prompt"][K] extends Object ? T extends keyof OptionsClasses ? { [K in (...) | (...) | (...)]: (...)[(...)] } : never : never)[K] } }[K] }>
```

Initializes and executes the command-line interface (CLI) process.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props`? | [`CliOpts`](#cliopts) | Optional CLI options to configure the initialization process. |

###### Returns

`Promise`\<\{ \[K in string \| number \| symbol\]: \{ \[K in string \| number \| symbol\]?: \{ \[K in string \| number \| symbol\]: (C\["prompt"\]\[K\] extends Object ? T extends keyof OptionsClasses ? \{ \[K in (...) \| (...) \| (...)\]: (...)\[(...)\] \} : never : never)\[K\] \} \}\[K\] \}\>

A promise resolving to the prompt values obtained after executing the CLI.

###### Examples

```ts
// simple usage
await core.cli()
```

```ts
// custom usage
await core.cli( { args : process.argv.slice( 4), hideBin : false } )
```

##### copyDir()

```ts
copyDir(data: {
  input: string;
  output: string;
}): Promise<void>
```

Copy a directory from input path to output path.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `object` | Options object with input and output paths. |
| `data.input` | `string` | The path to the directory to copy. |
| `data.output` | `string` | The path to the destination directory. |

###### Returns

`Promise`\<`void`\>

- Resolves when the directory has been copied.

###### Example

```ts
const copyResult = await core.copyDir({
  input : '/path/to/sourceDir',
  output: '/path/to/destinationDir',
})
```

##### createTemplate()

```ts
createTemplate(values: CreateTemplateOpts): Promise<void>
```

Create a new project template.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values` | [`CreateTemplateOpts`](#createtemplateopts) | The values to create the template. |

###### Returns

`Promise`\<`void`\>

- A promise that resolves when the template is created.

###### Examples

```ts
// basic usage
await core.createTemplate( { input : 'my/template/path', output : 'my/project/path' } )
```

```ts
// custom usage
await core.createTemplate( {
  input : 'my/template/path',
  output : 'my/project/path',
  install : 'pnpm',
  open : 'vscode',
  consts : {
    version : '1.0.0',
    header : '// Template generated by Creatium. a project from PigeonPosse',
  },
} )
```

##### getTemplateInput()

```ts
getTemplateInput(input?: {
  input: string;
}): Promise<undefined | string>
```

Return the input path of a template by name or path.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input`? | `object` | The name of the template or the path to the template. |
| `input.input`? | `string` | - |

###### Returns

`Promise`\<`undefined` \| `string`\>

The input path of the template or undefined if not found.

###### Examples

```ts
// with template path
const input = await core.getTemplateInput( { input : 'my/template/path' } )
```

```ts
// With template key
// template key must be specified in the config prompt secction.
const input = await core.getTemplateInput( { input : 'templateKey' )
```

##### install()

```ts
install(options?: {
  input: string;
  installer: Installer;
}): Promise<void>
```

Installs the project with the given package manager.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options`? | `object` | The options to install. |
| `options.input`? | `string` | The path to the folder. If not provided, the current directory is used. |
| `options.installer`? | `Installer` | The package manager to use for the installation. |

###### Returns

`Promise`\<`void`\>

###### Example

```ts
await core.install( {
  installer : 'pnpm',
  input     : 'my/project/path',
} )
```

##### intro()

```ts
intro(message?: string): Promise<void>
```

Intro prompt line.

If the parameter `message` is provided, it will be used as the intro message.
If the `intro` option is a function, it will be called with the `this.#data` as the argument.
If the `intro` option is undefined, the default intro message will be used.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message`? | `string` | The intro message. |

###### Returns

`Promise`\<`void`\>

##### openEditor()

```ts
openEditor(params: {
  editor: TextEditor;
  input: string;
}): Promise<void>
```

Open the project in the given editor.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `object` | The parameters for opening the editor. |
| `params.editor`? | `TextEditor` | The editor to open the project in. |
| `params.input`? | `string` | The input path. If not provided, the current directory is used. |

###### Returns

`Promise`\<`void`\>

###### Example

```ts
await core.openEditor( {
  editor : 'vscode',
  input  : 'my/project/path',
 })
```

##### outro()

```ts
outro(message?: string): Promise<void>
```

Outro prompt line.

If the parameter `message` is provided, it will be used as the outro message.
If the `outro` option is a function, it will be called with the `this.#data` as the argument.
If the `outro` option is undefined, the default outro message will be used.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message`? | `string` | The outro message. |

###### Returns

`Promise`\<`void`\>

##### replacePlaceholders()

```ts
replacePlaceholders(args: {
  input: string;
  inputOpts: Options;
  params: Params;
}): Promise<void>
```

Replaces placeholders in files within the specified directory.

This function searches for files in the provided input directory and replaces
placeholders within those files using the specified parameters. The placeholders
in the content are replaced with values from the `params` object.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `args` | `object` | The arguments object. |
| `args.input`? | `string` | The directory path containing files with placeholders. |
| `args.inputOpts`? | `Options` | - |
| `args.params`? | `Params` | An object containing key-value pairs for replacing placeholders. |

###### Returns

`Promise`\<`void`\>

A Promise that resolves once all placeholders have been replaced.

###### Example

```ts
await core.replacePlaceholders( {
  input  : 'my/project/path',
  params : { consts: { version: '1.0.0' }, prompt: { name: 'My Project' } },
})
```

##### updateNotify()

```ts
updateNotify(): Promise<boolean>
```

Shows a notification if the current package is outdated.

**information**: If this 'custom' function is provided, the default
notification will not be shown.

###### Returns

`Promise`\<`boolean`\>

- A promise that resolves when the notification has finished.

#### Properties

| Property | Type |
| ------ | ------ |
| `config` | `C` |
| `utils` | `__module` |

## Functions

### arePathsEqual()

```ts
function arePathsEqual(path1: string, path2: string): boolean
```

Checks if two file paths are equal after normalization.
Normalization ensures that differences like trailing slashes or redundant path segments are ignored.

---

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path1` | `string` | The first file path to compare. |
| `path2` | `string` | The second file path to compare. |

#### Returns

`boolean`

`true` if the paths are equal, `false` otherwise.

***

### box()

```ts
function box(text: string, options?: Options): string
```

Creates a styled box around the provided text.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The text to display inside the box. |
| `options`? | `Options` | Optional configuration options for the box. |

#### Returns

`string`

- The text with the styled box around it.

#### See

https://www.npmjs.com/package/boxen

#### Example

```ts
const boxedText = box('This is a boxed text', { padding: 1 });
console.log(boxedText);
```

***

### cache()

```ts
function cache<Values>(opts: CacheOptions<Values>): Promise<{
  defaultValues: Values;
  get: <ID>(v?: ID) => Promise<ID extends keyof Values ? Values[ID<ID>] : ID extends string ? undefined : Values>;
  path: string;
  reset: () => Promise<void>;
  set: (obj: Partial<Values>) => Promise<void>;
}>
```

Creates a caching mechanism for storing and retrieving values.

#### Type Parameters

| Type Parameter |
| ------ |
| `Values` *extends* `Record`\<`string`, `unknown`\> |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opts` | `CacheOptions`\<`Values`\> | Parameters for configuring the cache. |

#### Returns

`Promise`\<\{
  `defaultValues`: `Values`;
  `get`: \<`ID`\>(`v`?: `ID`) => `Promise`\<`ID` *extends* keyof `Values` ? `Values`\[`ID`\<`ID`\>\] : `ID` *extends* `string` ? `undefined` : `Values`\>;
  `path`: `string`;
  `reset`: () => `Promise`\<`void`\>;
  `set`: (`obj`: `Partial`\<`Values`\>) => `Promise`\<`void`\>;
 \}\>

- An object with methods to interact with the cache.

| Name | Type | Description |
| ------ | ------ | ------ |
| `defaultValues` | `Values` | The default values for the cache. |
| `get` | \<`ID`\>(`v`?: `ID`) => `Promise`\<`ID` *extends* keyof `Values` ? `Values`\[`ID`\<`ID`\>\] : `ID` *extends* `string` ? `undefined` : `Values`\> | Retrieve a value from the cache. **Example** `const theme = get('theme'); console.log(theme); // Output: 'light'` |
| `path` | `string` | The path to the cache file. |
| `reset` | () => `Promise`\<`void`\> | Resets the cache to its default values. **Example** `reset();` |
| `set` | (`obj`: `Partial`\<`Values`\>) => `Promise`\<`void`\> | Updates the cache with the provided values. Merges the existing cached values with the new partial values and updates the cache. |

#### Throws

If the cache value is unexpected or not found.

#### Example

```ts
const { get, set } = await cache({
  projectName: 'myApp',
  id: 'userSettings',
  values: {
     theme: 'dark',
     language: 'en'
  },
});

// Set a new value in the cache
set({ theme: 'light' });

// Retrieve a value from the cache
const theme = get('theme');
console.log(theme); // Output: 'light'

// Retrieve all cached values
const allValues = get();
console.log(allValues); // Output: { theme: 'light', language: 'en' }

// Handle unexpected cache value
try {
  const nonExistentValue = get('nonExistent');
} catch (error) {
  console.error('Error:', error.message); // Output: Cache value is unexpected: nonExistent
}
```

***

### catchExecOutput()

```ts
function catchExecOutput<Res>(command: string): Promise<[Error] | [undefined, Res]>
```

Executes a command and captures its output.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `Res` | `string` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `command` | `string` | The command to execute, including any arguments. |

#### Returns

`Promise`\<[`Error`] \| [`undefined`, `Res`]\>

A promise that resolves with the captured output (stdout).

#### Throws

Will reject with an error if the command fails.

#### Example

```ts
const [error, output] = await catchExecOutput('dovenv --help')
if (error) {
  console.error(error);
} else {
  await writeFile('dovenvHelp.txt', output)
}
```

***

### columns()

```ts
function columns<Data>(data: Data, options?: GlobalOptions): string
```

Formats data into aligned columns for better readability.

#### Type Parameters

| Type Parameter |
| ------ |
| `Data` *extends* `ColumnData` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `Data` | The data to format into columns. |
| `options`? | `GlobalOptions` | Optional configuration options for column formatting. |

#### Returns

`string`

- The text with the data formatted into columns.

#### See

https://www.npmjs.com/package/columnify

#### Example

```ts
// data for columns
const data = [
    {
        name: 'mod1',
        description: 'some description which happens to be far larger than the max',
        version: '0.0.1',
    },
    {
        name: 'module-two',
        description: 'another description larger than the max',
        version: '0.2.0',
    }
];

// set columns with custom config
const columnText = columns(data, {
    showHeaders: false,
    minWidth: 20,
    config: {
        description: {
            maxWidth: 30
        }
    }
});

// print columns
console.log(columnText);
```

***

### copyDir()

```ts
function copyDir(options: CopyDirOptions): Promise<void>
```

Copy a directory from input path to output path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `CopyDirOptions` | Options object with input and output paths. |

#### Returns

`Promise`\<`void`\>

- Resolves when the directory has been copied.

#### Throws

If there is an error copying the directory.

#### Example

```ts
const copyResult = await copyDir({
  input : '/path/to/sourceDir',
  output: '/path/to/destinationDir',
})
```

***

### copyFile()

```ts
function copyFile(options: {
  input: string;
  output: string;
}): Promise<void>
```

Copy a file from input path to output path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `object` | Options object with input and output paths. |
| `options.input` | `string` | - |
| `options.output` | `string` | - |

#### Returns

`Promise`\<`void`\>

- Resolves when the file has been copied.

#### Throws

If there is an error copying the file.

#### Example

```ts
import { copyFile } from '@dovenv/utils'

const copyResult = await copyFile({
  input : '/path/to/source.txt',
  output: '/path/to/destination.txt',
})
```

***

### createDir()

```ts
function createDir(path: string): Promise<void>
```

Creates a directory at the specified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the directory to create. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while creating the directory.

#### Example

```ts
import { createDir } from '@dovenv/utils'
await createDir('./my/dir')
```

***

### createSymlink()

```ts
function createSymlink(options: {
  input: string;
  output: string;
}): Promise<void>
```

Creates a symbolic link from the input path to the output path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | `object` | Options object with input and output paths. |
| `options.input` | `string` | - |
| `options.output` | `string` | - |

#### Returns

`Promise`\<`void`\>

- Resolves when the symbolic link has been created.

#### Throws

If there is an error creating the symbolic link.

#### Example

```ts
import { createSymlink } from '@dovenv/utils'

const symlinkResult = await createSymlink({
  input : '/path/to/source',
  output: '/path/to/destination',
})
```

***

### ensureDir()

```ts
function ensureDir(path: string): Promise<void>
```

Creates a directory if it does not exist.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Path to the directory to create. |

#### Returns

`Promise`\<`void`\>

- A promise that resolves when the directory has been created.

#### Example

```ts
await ensureDir('./path/to/directory')
```

***

### exec()

```ts
function exec(cmd: string): Promise<void>
```

Executes a command in the shell and waits for it to finish.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cmd` | `string` | The command to execute. |

#### Returns

`Promise`\<`void`\>

- A promise that resolves when the command finishes successfully.

#### Throws

- Throws an error if the command fails.

***

### execChild()

```ts
function execChild(cmd: string): Promise<{
  stderr: string;
  stdout: string;
}>
```

Executes a command in a child process and captures its output.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `cmd` | `string` | The command to execute. |

#### Returns

`Promise`\<\{
  `stderr`: `string`;
  `stdout`: `string`;
 \}\>

- A promise that resolves with the output of the command.

| Name | Type |
| ------ | ------ |
| `stderr` | `string` |
| `stdout` | `string` |

#### Throws

- Throws an error if the command fails, along with its stdout and stderr.

***

### existsDir()

```ts
function existsDir(path: string): Promise<boolean>
```

Checks if a directory exists at the specified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to check. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if a directory exists at the specified path, otherwise false.

#### Example

```ts
import { existsDir } from '@dovenv/utils'
const exist = await existsDir('./my/dir')
```

***

### existsFile()

```ts
function existsFile(path: string): Promise<boolean>
```

Checks if a file exists at the specified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to the file. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if the file exists, otherwise false.

#### Throws

If an error occurs while checking the existence of the file.

#### Example

```ts
import { existsFile } from '@dovenv/utils'

const existPKG = await existsFile('./package.json')
```

***

### existsLocalBin()

```ts
function existsLocalBin(binName: string): Promise<boolean>
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `binName` | `string` |

#### Returns

`Promise`\<`boolean`\>

***

### existsLocalBins()

```ts
function existsLocalBins<Bin>(binaries: Bin[]): Promise<{ [key in string]: boolean }>
```

#### Type Parameters

| Type Parameter |
| ------ |
| `Bin` *extends* `string` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `binaries` | `Bin`[] |

#### Returns

`Promise`\<`{ [key in string]: boolean }`\>

***

### existsPath()

```ts
function existsPath(path: string): Promise<boolean>
```

Checks if a file or directory exists at the specified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to check. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if a file or directory exists at the specified path, otherwise false.

#### Throws

If an error occurs while checking the existence of the path.

#### Example

```ts
import { existsPath } from '@dovenv/utils'

const existPKG = await existsPath('./package.json')
```

***

### getAbsolutePath()

```ts
function getAbsolutePath(...paths: string[]): string
```

Resolves path segments into an absolute path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`paths` | `string`[] | Path segments to resolve. |

#### Returns

`string`

- The resolved absolute path.

***

### getArch()

```ts
function getArch(): "arm64" | "x64" | "unknown"
```

Returns the operating system CPU architecture.

#### Returns

`"arm64"` \| `"x64"` \| `"unknown"`

- The operating system CPU architecture.

***

### getBaseName()

```ts
function getBaseName(path: string, suffix?: string): string
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |
| `suffix`? | `string` |

#### Returns

`string`

***

### getClosestPackageDir()

```ts
function getClosestPackageDir(startDir?: string): Promise<string>
```

Finds the closest package directory by traversing up the directory tree.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `startDir`? | `string` | Directory to start searching from. |

#### Returns

`Promise`\<`string`\>

Absolute path to the closest package directory.

***

### getClosestPackageJson()

```ts
function getClosestPackageJson(startDir?: string): Promise<string>
```

Finds the closest package.json by traversing up the directory tree.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `startDir`? | `string` | Directory to start searching from. |

#### Returns

`Promise`\<`string`\>

Absolute path to the closest package.json.

#### Throws

If no package.json is found.

***

### getCurrentDir()

```ts
function getCurrentDir(path?: string): string
```

Gets the current directory.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path`? | `string` | An optional path to resolve the directory from. |

#### Returns

`string`

- The current directory.

#### Example

```ts
getCurrentDir()
```

***

### getDirName()

```ts
function getDirName(path: string): string
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

#### Returns

`string`

***

### getExtName()

```ts
function getExtName(path: string): string
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

#### Returns

`string`

***

### getFilteredFileNames()

```ts
function getFilteredFileNames(props: {
  extensions: string[];
  path: string;
}): Promise<string[]>
```

Gets the file names in a directory and filters them by extension.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | `object` | Function props. |
| `props.extensions` | `string`[] | Array of extensions to filter by, e.g., ['.md', '.txt']. |
| `props.path` | `string` | Path to the directory. |

#### Returns

`Promise`\<`string`[]\>

- A promise that resolves with an array of file names without extensions.

***

### getHomeDir()

```ts
function getHomeDir(): string
```

Returns the string path of the current user's home directory.

On POSIX, it uses the `$HOME` environment variable if defined. Otherwise it
uses the [effective UID](https://en.wikipedia.org/wiki/User_identifier#Effective_user_ID) to look up the user's home directory.

On Windows, it uses the `USERPROFILE` environment variable if defined.
Otherwise it uses the path to the profile directory of the current user.

#### Returns

`string`

#### Since

v2.3.0

***

### getObjectFromJSONFile()

```ts
function getObjectFromJSONFile<Res>(path: string): Promise<Res>
```

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `Res` *extends* [`CommonObj`](#commonobj) | [`CommonObj`](#commonobj) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

#### Returns

`Promise`\<`Res`\>

***

### getPaths()

```ts
function getPaths(str: string, opts?: Options): Promise<FilePath[]>
```

Find files and directories using glob patterns.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `str` | `string` |
| `opts`? | `Options` |

#### Returns

`Promise`\<`FilePath`[]\>

#### Example

```ts
const paths = await getPaths(['*', '!src']);
console.log(paths);
```

***

### getPlatform()

```ts
function getPlatform(): Promise<"windows" | "macos" | "linux" | "unknown">
```

Determines the operating system.

#### Returns

`Promise`\<`"windows"` \| `"macos"` \| `"linux"` \| `"unknown"`\>

- The operating system. Possible values are 'linux', 'macos', or 'windows'.

***

### getStringType()

```ts
function getStringType(value: string): "text" | "path" | "url"
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

#### Returns

`"text"` \| `"path"` \| `"url"`

***

### getSystemEnvPaths()

```ts
function getSystemEnvPaths(__namedParameters: {
  name: string;
  suffix: string;
 }): {
  cache: string;
  config: string;
  data: string;
  log: string;
  temp: string;
}
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | `object` |
| `__namedParameters.name` | `string` |
| `__namedParameters.suffix`? | `string` |

#### Returns

```ts
{
  cache: string;
  config: string;
  data: string;
  log: string;
  temp: string;
}
```

| Name | Type |
| ------ | ------ |
| `cache` | `string` |
| `config` | `string` |
| `data` | `string` |
| `log` | `string` |
| `temp` | `string` |

***

### getTempDir()

```ts
function getTempDir(): string
```

Returns the path to the operating system's temporary directory.

#### Returns

`string`

The path to the operating system's temporary directory.

***

### gradient()

```ts
function gradient(
   txt: string, 
   colors: GradientColors, 
   opts?: GradientOpts): string
```

Generates a gradient string with the specified colors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `txt` | `string` | The text to apply the gradient to. |
| `colors` | `GradientColors` | An array of color names or hex values. |
| `opts`? | `GradientOpts` | Custom opts. |

#### Returns

`string`

- The text with the applied gradient.

#### Example

```ts
// Example usage:
const gradientText = gradient('Gradient Text', ['red', 'yellow', 'green']);
console.log(gradientText);
```

***

### isAbsolutePath()

```ts
function isAbsolutePath(path: string): boolean
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

#### Returns

`boolean`

***

### isDirectory()

```ts
function isDirectory(path: string): Promise<boolean>
```

Checks if the given path points to a directory.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to check. |

#### Returns

`Promise`\<`boolean`\>

- A promise that resolves to true if the path points to a directory, otherwise false.

#### Example

```ts
import { isDirectory } from '@dovenv/utils'

const isDir = await isDirectory('./my/path')
```

***

### isPath()

```ts
function isPath(str: string): boolean
```

Check if a string is a valid path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `str` | `string` | The string to test. |

#### Returns

`boolean`

True if the string is a valid path.

#### Example

```ts
isPath('..') // true
isPath('foo bar') // false
isPath('C:\\') // true
isPath('foo\\bar') // true
isPath('foo/bar') // true
isPath('foo bar/baz') // false
```

***

### joinPath()

```ts
function joinPath(...paths: string[]): string
```

Joins path segments.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`paths` | `string`[] | Path segments to join. |

#### Returns

`string`

- The joined path.

#### Example

```ts
joinPath('user', 'pigeonposse')
```

***

### joinUrl()

```ts
function joinUrl(...parts: string[]): string
```

Joins the given URL parts into a single string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`parts` | `string`[] | The URL parts to join. |

#### Returns

`string`

- The joined URL string.

***

### line()

```ts
function line(__namedParameters: {
  align: "left" | "center" | "right";
  lineChar: string;
  title: string;
 }): string
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | `object` |
| `__namedParameters.align`? | `"left"` \| `"center"` \| `"right"` |
| `__namedParameters.lineChar`? | `string` |
| `__namedParameters.title`? | `string` |

#### Returns

`string`

***

### normalizePath()

```ts
function normalizePath(path: string): string
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

#### Returns

`string`

***

### object2string()

```ts
function object2string(data: unknown): string
```

Converts an object to a JSON string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `unknown` | The data to convert to a string. |

#### Returns

`string`

- The JSON string representation of the data.

***

### readDir()

```ts
function readDir(path: string): Promise<Dirent<string>[]>
```

Reads the contents of a directory.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | Path to the directory to read. |

#### Returns

`Promise`\<`Dirent`\<`string`\>[]\>

- A promise that resolves to an array of [fs.Dirent](https://nodejs.org/api/fs.html#class-fs-dirent) objects.

#### Example

```ts
const dirItems = await readDir('./path/to/directory')
```

***

### readFile()

Reads the content of a file at the specified path.

#### Param

The path of the file to read.

#### Throws

If an error occurs while reading the file.

#### Example

```ts
import { readFile } from '@dovenv/utils'

try {
  const content = await readFile('./example.txt');
  console.log(content);
} catch (error) {
  console.error('Error reading file:', error);
}
```

#### readFile(path, options)

```ts
function readFile(path: PathLike | FileHandle, options?: null | {} & Abortable): Promise<Buffer>
```

Asynchronously reads the entire contents of a file.

If no encoding is specified (using `options.encoding`), the data is returned
as a `Buffer` object. Otherwise, the data will be a string.

If `options` is a string, then it specifies the encoding.

When the `path` is a directory, the behavior of `fsPromises.readFile()` is
platform-specific. On macOS, Linux, and Windows, the promise will be rejected
with an error. On FreeBSD, a representation of the directory's contents will be
returned.

An example of reading a `package.json` file located in the same directory of the
running code:

```js
import { readFile } from 'node:fs/promises';
try {
  const filePath = new URL('./package.json', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
} catch (err) {
  console.error(err.message);
}
```

It is possible to abort an ongoing `readFile` using an `AbortSignal`. If a
request is aborted the promise returned is rejected with an `AbortError`:

```js
import { readFile } from 'node:fs/promises';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = readFile(fileName, { signal });

  // Abort the request before the promise settles.
  controller.abort();

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

Aborting an ongoing request does not abort individual operating
system requests but rather the internal buffering `fs.readFile` performs.

Any specified `FileHandle` has to support reading.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `PathLike` \| `FileHandle` | filename or `FileHandle` |
| `options`? | `null` \| \{\} & `Abortable` | - |

##### Returns

`Promise`\<`Buffer`\>

- A promise that resolves to the content of the file as a string or buffer.

Fulfills with the contents of the file.

##### Param

The path of the file to read.

##### Throws

If an error occurs while reading the file.

##### Example

```ts
import { readFile } from '@dovenv/utils'

try {
  const content = await readFile('./example.txt');
  console.log(content);
} catch (error) {
  console.error('Error reading file:', error);
}
```

##### Since

v10.0.0

#### readFile(path, options)

```ts
function readFile(path: PathLike | FileHandle, options: {} & Abortable | BufferEncoding): Promise<string>
```

Asynchronously reads the entire contents of a file.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `PathLike` \| `FileHandle` | A path to a file. If a URL is provided, it must use the `file:` protocol. If a `FileHandle` is provided, the underlying file will _not_ be closed automatically. |
| `options` | \{\} & `Abortable` \| `BufferEncoding` | An object that may contain an optional flag. If a flag is not provided, it defaults to `'r'`. |

##### Returns

`Promise`\<`string`\>

- A promise that resolves to the content of the file as a string or buffer.

##### Param

The path of the file to read.

##### Throws

If an error occurs while reading the file.

##### Example

```ts
import { readFile } from '@dovenv/utils'

try {
  const content = await readFile('./example.txt');
  console.log(content);
} catch (error) {
  console.error('Error reading file:', error);
}
```

#### readFile(path, options)

```ts
function readFile(path: PathLike | FileHandle, options?: null | BufferEncoding | ObjectEncodingOptions & Abortable & {}): Promise<string | Buffer>
```

Asynchronously reads the entire contents of a file.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `PathLike` \| `FileHandle` | A path to a file. If a URL is provided, it must use the `file:` protocol. If a `FileHandle` is provided, the underlying file will _not_ be closed automatically. |
| `options`? | `null` \| `BufferEncoding` \| `ObjectEncodingOptions` & `Abortable` & \{\} | An object that may contain an optional flag. If a flag is not provided, it defaults to `'r'`. |

##### Returns

`Promise`\<`string` \| `Buffer`\>

- A promise that resolves to the content of the file as a string or buffer.

##### Param

The path of the file to read.

##### Throws

If an error occurs while reading the file.

##### Example

```ts
import { readFile } from '@dovenv/utils'

try {
  const content = await readFile('./example.txt');
  console.log(content);
} catch (error) {
  console.error('Error reading file:', error);
}
```

***

### relativePath()

```ts
function relativePath(from: string, to: string): string
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `from` | `string` |
| `to` | `string` |

#### Returns

`string`

***

### removeDir()

```ts
function removeDir(path: string): Promise<void>
```

Removes a directory and its contents if it exists.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the directory to remove. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while removing the directory.

#### Example

```ts
import { removeDir } from '@dovenv/utils'

try {
  await removeDir('./my/path')
} catch (e) {
  console.log(e)
}
```

***

### removeDirIfExist()

```ts
function removeDirIfExist(path: string): Promise<void>
```

Removes a directory and its contents if it exists.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the directory to remove. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while removing the directory.

#### Example

```ts
import { removeDirIfExist } from '@dovenv/utils'

await removeDirIfExist('./my/path')
```

***

### removeFile()

```ts
function removeFile(path: string): Promise<void>
```

Removes a file.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the file to remove. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while removing the file.

#### Example

```ts
try {
  await removeFile('./my/path')
} catch (e) {
  console.log(e)
}
```

***

### removeFileIfExist()

```ts
function removeFileIfExist(path: string): Promise<void>
```

Removes a file if it exists.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the file to remove. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while removing the file.

#### Example

```ts
try {
  await removeFile('./my/path')
} catch (e) {
  console.log(e)
}
```

***

### removePathIfExist()

```ts
function removePathIfExist(path: string): Promise<void>
```

Removes a file or directory if it exists.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the file or directory to remove. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while removing the file or directory.

#### Example

```ts
try {
  await removePathIfExist('./my/path')
} catch (e) {
  console.log(e)
}
```

***

### replacePlaceholders()

```ts
function replacePlaceholders(props: Props): Promise<string>
```

Replace placeholders in a string with their corresponding values.

The function takes a string with placeholders, an object with parameter values,
and an optional custom parameter function.

The function returns a Promise that resolves to the string with all placeholders
replaced.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | `Props` | Props for the function. |

#### Returns

`Promise`\<`string`\>

- A Promise that resolves to the string with all placeholders replaced.

***

### resolvePath()

```ts
function resolvePath(...paths: string[]): string
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`paths` | `string`[] |

#### Returns

`string`

***

### table()

```ts
function table(data: TableData, options?: TableConstructorOptions): string
```

Generates a text-based table from the provided data array.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `TableData` | The data to display in the table. |
| `options`? | `TableConstructorOptions` | Optional configuration options for the table. |

#### Returns

`string`

- The text-based table.

#### See

https://www.npmjs.com/package/table

#### Example

```ts
const data = [
    ['Name', 'Age', 'Country'],
    ['John', 30, 'USA'],
    ['Alice', 25, 'UK'],
    ['Bob', 35, 'Canada'],
];
const tableText = table(data);
console.log(tableText);
```

***

### validateHomeDir()

```ts
function validateHomeDir(path: string): string
```

Validates and resolves a path with home directory replacement.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path to validate and resolve. |

#### Returns

`string`

- The validated and resolved absolute path.

#### Example

```ts
import { validateHomeDir } from '@dovenv/utils'

const path = validateHomeDir('~/Documents')

console.log(path) // returns: /users/{username}/Documents

const path = validateHomeDir('/Home')

console.log(path) // returns same: /Home
```

***

### writeFile()

```ts
function writeFile(
   file: PathLike | FileHandle, 
   data: 
  | string
  | ArrayBufferView<ArrayBufferLike>
  | Iterable<string | ArrayBufferView<ArrayBufferLike>, any, any>
  | AsyncIterable<string | ArrayBufferView<ArrayBufferLike>, any, any>
  | Stream, 
options?: null | BufferEncoding | ObjectEncodingOptions & {} & Abortable): Promise<void>
```

Asynchronously writes data to a file, replacing the file if it already exists. `data` can be a string, a buffer, an
[AsyncIterable](https://tc39.github.io/ecma262/#sec-asynciterable-interface), or an
[Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) object.

The `encoding` option is ignored if `data` is a buffer.

If `options` is a string, then it specifies the encoding.

The `mode` option only affects the newly created file. See `fs.open()` for more details.

Any specified `FileHandle` has to support writing.

It is unsafe to use `fsPromises.writeFile()` multiple times on the same file
without waiting for the promise to be settled.

Similarly to `fsPromises.readFile` \- `fsPromises.writeFile` is a convenience
method that performs multiple `write` calls internally to write the buffer
passed to it. For performance sensitive code consider using `fs.createWriteStream()` or `filehandle.createWriteStream()`.

It is possible to use an `AbortSignal` to cancel an `fsPromises.writeFile()`.
Cancelation is "best effort", and some amount of data is likely still
to be written.

```js
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

try {
  const controller = new AbortController();
  const { signal } = controller;
  const data = new Uint8Array(Buffer.from('Hello Node.js'));
  const promise = writeFile('message.txt', data, { signal });

  // Abort the request before the promise settles.
  controller.abort();

  await promise;
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}
```

Aborting an ongoing request does not abort individual operating
system requests but rather the internal buffering `fs.writeFile` performs.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `file` | `PathLike` \| `FileHandle` | filename or `FileHandle` |
| `data` | \| `string` \| `ArrayBufferView`\<`ArrayBufferLike`\> \| `Iterable`\<string \| ArrayBufferView\<ArrayBufferLike\>, `any`, `any`\> \| `AsyncIterable`\<string \| ArrayBufferView\<ArrayBufferLike\>, `any`, `any`\> \| `Stream` | - |
| `options`? | `null` \| `BufferEncoding` \| `ObjectEncodingOptions` & \{\} & `Abortable` | - |

#### Returns

`Promise`\<`void`\>

Fulfills with `undefined` upon success.

#### Since

v10.0.0

***

### writeFileContent()

```ts
function writeFileContent(path: string, content: string | Buffer<ArrayBufferLike>): Promise<void>
```

Writes content to a file at the specified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | The path of the file to write to. |
| `content` | `string` \| `Buffer`\<`ArrayBufferLike`\> | The content to write to the file. |

#### Returns

`Promise`\<`void`\>

#### Throws

If an error occurs while writing to the file.

#### Example

```ts
import { writeFileContent } from '@dovenv/utils'

await writeFileContent('./greetFile.txt', 'Hello')
```

## Type Aliases

### Any

```ts
type Any: any;
```

Any type
Same as `any` type. Used only for prevent ts errors

***

### AnyArray

```ts
type AnyArray: any[];
```

Any Array type
Same as `any[]` type. Used only for prevent ts errors

***

### AssertEqual\<T, U\>

```ts
type AssertEqual<T, U>: <V>() => V extends T ? 1 : 2 extends <V>() => V extends U ? 1 : 2 ? true : false;
```

AssertEqual

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

#### Description

Checks if two types `T` and `U` are equal.

#### Example

```ts
type Test = AssertEqual<string, string>; // Expected: true
  type TestFail = AssertEqual<string, number>; // Expected: false
```

***

### CliOpts

```ts
type CliOpts: {
  args: string[];
  hideBin: boolean;
};
```

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `args`? | `string`[] | Arguments to pass to the command **Default** `process.argv.slice(2)` |
| `hideBin`? | `boolean` | Hide the first two arguments **Default** `false` |

***

### CommonObj

```ts
type CommonObj: Record<string, unknown> | Record<string, unknown>[] | unknown[];
```

***

### Config

```ts
type Config: {
  cache: boolean;
  hooks: {
     afterPrompt: <D>(data: D) => Response<D | undefined>;
     beforePrompt: <D>(data: D) => Response<D | undefined>;
    };
  intro: (data: HookParams) => Response<void> | false;
  name: string;
  onCancel: (data: HookParams) => Response<void> | false;
  outro: (data: HookParams) => Response<void> | false;
  prompt: OptionsParams;
  updater: boolean;
  version: string;
};
```

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `cache`? | `boolean` | Use cache **Default** `true` |
| `hooks`? | \{ `afterPrompt`: \<`D`\>(`data`: `D`) => [`Response`](#responsev)\<`D` \| `undefined`\>; `beforePrompt`: \<`D`\>(`data`: `D`) => [`Response`](#responsev)\<`D` \| `undefined`\>; \} | hooks for |
| `hooks.afterPrompt`? | \<`D`\>(`data`: `D`) => [`Response`](#responsev)\<`D` \| `undefined`\> | - |
| `hooks.beforePrompt`? | \<`D`\>(`data`: `D`) => [`Response`](#responsev)\<`D` \| `undefined`\> | - |
| `intro`? | (`data`: `HookParams`) => [`Response`](#responsev)\<`void`\> \| `false` | Set custom intro |
| `name` | `string` | Set name of you project |
| `onCancel`? | (`data`: `HookParams`) => [`Response`](#responsev)\<`void`\> \| `false` | Set custom function foor when user cancels the process |
| `outro`? | (`data`: `HookParams`) => [`Response`](#responsev)\<`void`\> \| `false` | Set custom outro |
| `prompt` | `OptionsParams` | Set you prompts config |
| `updater`? | `boolean` | Use updater **Default** `false` |
| `version` | `string` | Set version of you current project Used in for the updater notifications. |

***

### CreateOpts

```ts
type CreateOpts: CliOpts & {
  activeCli: boolean;
};
```

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `activeCli`? | `boolean` | Options for activate cli. **Default** `true` |

***

### CreateTemplateOpts

```ts
type CreateTemplateOpts: {
  consts: Record<string, string>;
  input: string;
  install: Installer;
  name: string;
  openEditor: TextEditor;
  output: string;
};
```

#### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `consts`? | `Record`\<`string`, `string`\> | Add consts to use in your templates. |
| `input`? | `string` | Set the input path or the template key |
| `install`? | `Installer` | Set the installer |
| `name`? | `string` | Set the name of the template |
| `openEditor`? | `TextEditor` | Open editor |
| `output`? | `string` | Set the output path |

***

### DeepNonNullable\<T\>

```ts
type DeepNonNullable<T>: Prettify<_DeepNonNullable<T>>;
```

DeepNonNullable

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Description

NonNullable that works for deeply nested structure

#### Example

```ts
type NestedProps = {
    first?: null | {
      second?: null | {
        name?: string | null |
        undefined;
      };
    };
  };
  type RequiredNestedProps = DeepNonNullable<NestedProps>;
  // Expect: {
  //   first: {
  //     second: {
  //       name: string;
  //     };
  //   };
  // }
```

***

### DeepPartial\<T\>

```ts
type DeepPartial<T>: T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
```

DeepPartial

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

***

### DeepRequired\<T\>

```ts
type DeepRequired<T>: Prettify<_DeepRequired<T>>;
```

DeepRequired

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Description

Required that works for deeply nested structure

#### Example

```ts
type NestedProps = {
    first?: {
      second?: {
        name?: string;
      };
    };
  };
  type RequiredNestedProps = DeepRequired<NestedProps>
  // Expect: {
  //   first: {
  //     second: {
  //       name: string;
  //     };
  //   };
  // }
```

***

### EmptyObject

```ts
type EmptyObject: {};
```

***

### ExpectEqual\<T, U\>

```ts
type ExpectEqual<T, U>: AssertEqual<T, U> extends true ? T : never;
```

ExpectEqual

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

#### Description

Returns the type `T` if `T` and `U` are equal; otherwise, returns `never`.

#### Example

```ts
type Test = ExpectEqual<string, string>; // Expected: string
  type TestFail = ExpectEqual<string, number>; // Expected: never
```

***

### FunctionKeys\<T\>

```ts
type FunctionKeys<T>: { [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never }[keyof T];
```

FunctionKeys

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `object` |

#### Description

Get union type of keys that are functions in object type `T`

#### Example

```ts
type MixedProps = {name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any;};

  // Expect: "setName | someFn"
  type Keys = FunctionKeys<MixedProps>;
```

***

### GetResponse\<T\>

```ts
type GetResponse<T>: T extends (...args: Any[]) => infer R ? Awaited<R> : T;
```

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

***

### NonFunctionKeys\<T\>

```ts
type NonFunctionKeys<T>: { [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K }[keyof T];
```

NonFunctionKeys

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `object` |

#### Description

Get union type of keys that are non-functions in object type `T`

#### Example

```ts
type MixedProps = {name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any;};

  // Expect: "name | someKey"
  type Keys = NonFunctionKeys<MixedProps>;
```

***

### NonUndefined\<A\>

```ts
type NonUndefined<A>: A extends undefined ? never : A;
```

NonUndefined

#### Type Parameters

| Type Parameter |
| ------ |
| `A` |

#### Description

Exclude undefined from set `A`

#### Example

```ts
// Expect: "string | null"
  SymmetricDifference<string | null | undefined>;
```

***

### ObjectKeys\<Values\>

```ts
type ObjectKeys<Values>: keyof Values;
```

Keys of Object

#### Type Parameters

| Type Parameter |
| ------ |
| `Values` |

***

### ObjectToArray\<T, Key\>

```ts
type ObjectToArray<T, Key>: { [K in keyof T]: T[K] & { [k in Key]: K } }[keyof T][];
```

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* `Record`\<`string`, [`Any`](#any)\> | - |
| `Key` *extends* `string` | `"type"` |

***

### ObjectValues\<Values\>

```ts
type ObjectValues<Values>: Values[keyof Values];
```

Values of Object

#### Type Parameters

| Type Parameter |
| ------ |
| `Values` |

***

### Prettify\<T\>

```ts
type Prettify<T>: { [K in keyof T]: T[K] } & {};
```

Prettify your type for better readability

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

***

### Response\<V\>

```ts
type Response<V>: Promise<V> | V;
```

#### Type Parameters

| Type Parameter |
| ------ |
| `V` |

***

### ReturnAwaitedType\<T\>

```ts
type ReturnAwaitedType<T>: Awaited<ReturnType<T>>;
```

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* (...`args`: [`Any`](#any)) => [`Any`](#any) |

***

### SingleChar\<T\>

```ts
type SingleChar<T>: T extends `${infer First}${infer Rest}` ? Rest extends "" ? First : never : never;
```

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* `string` | `string` |

## Variables

### color

```ts
const color: Record<
  | "black"
  | "blackBright"
  | "blue"
  | "blueBright"
  | "cyan"
  | "cyanBright"
  | "gray"
  | "green"
  | "greenBright"
  | "grey"
  | "magenta"
  | "magentaBright"
  | "red"
  | "redBright"
  | "white"
  | "whiteBright"
  | "yellow"
  | "yellowBright"
  | "bgBlack"
  | "bgBlackBright"
  | "bgBlue"
  | "bgBlueBright"
  | "bgCyan"
  | "bgCyanBright"
  | "bgGray"
  | "bgGreen"
  | "bgGreenBright"
  | "bgGrey"
  | "bgMagenta"
  | "bgMagentaBright"
  | "bgRed"
  | "bgRedBright"
  | "bgWhite"
  | "bgWhiteBright"
  | "bgYellow"
  | "bgYellowBright"
  | "blink"
  | "bold"
  | "dim"
  | "doubleunderline"
  | "framed"
  | "hidden"
  | "inverse"
  | "italic"
  | "overlined"
  | "reset"
  | "strikethrough"
| "underline", (v: string) => string>;
```

Provides colors for terminal output.

#### Example

```ts
console.log(color.green('This text is green'));
```

***

### env

```ts
const env: {
  isBrowser: boolean;
  isBun: boolean;
  isDeno: boolean;
  isJsDom: boolean;
  isNode: boolean;
  isWebWorker: boolean;
};
```

#### Type declaration

| Name | Type |
| ------ | ------ |
| `isBrowser` | `boolean` |
| `isBun` | `boolean` |
| `isDeno` | `boolean` |
| `isJsDom` | `boolean` |
| `isNode` | `boolean` |
| `isWebWorker` | `boolean` |

***

### INSTALLER

```ts
const INSTALLER: {
  BUN: 'bun';
  DENO: 'deno';
  NONE: 'none';
  NPM: 'npm';
  PNPM: 'pnpm';
  YARN: 'yarn';
};
```

installer values used in `install` option.

#### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `BUN` | `"bun"` | 'bun' |
| `DENO` | `"deno"` | 'deno' |
| `NONE` | `"none"` | 'none' |
| `NPM` | `"npm"` | 'npm' |
| `PNPM` | `"pnpm"` | 'pnpm' |
| `YARN` | `"yarn"` | 'yarn' |

***

### isBrowser

```ts
const isBrowser: boolean;
```

***

### isBun

```ts
const isBun: boolean;
```

***

### isDeno

```ts
const isDeno: boolean;
```

***

### isDev

```ts
const isDev: boolean;
```

True if the environment is a development environment.

***

### isJsDom

```ts
const isJsDom: boolean;
```

***

### isNode

```ts
const isNode: boolean;
```

***

### isWebWorker

```ts
const isWebWorker: boolean;
```

***

### OPTION

```ts
const OPTION: {
  array: 'array';
  boolean: 'boolean';
  install: 'install';
  multiselect: 'multiselect';
  name: 'name';
  number: 'number';
  openEditor: 'openEditor';
  output: 'output';
  path: 'path';
  select: 'select';
  template: 'template';
  text: 'text';
  void: 'void';
};
```

Object of the CREATIUM types

#### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `array` | `"array"` | 'array' |
| `boolean` | `"boolean"` | 'boolean' |
| `install` | `"install"` | 'install' |
| `multiselect` | `"multiselect"` | 'multiselect' |
| `name` | `"name"` | 'name' |
| `number` | `"number"` | 'number' |
| `openEditor` | `"openEditor"` | 'openEditor' |
| `output` | `"output"` | 'output' |
| `path` | `"path"` | 'path' |
| `select` | `"select"` | 'select' |
| `template` | `"template"` | 'template' |
| `text` | `"text"` | 'text' |
| `void` | `"void"` | 'void' |

***

### prompt

```ts
const prompt: {
  box: (opts: {
     opts: BoxParams[1];
     type: PromptLineMethod;
     value: BoxParams[0];
    }) => void;
  cancel: (message?: string) => void;
  columns: (opts: {
     opts: ColumnsParams[1];
     type: PromptLineMethod;
     value: ColumnsParams[0];
    }) => void;
  confirm: (opts: p.ConfirmOptions) => Promise<boolean | symbol>;
  group: <T>(prompts: p.PromptGroup<T>, opts?: p.PromptGroupOptions<T>) => Promise<{ [P in keyof p.PromptGroupAwaitedReturn<T>]: p.PromptGroupAwaitedReturn<T>[P] }>;
  groupMultiselect: <Value>(opts: p.GroupMultiSelectOptions<Value>) => Promise<symbol | Value[]>;
  intro: (title?: string) => void;
  isCancel: typeof p.isCancel;
  log: {
     error: (message: string) => void;
     info: (message: string) => void;
     message: (message?: string, { symbol }?: p.LogMessageOptions) => void;
     step: (message: string) => void;
     success: (message: string) => void;
     warn: (message: string) => void;
     warning: (message: string) => void;
    };
  multiselect: <Value>(opts: p.MultiSelectOptions<Value>) => Promise<symbol | Value[]>;
  note: (message?: string, title?: string) => void;
  number: typeof number;
  outro: (message?: string) => void;
  password: (opts: p.PasswordOptions) => Promise<string | symbol>;
  select: <Value>(opts: p.SelectOptions<Value>) => Promise<symbol | Value>;
  selectKey: <Value>(opts: p.SelectOptions<Value>) => Promise<symbol | Value>;
  spinner: ({ indicator }?: p.SpinnerOptions) => {
     message: (msg?: string) => void;
     start: (msg?: string) => void;
     stop: (msg?: string, code?: number) => void;
    };
  stream: {
     error: (iterable: Iterable<string> | AsyncIterable<string>) => Promise<void>;
     info: (iterable: Iterable<string> | AsyncIterable<string>) => Promise<void>;
     message: (iterable: Iterable<string> | AsyncIterable<string>, { symbol }?: p.LogMessageOptions) => Promise<void>;
     step: (iterable: Iterable<string> | AsyncIterable<string>) => Promise<void>;
     success: (iterable: Iterable<string> | AsyncIterable<string>) => Promise<void>;
     warn: (iterable: Iterable<string> | AsyncIterable<string>) => Promise<void>;
     warning: (iterable: Iterable<string> | AsyncIterable<string>) => Promise<void>;
    };
  table: (opts: {
     opts: TableParams[1];
     type: PromptLineMethod;
     value: TableParams[0];
    }) => void;
  tasks: (tasks: p.Task[]) => Promise<void>;
  text: (opts: p.TextOptions) => Promise<string | symbol>;
  updateSettings: typeof p.updateSettings;
};
```

#### Type declaration

| Name | Type |
| ------ | ------ |
| `box` | (`opts`: \{ `opts`: `BoxParams`\[`1`\]; `type`: `PromptLineMethod`; `value`: `BoxParams`\[`0`\]; \}) => `void` |
| `cancel` | (`message`?: `string`) => `void` |
| `columns` | (`opts`: \{ `opts`: `ColumnsParams`\[`1`\]; `type`: `PromptLineMethod`; `value`: `ColumnsParams`\[`0`\]; \}) => `void` |
| `confirm` | (`opts`: `p.ConfirmOptions`) => `Promise`\<`boolean` \| `symbol`\> |
| `group` | \<`T`\>(`prompts`: `p.PromptGroup`\<`T`\>, `opts`?: `p.PromptGroupOptions`\<`T`\>) => `Promise`\<`{ [P in keyof p.PromptGroupAwaitedReturn<T>]: p.PromptGroupAwaitedReturn<T>[P] }`\> |
| `groupMultiselect` | \<`Value`\>(`opts`: `p.GroupMultiSelectOptions`\<`Value`\>) => `Promise`\<`symbol` \| `Value`[]\> |
| `intro` | (`title`?: `string`) => `void` |
| `isCancel` | *typeof* `p.isCancel` |
| `log` | \{ `error`: (`message`: `string`) => `void`; `info`: (`message`: `string`) => `void`; `message`: (`message`?: `string`, `{ symbol }`?: `p.LogMessageOptions`) => `void`; `step`: (`message`: `string`) => `void`; `success`: (`message`: `string`) => `void`; `warn`: (`message`: `string`) => `void`; `warning`: (`message`: `string`) => `void`; \} |
| `log.error` | (`message`: `string`) => `void` |
| `log.info` | (`message`: `string`) => `void` |
| `log.message` | (`message`?: `string`, `{ symbol }`?: `p.LogMessageOptions`) => `void` |
| `log.step` | (`message`: `string`) => `void` |
| `log.success` | (`message`: `string`) => `void` |
| `log.warn` | (`message`: `string`) => `void` |
| `log.warning` | (`message`: `string`) => `void` |
| `multiselect` | \<`Value`\>(`opts`: `p.MultiSelectOptions`\<`Value`\>) => `Promise`\<`symbol` \| `Value`[]\> |
| `note` | (`message`?: `string`, `title`?: `string`) => `void` |
| `number` | *typeof* `number` |
| `outro` | (`message`?: `string`) => `void` |
| `password` | (`opts`: `p.PasswordOptions`) => `Promise`\<`string` \| `symbol`\> |
| `select` | \<`Value`\>(`opts`: `p.SelectOptions`\<`Value`\>) => `Promise`\<`symbol` \| `Value`\> |
| `selectKey` | \<`Value`\>(`opts`: `p.SelectOptions`\<`Value`\>) => `Promise`\<`symbol` \| `Value`\> |
| `spinner` | (`{ indicator }`?: `p.SpinnerOptions`) => \{ `message`: (`msg`?: `string`) => `void`; `start`: (`msg`?: `string`) => `void`; `stop`: (`msg`?: `string`, `code`?: `number`) => `void`; \} |
| `stream` | \{ `error`: (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\>; `info`: (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\>; `message`: (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>, `{ symbol }`?: `p.LogMessageOptions`) => `Promise`\<`void`\>; `step`: (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\>; `success`: (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\>; `warn`: (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\>; `warning`: (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\>; \} |
| `stream.error` | (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\> |
| `stream.info` | (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\> |
| `stream.message` | (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>, `{ symbol }`?: `p.LogMessageOptions`) => `Promise`\<`void`\> |
| `stream.step` | (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\> |
| `stream.success` | (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\> |
| `stream.warn` | (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\> |
| `stream.warning` | (`iterable`: `Iterable`\<`string`\> \| `AsyncIterable`\<`string`\>) => `Promise`\<`void`\> |
| `table` | (`opts`: \{ `opts`: `TableParams`\[`1`\]; `type`: `PromptLineMethod`; `value`: `TableParams`\[`0`\]; \}) => `void` |
| `tasks` | (`tasks`: `p.Task`[]) => `Promise`\<`void`\> |
| `text` | (`opts`: `p.TextOptions`) => `Promise`\<`string` \| `symbol`\> |
| `updateSettings` | *typeof* `p.updateSettings` |

***

### TEXT\_EDITOR

```ts
const TEXT_EDITOR: {
  NONE: 'none';
  SUBLIME: 'subl';
  VSCODE: 'code';
  WEBSTORM: 'webstorm';
};
```

Text editor values used in `openEditor` option.

#### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `NONE` | `"none"` | 'none' |
| `SUBLIME` | `"subl"` | 'subl' |
| `VSCODE` | `"code"` | 'code' |
| `WEBSTORM` | `"webstorm"` | 'webstorm' |
