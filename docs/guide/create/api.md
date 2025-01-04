# `create-creatium` - API documentation

## Functions

### create()

```ts
function create(params: {
  input: string;
  install: Installer;
  intro: void;
  name: string;
  openEditor: TextEditor;
  output: string;
 }): Promise<{
  input: string;
  install: Installer;
  intro: void;
  name: string;
  openEditor: TextEditor;
  output: string;
}>
```

Creates a new project using the specified parameters.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `object` | The parameters required for building the project. |
| `params.input`? | `string` | - |
| `params.install`? | `Installer` | - |
| `params.intro`? | `void` | - |
| `params.name`? | `string` | - |
| `params.openEditor`? | `TextEditor` | - |
| `params.output`? | `string` | - |

#### Returns

`Promise`\<\{
  `input`: `string`;
  `install`: `Installer`;
  `intro`: `void`;
  `name`: `string`;
  `openEditor`: `TextEditor`;
  `output`: `string`;
 \}\>

A promise that resolves to the result of the build process.

| Name | Type |
| ------ | ------ |
| `input`? | `string` |
| `install`? | `Installer` |
| `intro`? | `void` |
| `name`? | `string` |
| `openEditor`? | `TextEditor` |
| `output`? | `string` |
