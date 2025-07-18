import {
	dirname,
	join,
} from 'node:path'
import { fileURLToPath } from 'node:url'

import { version }  from '../../package.json'
import { Creatium } from '../../src' // change for `import { Creatium } from 'creatium'`

const currentDir   = join( dirname( fileURLToPath( import.meta.url ) ) )
const templatesDir = join( currentDir, 'templates' )
const name         = 'Simple Custom test'

export const creatium = new Creatium( {
	name,
	version,
	updater   : true,
	cache     : true,
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
	opts : {
		// use only this options for install
		install : [
			'pnpm',
			'npm',
			'deno',
		],
		// Delecte onpenEditor option
		openEditor : false,
		// Delecte name option. The name will be taken from output basename.
		name       : false,
	},
	// Add custom constants for replace in templates
	consts : { header: `Template generated by ${name}. A project from PigeonPosse` },
} )

