import {
	CreatiumCore,
	prompt,
	sys,
	style,
	Config,
} from 'creatium'
import process from 'node:process'

import {
	extra,
	homepage,
} from '../../../package.json'
import {
	version,
	description,
} from '../package.json'

const {
	copyDir,
	joinPath: join,
} = sys
const {
	color,
	table,
} = style

const name = extra.libraryId

const TEMPLATES = {
	JS : 'js',
	TS : 'ts',
} as const

const cancelFn = ( ) => {

	prompt.cancel( color.red( 'Operation canceled 💔' ) )
	process.exit( 0 )

}

const setCoreProps = ( templatesDir: string ) => ( {
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

				const tableData = [ [ 'Version', version ], [ 'Documentation', homepage ] ]
					.map( v => [ color.dim( color.bold( v[0] ) ), color.dim( color.italic( v[1] ) ) ] )
				const tableOpts = { chars : {
					'top'          : '',
					'top-mid'      : '',
					'top-left'     : '',
					'top-right'    : '',
					'bottom'       : '',
					'bottom-mid'   : '',
					'bottom-left'  : '',
					'bottom-right' : '',
					'left'         : '',
					'left-mid'     : '',
					'mid'          : '',
					'mid-mid'      : '',
					'right'        : '',
					'right-mid'    : '',
					'middle'       : '',
				} }
				const value     =  `${table( [ [ color.dim( description ) ], [ '' ] ], tableOpts )}\n${table( tableData, tableOpts )}\n`
				prompt.box( {
					value : value,
					opts  : {
						padding     : 0,
						borderStyle : 'none',
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
} ) as const satisfies Config

type CoreConfig = ReturnType<typeof setCoreProps>

export type CreateTemplateParams = Awaited<ReturnType<CreatiumCore<CoreConfig>['cli']>>
export type CoreRes = {
	/**
	 * Initializes and executes the command-line interface (CLI) process.
	 */
	cli            : CreatiumCore<CoreConfig>['cli']
	/**
	 * Function for create a new project template.
	 *
	 * @param   {CreateTemplateParams} params - The values to create the template.
	 * @returns {Promise<void>}               - A promise that resolves when the template is created.
	 */
	createTemplate : ( params: CreateTemplateParams ) => Promise<void>
	/**
	 * Initialize the CLI and executes the callback function passed in the config.
	 */
	build          : CreatiumCore<CoreConfig>['build']
}

/**
 * Instance of your create-project
 *
 * @returns {Promise<object>} - A promise that resolves to an instance of your create-project
 */
export const core = async (): Promise<CoreRes> => {

	const pkgDir       = await sys.getClosestPackageDir( sys.getCurrentDir( import.meta.url ) )
	const dataDir      = join( pkgDir, 'data' )
	const partialsDir  = join( dataDir, 'partials' )
	const templatesDir = join( dataDir, 'templates' )

	const core = new CreatiumCore( setCoreProps( templatesDir ) )

	return {
		cli            : ( ...args ) => core.cli( ...args ),
		build          : ( ...args ) => core.build( ...args ),
		createTemplate : async params => {

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

				if ( !output ) throw new Error( 'Output is required' )
				if ( !input ) throw new Error( 'Input is required' )
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

		},
	}

}
