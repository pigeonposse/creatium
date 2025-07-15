import type { ContentInput } from 'creatium/utils'

export default {
  "templates": {
    "js": [
      {
        "path": "src/bin.js",
        "content": "#!/usr/bin/env node\n\nimport { creatium } from './main'\n\nawait creatium.cli()\n"
      },
      {
        "path": "src/lib.js",
        "content": "import { creatium } from './main'\n\n/**\n * Asynchronously creates a new instance using the provided parameters.\n * @param {Parameters<typeof creatium.build>[0]} params - The parameters required for creation.\n * @returns {Promise<Object>} A promise that resolves to the result of the creation process.\n */\nexport const create = async ( params ) => {\n\n\treturn await creatium.build( params )\n\n}\n\n"
      },
      {
        "path": "src/main.js",
        "content": "import {\n\tdirname,\n\tjoin,\n} from 'node:path'\nimport { fileURLToPath } from 'node:url'\n\nimport { version, name }  from '../package.json'\nimport { Creatium } from 'creatium'\n\nconst currentDir   = join( dirname( fileURLToPath( import.meta.url ) ), '..' )\nconst templatesDir = join( currentDir, 'templates' )\n\nexport const creatium = new Creatium( {\n\tname,\n\tversion,\n\tupdater: true,\n\tcache: true,\n\ttemplates : {\n\t\tjs : {\n\t\t\tinput : join( templatesDir, 'js' ),\n\t\t\tname  : 'JavaScript project',\n\t\t},\n\t\tts : {\n\t\t\tinput : join( templatesDir, 'ts' ),\n\t\t\tname  : 'TypeScript project',\n\t\t},\n\t},\n} )\n\n"
      }
    ],
    "ts": [
      {
        "path": "src/bin.ts",
        "content": "#!/usr/bin/env node\n\nimport { creatium } from './main'\n\nawait creatium.cli()\n"
      },
      {
        "path": "src/lib.ts",
        "content": "import { creatium } from './main'\n\ntype CreateParams = Parameters<typeof creatium.build>[0]\n\nexport const create = async ( params: CreateParams ) => {\n\n\treturn await creatium.build( params )\n\n}\n\n"
      },
      {
        "path": "src/main.ts",
        "content": "import {\n\tdirname,\n\tjoin,\n} from 'node:path'\nimport { fileURLToPath } from 'node:url'\n\nimport { version, name }  from '../package.json'\nimport { Creatium } from 'creatium'\n\nconst currentDir   = join( dirname( fileURLToPath( import.meta.url ) ), '..' )\nconst templatesDir = join( currentDir, 'templates' )\n\nexport const creatium = new Creatium( {\n\tname,\n\tversion,\n\tupdater: true,\n\tcache: true,\n\ttemplates : {\n\t\tjs : {\n\t\t\tinput : join( templatesDir, 'js' ),\n\t\t\tname  : 'JavaScript project',\n\t\t},\n\t\tts : {\n\t\t\tinput : join( templatesDir, 'ts' ),\n\t\t\tname  : 'TypeScript project',\n\t\t},\n\t},\n} )\n\n"
      }
    ]
  },
  "partials": {
    "templates": [
      {
        "path": "js/main.js",
        "content": "/**\n * The main function to execute the primary logic of {{prompt.name}}.\n */\nexport const main = async () => {\n\t// ...\n}\n"
      },
      {
        "path": "js/package.json",
        "content": "{\n\t\"name\": \"{{prompt.name}}\",\n\t\"version\": \"0.0.1\"\n}\n"
      },
      {
        "path": "ts/package.json",
        "content": "{\n\t\"name\": \"{{prompt.name}}\",\n\t\"version\": \"0.0.1\"\n}\n"
      },
      {
        "path": "ts/src/main.ts",
        "content": "/**\n * The main function to execute the primary logic of {{prompt.name}}.\n */\nexport const main = async () => {\n\t// ...\n}\n"
      }
    ],
    "workspace": [
      {
        "path": ".gitignore",
        "content": "# #############################################################################\n# .gitignore config.\n# #############################################################################\n#\n# @description Specifies which files and directories should be ignored by Git, \n#              ensuring a clean version control history.\n# @see https://git-scm.com/docs/gitignore\n#\n# #############################################################################\n\n# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\n.pnpm-store\nnode_modules\n/build\n**/dist\ndist\ndist-ssr\n**/vendor\n/vendor\npackages/**/build\n*.local\n\n# misc\n.DS_Store\n\n# Editor directories and files\n# .vscode/*\n# !.vscode/extensions.json\n.idea\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n\n# Tuborepo\n/.turbo\n**/.turbo\n\n# Parcel\n/.parcel-cache\n**/.parcel-cache\n\n# Svelte\n/.svelte-kit\n**/.svelte-kit\n\n# playwright \n/test-results\n**/test-results\n\n# project \n**/__temp__\n/__cache__\n**/__cache__\n**/*.timestamp-*\n**/__temp__/*\n**/__cache__/*\ndocs/dev-dist/**\n"
      },
      {
        "path": "LICENSE",
        "content": "MIT License\n\nCopyright 2010 James Halliday (mail@substack.net); Modified work Copyright 2014 Contributors (ben@npmjs.com)\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in\nall copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\nTHE SOFTWARE.\n"
      },
      {
        "path": "README.md",
        "content": "# {{prompt.name}} \n\n## 🔑 Installation\n\n```bash\nnpm install {{prompt.name}} \n# or \npnpm add {{prompt.name}} \n# or \nyarn add {{prompt.name}} \n# or \nbun add {{prompt.name}} \n# or \ndeno install {{prompt.name}} \n```\n\n## 🔑 Usage\n\n## As a CLI\n\n```bash\n{{prompt.name}} <options>\n```\n\n### Simple way\n\nRun with anything and a user prompt will appear.\n\n```bash\n{{prompt.name}} \n```\n\n### Show help\n\n```bash\n{{prompt.name}} --help\n```\n\n### With flags\n\n```bash\n{{prompt.name}} --input ts --output ./build --name 'my-library'\n```\n\n### As a JavaScript module\n\n```js\nimport { create } from '{{prompt.name}}'\n\nawait create( {\n\tinput: '...',\n\toutput: '...',\n\t...\n} )\n```\n\n## Development\n\n1. Download repository.\n2. Run the following command in the root of the repository: `pnpm install`\n3. Develop the project.\n\n## Testing\n\nRun the following command in the root of the repository: `pnpm test`\n\n## License\n\nThis project is under the [GPL v3](./LICENSE).\n"
      },
      {
        "path": "build.config.js",
        "content": "import { defineBuildConfig } from 'unbuild'\n\nexport default defineBuildConfig( [\n\t{\n\t\tsourcemap   : false,\n\t\tdeclaration : true,\n\t\trollup      : { esbuild : {\n\t\t\ttarget : 'node20',\n\t\t} },\n\t\tfailOnWarn : true,\n\t\tentries : [ './src/lib', './src/bin' ],\n\t},\n] )\n"
      },
      {
        "path": "package.json",
        "content": "{{consts.pkg}}\n"
      }
    ]
  }
} satisfies Record<string, Record<string, ContentInput[]>>