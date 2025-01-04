import {
	CreatiumCore,
	prompt,
	sys,
	style,
} from 'creatium'
import {
	dirname,
	join,
} from 'node:path'
import process           from 'node:process'
import { fileURLToPath } from 'node:url'

import {
	extra,
	homepage,
} from '../../../package.json'
import {
	version,
	description,
} from '../package.json'

const { copyDir }  = sys
const {
	color, table,
} = style
const name         = extra.libraryId
const currentDir   = join( dirname( fileURLToPath( import.meta.url ) ) )
const dataDir      = join( currentDir, '..', 'data' )
const templatesDir = join( dataDir, 'templates' )
const partialsDir  = join( dataDir, 'partials' )
const TEMPLATES    = {
	JS : 'js',
	TS : 'ts',
} as const

const cancelFn = ( ) => {

	prompt.cancel( color.red( 'Operation canceled 💔' ) )
	process.exit( 0 )

}
export type CreateTemplateParams = Awaited<ReturnType<typeof core.cli>>
/** Instance of your create-project */
export const core = new CreatiumCore( {
	name,
	version,
	updater  : true,
	cache    : true,
	onCancel : cancelFn,
	prompt   : {
		// Add a box information first of all
		intro : {
			// The option void will not appear in cli options
			type : 'void',
			desc : 'Documentation of project',
			fn   : ( ) => {

				const tableData = [ [ 'Package version', version ], [ 'Documentation', homepage ] ]
				const tableOpts = {
					drawHorizontalLine : () => false,
					drawVerticalLine   : () => false,

				}
				const value     = color.dim( `${table( [ [ description ] ], tableOpts )}\n${table( tableData, tableOpts )}` )
				prompt.box( {
					value : value,
					opts  : {
						padding     : 0,
						borderStyle : 'none',
						dimBorder   : true,
					},
				} )

			},
		},
		output : {
			type  : 'output',
			alias : [ 'o' ],
		},
		name : {
			type  : 'name',
			alias : [ 'n' ],
		},
		input : {
			type    : 'template',
			options : {
				[TEMPLATES.JS] : {
					input : join( templatesDir, 'js' ),
					name  : 'JavaScript project',
				},
				[TEMPLATES.TS] : {
					input : join( templatesDir, 'ts' ),
					name  : 'TypeScript project',
				},
			},
		},
		install    : { type: 'install' },
		openEditor : { type: 'openEditor' },
	},
} )

/**
 * Function for create a new project template.
 * @param {CreateTemplateParams} params - The values to create the template.
 * @returns {Promise<void>} - A promise that resolves when the template is created.
 */
export const createTemplate = async ( params: CreateTemplateParams ) => {

	try {

		const {
			output,
			input,
			install,
			openEditor,
			name: projectName,
			// extract constants for used in createTemplate
			...consts
		} = params

		if ( !output )  throw new Error( 'Output is required' )
		if ( !input )   throw new Error( 'Input is required' )
		if ( !projectName ) throw new Error( 'Project name is required' )

		// Add the partial files

		await copyDir( {
			input : join( partialsDir, 'workspace' ),
			output,
		} )

		await copyDir( {
			input  : join( partialsDir, 'templates' ),
			output : join( output, 'templates' ),
		} )

		// Define the package.json
		const pkg = {
			name    : projectName,
			version : '0.0.1',
			license : 'GPL-3.0',
			type    : 'module',
			main    : 'dist/lib.mjs',
			module  : 'dist/lib.mjs',
			types   : 'dist/lib.d.ts',
			files   : [ 'dist', 'templates' ],
			bin     : { [projectName]: 'dist/bin.mjs' },
			...( input === TEMPLATES.TS
				? {
					scripts : {
						build : 'unbuild',
						dev   : 'tsx src/bin.ts',
						test  : 'vitest run -r src --passWithNoTests',
					},
					devDependencies : {
						'@types/node' : '22.10.1',
						'tslib'       : '2.8.1',
						'tsx'         : '4.19.2',
						'typescript'  : '5.7.2',
						'unbuild'     : '2.0.0',
						'vitest'      : '2.1.6',
					},
				}
				: {
					scripts : {
						build : 'unbuild',
						dev   : 'node src/bin.js',
						test  : 'vitest run -r src --passWithNoTests',
					},
					devDependencies : {
						'@types/node' : '22.10.1',
						'unbuild'     : '2.0.0',
						'vitest'      : '2.1.6',
					},
				}
			),
			dependencies  : { creatium: version },
			publishConfig : {
				access   : 'public',
				registry : 'https://registry.npmjs.org/',
			},
		}

		// Create the template
		await core.createTemplate( {
			output,
			input,
			install,
			openEditor,
			name,
			consts : {
				...consts,
				pkg : JSON.stringify( pkg, null, 2 ),
			},
		} )

	}
	catch ( error ) {

		prompt.log.step( '' )

		if ( error instanceof Error )
			prompt.log.error( color.red( error.message ) )
		else
			console.error( 'Unexpected error:', error )

		prompt.log.step( '' )
		cancelFn()

	}

}
