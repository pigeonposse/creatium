# `@creatium-js/utils` - API documentation

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
  defaultValues: values;
  get: <ID>(v?: ID) => Promise<ID extends keyof Values ? Values[ID<ID>] : ID extends string ? undefined : Values>;
  path: path;
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
  `defaultValues`: `values`;
  `get`: \<`ID`\>(`v`?: `ID`) => `Promise`\<`ID` *extends* keyof `Values` ? `Values`\[`ID`\<`ID`\>\] : `ID` *extends* `string` ? `undefined` : `Values`\>;
  `path`: `path`;
  `reset`: () => `Promise`\<`void`\>;
  `set`: (`obj`: `Partial`\<`Values`\>) => `Promise`\<`void`\>;
 \}\>

- An object with methods to interact with the cache.

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `defaultValues` | `Values` | values | The default values for the cache. |
| `get` | \<`ID`\>(`v`?: `ID`) => `Promise`\<`ID` *extends* keyof `Values` ? `Values`\[`ID`\<`ID`\>\] : `ID` *extends* `string` ? `undefined` : `Values`\> | - | Retrieve a value from the cache. **Example** `const theme = get('theme'); console.log(theme); // Output: 'light'` |
| `path` | `string` | path | The path to the cache file. |
| `reset` | () => `Promise`\<`void`\> | - | Resets the cache to its default values. **Example** `reset();` |
| `set` | (`obj`: `Partial`\<`Values`\>) => `Promise`\<`void`\> | - | Updates the cache with the provided values. Merges the existing cached values with the new partial values and updates the cache. |

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
| ...`paths` | `string`[] | A sequence of paths or path segments. |

#### Returns

`string`

- The resolved absolute path.

#### Param

Path segments to resolve.

#### Throws

if any of the arguments is not a string.

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

Return the last portion of a path. Similar to the Unix basename command.
Often used to extract the file name from a fully qualified path.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | the path to evaluate. |
| `suffix`? | `string` | optionally, an extension to remove from the result. |

#### Returns

`string`

#### Throws

if `path` is not a string or if `ext` is given and is not a string.

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

Return the directory name of a path. Similar to the Unix dirname command.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | the path to evaluate. |

#### Returns

`string`

#### Throws

if `path` is not a string.

***

### getExtName()

```ts
function getExtName(path: string): string
```

Return the extension of the path, from the last '.' to end of string in the last portion of the path.
If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | the path to evaluate. |

#### Returns

`string`

#### Throws

if `path` is not a string.

***

### getFilteredFileNames()

```ts
function getFilteredFileNames(props: {
  extensions: [];
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
function getPlatform(): Promise<"linux" | "windows" | "macos" | "unknown">
```

Determines the operating system.

#### Returns

`Promise`\<`"linux"` \| `"windows"` \| `"macos"` \| `"unknown"`\>

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
  suffix: 'nodejs';
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

Determines whether \{path\} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.

If the given \{path\} is a zero-length string, `false` will be returned.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | path to test. |

#### Returns

`boolean`

#### Throws

if `path` is not a string.

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
  align: 'center';
  lineChar: '⎯';
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

Normalize a string path, reducing '..' and '.' parts.
When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `string` | string path to normalize. |

#### Returns

`string`

#### Throws

if `path` is not a string.

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
function readFile(path: PathLike | FileHandle, options: BufferEncoding | {} & Abortable): Promise<string>
```

Asynchronously reads the entire contents of a file.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `PathLike` \| `FileHandle` | A path to a file. If a URL is provided, it must use the `file:` protocol. If a `FileHandle` is provided, the underlying file will _not_ be closed automatically. |
| `options` | `BufferEncoding` \| \{\} & `Abortable` | An object that may contain an optional flag. If a flag is not provided, it defaults to `'r'`. |

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

Solve the relative path from \{from\} to \{to\} based on the current working directory.
At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `from` | `string` |
| `to` | `string` |

#### Returns

`string`

#### Throws

if either `from` or `to` is not a string.

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

The right-most parameter is considered \{to\}. Other parameters are considered an array of \{from\}.

Starting from leftmost \{from\} parameter, resolves \{to\} to an absolute path.

If \{to\} isn't already absolute, \{from\} arguments are prepended in right to left order,
until an absolute path is found. If after using all \{from\} paths still no absolute path is found,
the current working directory is used as well. The resulting path is normalized,
and trailing slashes are removed unless the path gets resolved to the root directory.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`paths` | `string`[] | A sequence of paths or path segments. |

#### Returns

`string`

#### Throws

if any of the arguments is not a string.

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
  | Stream
  | ArrayBufferView<ArrayBufferLike>
  | Iterable<string | ArrayBufferView<ArrayBufferLike>, any, any>
  | AsyncIterable<string | ArrayBufferView<ArrayBufferLike>, any, any>, 
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
| `data` | \| `string` \| `Stream` \| `ArrayBufferView`\<`ArrayBufferLike`\> \| `Iterable`\<string \| ArrayBufferView\<ArrayBufferLike\>, `any`, `any`\> \| `AsyncIterable`\<string \| ArrayBufferView\<ArrayBufferLike\>, `any`, `any`\> | - |
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

### CommonObj

```ts
type CommonObj: Record<string, unknown> | Record<string, unknown>[] | unknown[];
```

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
  | "underline", (v: string) => string> = _colorObj;
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
     opts: TableConstructorOptions;
     type: PromptLineMethod;
     value: TableData;
    }) => void;
};
```

#### Type declaration

| Name | Type |
| ------ | ------ |
| `box` | (`opts`: \{ `opts`: `Options`; `type`: `PromptLineMethod`; `value`: `string`; \}) => `void` |
| `columns` | (`opts`: \{ `opts`: `GlobalOptions`; `type`: `PromptLineMethod`; `value`: `ColumnData`; \}) => `void` |
| `number` | (`opts`: \{ `errorText`: `string`; \}) => `Promise`\<`number` \| `symbol`\> |
| `table` | (`opts`: \{ `opts`: `TableConstructorOptions`; `type`: `PromptLineMethod`; `value`: `TableData`; \}) => `void` |
