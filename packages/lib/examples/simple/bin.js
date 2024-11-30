import {
	dirname,
	join,
} from 'node:path'
import { fileURLToPath } from 'node:url'

import { Creatium } from '../../dist/main.mjs'

const currentDir   = join( dirname( fileURLToPath( import.meta.url ) ) )
const templatesDir = join( currentDir, 'templates' )

const core = new Creatium( {
	name      : 'Simple test',
	version   : '0.0.1',
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

core.cli()
