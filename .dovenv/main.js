import { defineConfig } from '@dovenv/core'
import {
	asciiFont,
	getCurrentDir,
	getObjectFromJSONFile,
	joinPath,
} from '@dovenv/core/utils'
import { config as bandaTheme } from '@dovenv/theme-banda'

import readmes from './readmes.js'

const workspaceDir = joinPath( getCurrentDir( import.meta.url ), '..' )
const pkgPath      = joinPath( workspaceDir, 'package.json' )
const pkg          = await getObjectFromJSONFile( pkgPath )
const name         = pkg.extra.productName
export default defineConfig(
	{
		name  : name,
		desc  : 'Workspaces for ' + name,
		const : {
			workspaceDir,
			pkg,
			mark : `\n${asciiFont( `pigeonposse\n-------\n${pkg.extra.id}`, 'ANSI Shadow' )}\nAuthor: ${pkg.author.name}\n`,
		},
	},
	readmes,
	bandaTheme( {
		convert : { readme : {
			type   : 'ts2md',
			input  : 'packages/core/src/main.ts',
			output : 'README.md',
		} },
		repo : { commit : { scopes : [
			{
				value : 'packages',
				desc  : 'All or some packages',
			},
			{
				value : 'core',
				desc  : 'Core package',
			},
			{
				value : 'create',
				desc  : 'Create package',
			},
			{
				value : 'env',
				desc  : 'Only dev environment',
			},
			{
				value : 'all',
				desc  : 'env, packages etc',
			},
		] } },
		lint : {
			staged : { '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,json,yml,yaml}': 'pnpm --silent . lint eslint --silent' },
			eslint : { flags: [ '--fix' ] },
		},
		workspace : { check : { pkg : { schema : async ( {
			v, path, content,
		} ) => {

			if ( !content ) throw new Error( `No data in ${path}` )
			if ( 'private' in content ) return
			return v.object( {
				name        : v.string(),
				version     : v.string(),
				description : v.string(),
				files       : v.array( v.string() ),
			} )

		} } } },
	} ),
)
