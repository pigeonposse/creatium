import {
	dirname,
	join,
} from 'node:path'
import { fileURLToPath } from 'node:url'

import { name }     from '../../package.json'
import { Creatium } from '../../src' // change for `import { Creatium } from 'creatium'`

const currentDir   = join( dirname( fileURLToPath( import.meta.url ) ) )
const templatesDir = join( currentDir, 'templates' )

export const creatium = new Creatium( {
	name,
	version   : '0.2.2', // minor version for display updater notification
	updater   : true,
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

