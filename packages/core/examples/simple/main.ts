import {
	dirname,
	join,
} from 'node:path'
import { fileURLToPath } from 'node:url'

import { version }  from '../../package.json'
import { Creatium } from '../../src/main' // change for `import { Creatium } from 'creatium'`

const currentDir   = join( dirname( fileURLToPath( import.meta.url ) ) )
const templatesDir = join( currentDir, 'templates' )
const name         = 'Simple test'

export const creatium = new Creatium( {
	name,
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

