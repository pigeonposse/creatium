# creatium

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
        | "bun"
        | "deno"
        | "npm"
        | "pnpm"
        | "yarn", 
        | "bun"
        | "deno"
        | "npm"
        | "pnpm"
        | "yarn", ...("bun" | "deno" | "npm" | "pnpm" | "yarn")[]];
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
| `options.intro`? | `false` \| (`data`: `HookParams`) => `Response`\<`void`\> | Set custom intro |
| `options.name` | `string` | Set name of you project |
| `options.onCancel`? | `false` \| (`data`: `HookParams`) => `Response`\<`void`\> | Set custom function foor when user cancels the process |
| `options.opts`? | `object` | Set your prompt options |
| `options.opts.install`? | `false` \| [ \| `"bun"` \| `"deno"` \| `"npm"` \| `"pnpm"` \| `"yarn"`, \| `"bun"` \| `"deno"` \| `"npm"` \| `"pnpm"` \| `"yarn"`, ...("bun" \| "deno" \| "npm" \| "pnpm" \| "yarn")\[\]] | Active/deactivate the install prompt Also, You can set the installators that you want to use. |
| `options.opts.name`? | `boolean` | Active/deactivate the name prompt |
| `options.opts.openEditor`? | `false` \| [`"code"` \| `"subl"` \| `"webstorm"`, `"code"` \| `"subl"` \| `"webstorm"`, ...("code" \| "subl" \| "webstorm")\[\]] | Active/deactivate the openEditor prompt. Also, You can set the editors that you want to use. |
| `options.outro`? | `false` \| (`data`: `HookParams`) => `Response`\<`void`\> | Set custom outro |
| `options.templates` | `object` | Set your template ooptions |
| `options.updater`? | `boolean` | Use updater **Default** `false` |
| `options.version` | `string` | Set version of you current project Used in for the updater notifications. |

###### Returns

[`Creatium`](api.md#creatium)

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
| `opts`? | [`CreateOpts`](api.md#createopts) | The options to pass to the CLI. |

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
| `props`? | [`CliOpts`](api.md#cliopts) | Optional CLI options to configure the initialization process. |

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
| `C` *extends* [`Config`](api.md#config) | [`Config`](api.md#config) |  |

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

[`CreatiumCore`](api.md#creatiumcorec)\<`C`\>

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
| `opts`? | [`CreateOpts`](api.md#createopts) | The options to pass to the CLI. |

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
| `props`? | [`CliOpts`](api.md#cliopts) | Optional CLI options to configure the initialization process. |

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
| `values` | [`CreateTemplateOpts`](api.md#createtemplateopts) | The values to create the template. |

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
updateNotify(opts?: {
  custom: (info?: UpdateInfo) => Response<void>;
  opts: NotifyOptions;
}): Promise<void>
```

Shows a notification if the current package is outdated.

**information**: If this 'custom' function is provided, the default
notification will not be shown.

---

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opts`? | `object` | Options for the update notification. |
| `opts.custom`? | (`info`?: `UpdateInfo`) => `Response`\<`void`\> | A custom function to run with the update |
| `opts.opts`? | `NotifyOptions` | Options for the `update-notifier` package. |

###### Returns

`Promise`\<`void`\>

###### Examples

```ts
// With default options. Recommended for most use cases.
await core.updateNotify()
```

```ts
// With custom options
await core.updateNotify({ opts: { ... } })
```

```ts
// With custom function
await core.updateNotify({ custom: () => {} })
```

#### Properties

| Property | Type |
| ------ | ------ |
| `config` | `C` |
| `utils` | `__module` |

## Type Aliases

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
| `hooks`? | \{ `afterPrompt`: \<`D`\>(`data`: `D`) => `Response`\<`D` \| `undefined`\>; `beforePrompt`: \<`D`\>(`data`: `D`) => `Response`\<`D` \| `undefined`\>; \} | hooks for |
| `hooks.afterPrompt`? | \<`D`\>(`data`: `D`) => `Response`\<`D` \| `undefined`\> | - |
| `hooks.beforePrompt`? | \<`D`\>(`data`: `D`) => `Response`\<`D` \| `undefined`\> | - |
| `intro`? | (`data`: `HookParams`) => `Response`\<`void`\> \| `false` | Set custom intro |
| `name` | `string` | Set name of you project |
| `onCancel`? | (`data`: `HookParams`) => `Response`\<`void`\> \| `false` | Set custom function foor when user cancels the process |
| `outro`? | (`data`: `HookParams`) => `Response`\<`void`\> \| `false` | Set custom outro |
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

## Variables

### env

```ts
const env: {
  isBrowser: boolean;
  isBun: boolean;
  isDeno: boolean;
  isJsDom: boolean;
  isNode: boolean;
  isWebWorker: boolean;
 } = _env;
```

Environment functions

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
     opts: Options;
     type: PromptLineMethod;
     value: string;
    }) => void;
  columns: (opts: {
     opts: GlobalOptions;
     type: PromptLineMethod;
     value: ColumnData;
    }) => void;
  number: (opts: {
     errorText: string;
    }) => Promise<number | symbol>;
  table: (opts: {
     opts: TableUserConfig;
     type: PromptLineMethod;
     value: TableData;
    }) => void;
 } = _prompt;
```

Prompt functions

#### Type declaration

| Name | Type |
| ------ | ------ |
| `box` | (`opts`: \{ `opts`: `Options`; `type`: `PromptLineMethod`; `value`: `string`; \}) => `void` |
| `columns` | (`opts`: \{ `opts`: `GlobalOptions`; `type`: `PromptLineMethod`; `value`: `ColumnData`; \}) => `void` |
| `number` | (`opts`: \{ `errorText`: `string`; \}) => `Promise`\<`number` \| `symbol`\> |
| `table` | (`opts`: \{ `opts`: `TableUserConfig`; `type`: `PromptLineMethod`; `value`: `TableData`; \}) => `void` |

***

### style

```ts
const style: {
  box: (text: string, options?: Options) => string;
  color: ChalkInstance;
  columns: <Data>(data: Data, options?: GlobalOptions) => string;
  gradient: (txt: string, colors: GradientColors, opts?: GradientOpts) => string;
  line: (__namedParameters: {
     align: 'center';
     lineChar: '⎯';
     title: string;
    }) => string;
  table: (data: TableData, options?: TableUserConfig) => string;
 } = _style;
```

Style functions

#### Type declaration

| Name | Type |
| ------ | ------ |
| `box` | (`text`: `string`, `options`?: `Options`) => `string` |
| `color` | `ChalkInstance` |
| `columns` | \<`Data`\>(`data`: `Data`, `options`?: `GlobalOptions`) => `string` |
| `gradient` | (`txt`: `string`, `colors`: `GradientColors`, `opts`?: `GradientOpts`) => `string` |
| `line` | (`__namedParameters`: \{ `align`: `'center'`; `lineChar`: `'⎯'`; `title`: `string`; \}) => `string` |
| `table` | (`data`: `TableData`, `options`?: `TableUserConfig`) => `string` |

***

### sys

```ts
const sys: __module = _sys;
```

System functions

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
