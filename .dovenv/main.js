import { defineConfig }         from '@dovenv/core'
import { config as bandaTheme } from '@dovenv/theme-banda'
import {
	asciiFont,
	getCurrentDir,
	getObjectFromJSONFile,
	joinPath,
} from '@dovenv/utils'

import readmes from './readmes.js'

const workspaceDir = joinPath( getCurrentDir( import.meta.url ), '..' )
const pkgPath      = joinPath( workspaceDir, 'package.json' )
const pkg          = await getObjectFromJSONFile( pkgPath )

export default defineConfig(
	{
		name  : 'creatium',
		desc  : 'Workspaces for creatium',
		const : {
			workspaceDir,
			pkg,
			mark : `\n${asciiFont( `pigeonposse\n-------\n${pkg.extra.id}`, 'ANSI Shadow' )}\nAuthor: ${pkg.author.name}\n`,
		},
	},
	readmes,
	bandaTheme( {
		media   : { termgif: { demo: {} } },
		convert : { readme : {
			type   : 'ts2md',
			input  : 'packages/core/src/main.ts',
			output : 'README.md',
		} },
		repo : { commit : { scopes : [
			{ value: 'packages' },
			{ value: 'core' },
			{ value: 'create' },
			{ value: 'env' },
			{ value: 'all' },
		] } },
		workspace : { check : { pkg : { schema : async ( {
			v, path, data,
		} ) => {

			if ( !data ) throw new Error( `No data in ${path}` )
			if ( 'private' in data ) return
			return v.object( {
				name        : v.string(),
				version     : v.string(),
				description : v.string(),
			} )

		} } } },
	} ),
)
