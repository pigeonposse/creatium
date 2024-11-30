import {
	dirname,
	join,
} from 'node:path'
import { fileURLToPath } from 'node:url'

import { version, name }  from '../package.json'
import { Creatium } from 'creatium'

const currentDir   = join( dirname( fileURLToPath( import.meta.url ) ), '..' )
const templatesDir = join( currentDir, 'templates' )

export const creatium = new Creatium( {
	name,
	version,
	updater: true,
	cache: true,
	templates : {
		js : {
			input : join( templatesDir, 'js' ),
			name  : 'JavaScript project',
		},
		ts : {
			input : join( templatesDir, 'ts' ),
			name  : 'TypeScript project',
		},
	},
} )

