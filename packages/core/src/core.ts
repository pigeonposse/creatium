/* eslint-disable jsdoc/require-returns-type */

import { formatter } from '@clippium/preset-colored'
import {
	Clippium,
	hideBin,
} from 'clippium'

import { updater }   from './_shared/up'
import { Options }   from './options'
import { OPTION }    from './options/const'
import { INSTALLER } from './options/extended/install'
import {
	copyDir,
	readFile,
	getPaths,
	writeFile,
	existsDir,
	resolvePath,
	deepmergeCustom,
	currentProcess,
	execChild,
	color,
	truncate,
	replacePlaceholders,
	line,
	prompt,
} from './utils'

import type { TextEditor } from './options/extended/editor'
import type { Installer }  from './options/extended/install'
import type {
	CliOpts,
	Config,
	CreateOpts,
	CreateTemplateOpts,
	HookParams,
} from './types'
import type {
	GetArgvValues,
	GetPromptValues,
} from './types.utils'
import type { Prettify } from './utils'

const utils = {
	color  : color,
	line   : line,
	prompt : prompt,
}
/**
 * Customizable class of `Creatium` for create project templates (CLI and Library).
 *
 * @template C
 * @example
 * //////////////// core.js ///////////////////
 *
 * export const core = new CreatiumCore({
 *   name: 'My Project',
 *   version: '1.0.0',
 *   prompts: {
 *     ...
 *   },
 *   ...
 * })
 *
 * //////////////// bin.js ///////////////////
 *
 * import { core } from './core.js'
 * const res = await core.cli()
 * // do something with res...
 * await core.createTemplate( res )
 *
 * //////////////// lib.js ///////////////////
 *
 * import { core } from './core.js'
 * export const create = async (args) => {
 *   const res = await core.build( args )
 *   // do something with res...
 *   await core.createTemplate( res )
 * }
 */
export class CreatiumCore<C extends Config = Config> {

	#core  : Options
	#data  : HookParams | undefined
	utils
	config : C
	#style
	#cwd = currentProcess.cwd()

	constructor( config: C ) {

		// MUST BE THE FIRST
		this.#core = new Options( config.prompt, utils )

		this.config            = config
		this.utils             = this.#core.utils
		this.#core.cache       = this.config.cache === undefined ? true : this.config.cache
		this.#core.projectName = this.config.name
		this.debugMode         = false
		this.#style            = { tick: this.utils.color.green( this.utils.color.dim( '✓' ) ) }

	}

	#_spinnerFN : typeof this.utils.prompt.spinner | undefined

	/** Force debug mode */
	public set debugMode( value: boolean ) {

		this.#core.debugMode = value
		if ( value === true ) {

			this.#_spinnerFN          = this.utils.prompt.spinner
			this.utils.prompt.spinner = _ => {

				return {
					start   : ( m?: string ) => this.utils.prompt.log.message( m ),
					message : ( m?: string ) => this.utils.prompt.log.message( m ),
					stop    : ( m?: string ) => this.utils.prompt.log.message( m ),
				}

			}

		}
		else {

			if ( this.#_spinnerFN ) this.utils.prompt.spinner = this.#_spinnerFN

		}

	}

	async #exec( values?: GetPromptValues<C> ): Promise<GetPromptValues<C>> {

		try {

			this.#data = { values }

			console.debug( { initData: this.#data } )

			this.#core.onCancel = async () => await this.cancel()

			await this.config.hooks?.beforePrompt?.( this.#data )

			console.debug( { beforePromptData: this.#data } )

			// INTRO
			await this.intro()

			// PROMPT
			const prompts = await this.#core.getPrompts( this.#data.values )

			const answers = await this.utils.prompt.group( prompts, { onCancel: this.#core.onCancel } ) as unknown as GetPromptValues<C>

			this.#data.values = answers

			console.debug( { promptData: this.#data } )

			await this.config.hooks?.afterPrompt?.( this.#data )

			console.debug( { afterPromptData: this.#data } )

			// CREATION
			// await this.#createTemplate( answers as GetPromptValues<C> )

			return answers

		}
		catch ( err ) {

			if ( err instanceof Error ) throw new Error( truncate( err.message, 200, '...' ) )

			throw new Error( 'Unexpected error in execution' )

		}

	}

	#getCliArgs( props?: CliOpts ) {

		return props?.args && props.hideBin
			? hideBin( props.args )
				? props.args
				: props?.args
			: hideBin( currentProcess.argv )

	}

	async #initCli( props?: CliOpts ): Promise<GetArgvValues<C>> {

		if ( this.config.updater ) await this.updateNotify()

		const args = this.#getCliArgs( props )
		const cli  = new Clippium( {
			name    : this.config.name.replaceAll( ' ', '-' ).toLowerCase(),
			version : this.config.version,

			flags : {
				...( this.config.prompt
					? await this.#core.getCmds()
					: {}
				),
				help : {
					type  : 'boolean',
					alias : [ 'h' ],
					group : 'Global flags:',
					desc  : 'Show help',
				},
				version : {
					type  : 'boolean',
					alias : [ 'v' ],
					group : 'Global flags:',
					desc  : 'Show version',
				},
				debug : {
					type  : 'boolean',
					group : 'Global flags:',
					desc  : 'Debug mode',
				},
			},
		}, { help : { formatter : formatter( {
			title         : v => color.cyan( color.inverse( color.bold( v ) ) ),
			bin           : color.cyan,
			version       : v => color.cyan( color.dim( color.italic( v ) ) ),
			name          : color.bold,
			positionals   : v => color.green( color.dim( v ) ),
			commands      : color.green,
			flags         : color.yellow,
			desc          : v => color.white( color.dim( v ) ),
			examples      : color.cyan,
			sectionTitle  : v => color.white( color.bold( color.underline( v ) ) ), //color.white.bold.underline,
			sectionDesc   : v => color.white( color.dim( v ) ),
			sectionsProps : v => color.white( color.dim( color.italic( v ) ) ),
		} ) } } )

		const { flags } = await cli.parse( args )
		if ( flags.help ) {

			console.log( cli.getHelp( args ) )
			currentProcess.exit( 0 )

		}
		else if ( flags.version ) {

			console.log( cli.getVersion( ) )
			currentProcess.exit( 0 )

		}
		if ( !flags.debug ) this.debugMode = false
		else this.debugMode = true

		return flags as unknown as GetArgvValues<C>

	}

	/**
	 * Shows a notification if the current package is outdated.
	 *
	 * **information**: If this 'custom' function is provided, the default
	 * notification will not be shown.
	 *
	 * @returns {Promise<boolean>} - A promise that resolves when the notification has finished.
	 */
	async updateNotify( ) {

		return await updater( this.config.name, this.config.version )

	}

	/**
	 * Cancels the current process and exits with code 0.
	 *
	 * If a `message` is provided, it will be displayed in the console.
	 * If `onCancel` is set in the config, it will be called with the current data.
	 * If `onCancel` is not set, a default message will be displayed.
	 *
	 * @param {string} [message] - The message to display before exiting.
	 */
	async cancel( message?: string ) {

		if ( message ) {

			this.utils.prompt.log.step( '' )
			this.utils.prompt.cancel( message )
			currentProcess.exit( 0 )

		}
		else if ( this.config.onCancel && this.#data )
			await this.config.onCancel( this.#data )
		else if ( this.config.onCancel === undefined ) {

			this.utils.prompt.log.step( '' )
			this.utils.prompt.cancel( 'Canceled 💔' )
			currentProcess.exit( 0 )

		}

	}

	/**
	 * Intro prompt line.
	 *
	 * If the parameter `message` is provided, it will be used as the intro message.
	 * If the `intro` option is a function, it will be called with the `this.#data` as the argument.
	 * If the `intro` option is undefined, the default intro message will be used.
	 *
	 * @param {string} [message] - The intro message.
	 */
	async intro( message?: string ) {

		if ( message )
			this.utils.prompt.intro( message )
		else if ( typeof this.config.intro === 'function' )
			await this.config.intro( this.#data || {} )
		else if ( this.config.intro === undefined ) {

			console.log()
			const badge = ( txt: string ) => this.utils.color.blue( this.utils.color.inverse( ' ' + this.utils.color.bold( txt ) + ' ' ) )

			this.utils.prompt.intro( badge( this.config.name ) )
			this.utils.prompt.log.step( '' )

		}

	}

	/**
	 * Outro prompt line.
	 *
	 * If the parameter `message` is provided, it will be used as the outro message.
	 * If the `outro` option is a function, it will be called with the `this.#data` as the argument.
	 * If the `outro` option is undefined, the default outro message will be used.
	 *
	 * @param {string} [message] - The outro message.
	 */
	async outro( message?: string ) {

		this.utils.prompt.log.step( '' )

		if ( message )
			this.utils.prompt.outro( message )
		else if ( typeof this.config.outro === 'function' && this.#data )
			await this.config.outro( this.#data )
		else if ( this.config.outro === undefined ) {

			this.utils.prompt.outro( this.utils.color.greenBright( 'Successfully completed 🌈' ) )

		}

	}

	/**
	 * Copy a directory from input path to output path.
	 *
	 * @param   {object}        data - Options object with input and output paths.
	 * @returns {Promise<void>}      - Resolves when the directory has been copied.
	 * @example
	 *
	 * const copyResult = await core.copyDir({
	 *   input : '/path/to/sourceDir',
	 *   output: '/path/to/destinationDir',
	 * })
	 * const copyResult = await copyDir({
	 * input : [
	 *   {
	 *     name: 'file1.txt',
	 *     content: 'Hello, world!',
	 *   },
	 *   {
	 *     name: 'file2.txt',
	 *     content: 'Goodbye, world!',
	 *   },
	 * ],
	 * output: '/path/to/destinationDir',
	 * })
	 */
	async copyDir( data: Parameters<typeof copyDir>[0] ) {

		console.debug( { copyDirData: data } )
		return await copyDir( data )

	}

	/**
	 * Installs the project with the given package manager.
	 *
	 * @param   {object}        [options]           - The options to install.
	 * @param   {Installer}     [options.installer] - The package manager to use for the installation.
	 * @param   {string}        [options.input]     - The path to the folder. If not provided, the current directory is used.
	 * @returns {Promise<void>}
	 * @example
	 * await core.install( {
	 *   installer : 'pnpm',
	 *   input     : 'my/project/path',
	 * } )
	 */
	async install( {
		installer, input,
	}:{
		installer? : Installer
		input?     : string
	} = {} ) {

		console.debug( { installData : {
			installer,
			input : input || this.#cwd,
		} } )

		if ( !installer || installer === 'none' ) return

		const s = this.utils.prompt.spinner()

		const command = {
			[INSTALLER.PNPM] : `pnpm install${input ? ` --dir ${input}` : ''}`,
			[INSTALLER.NPM]  : `npm install${input ? ` --prefix ${input}` : ''}`,
			[INSTALLER.YARN] : `yarn install${input ? ` --cwd ${input}` : ''}`,
			[INSTALLER.DENO] : `deno install${input ? ` --root ${input}` : ''}`,
			[INSTALLER.BUN]  : `bun install${input ? ` --cwd ${input}` : ''}`,
		}

		try {

			s.start( `Installing with ${installer}` )
			await execChild( command[installer] )
			s.stop( `${this.#style.tick} Package installed with [${installer}] successfully` )

		}
		catch ( _e ) {

			if ( this.debugMode )
				s.stop( `Error in installation with [${installer}]: ${_e?.toString()}` )
			else
				s.stop( `Error in installation with [${installer}]` )

		}

	}

	/**
	 * Open the project in the given editor.
	 *
	 * @param   {object}        params        - The parameters for opening the editor.
	 * @param   {TextEditor}    params.editor - The editor to open the project in.
	 * @param   {string}        params.input  - The input path. If not provided, the current directory is used.
	 * @returns {Promise<void>}
	 * @example
	 * await core.openEditor( {
	 *   editor : 'vscode',
	 *   input  : 'my/project/path',
	 *  })
	 */
	async openEditor( {
		editor, input,
	}:{
		editor? : TextEditor
		input?  : string
	} = {} ) {

		if ( !input ) input = this.#cwd

		console.debug( { openEditorData : {
			editor,
			input,
		} } )

		if ( !editor || editor === 'none' ) return

		const s = this.utils.prompt.spinner()

		try {

			s.start( `Opening in ${editor}` )
			await execChild( `${editor} ${input}` )
			s.stop( `${this.#style.tick} Text editor [${editor}] opened successfully` )

		}
		catch ( _e ) {

			if ( this.debugMode )
				s.stop( `Error opening [${editor}] text editor: ${_e?.toString()}` )
			else
				s.stop( `Error opening [${editor}] text editor` )

		}

	}

	/**
	 * Replaces placeholders in files within the specified directory.
	 *
	 * This function searches for files in the provided input directory and replaces
	 * placeholders within those files using the specified parameters. The placeholders
	 * in the content are replaced with values from the `params` object.
	 *
	 * @param   {object}        args          - The arguments object.
	 * @param   {string}        [args.input]  - The directory path containing files with placeholders.
	 * @param   {object}        [args.params] - An object containing key-value pairs for replacing placeholders.
	 * @returns {Promise<void>}               A Promise that resolves once all placeholders have been replaced.
	 * @example
	 * await core.replacePlaceholders( {
	 *   input  : 'my/project/path',
	 *   params : { consts: { version: '1.0.0' }, prompt: { name: 'My Project' } },
	 * })
	 */
	async replacePlaceholders( {
		input, params, inputOpts,
	}:{
		input?     : string
		params?    : Parameters<typeof replacePlaceholders>[0]['params']
		inputOpts? : Parameters<typeof getPaths>[1]
	} = {} ) {

		if ( !input ) input = this.#cwd
		if ( this.debugMode ) console.dir( { replacePlaceholdersData : {
			params,
			input,
		} }, { depth: null } )

		if ( !params ) return

		// if ( !input ) throw new Error( 'Missing property "input" for replace placeholders' )
		// if ( !params ) throw new Error( 'Missing property "params" for replace placeholders' )

		const getContent = async ( filePath: string ) => {

			try {

				const content = await readFile( filePath, 'utf-8' )
				return typeof content === 'string' && content.trim().length > 0 ? content : undefined

			}
			catch ( _e ) {

				return undefined

			}

		}

		const paths = ( await getPaths( '**', {
			filesOnly : true,
			cwd       : input,
			absolute  : true,
			dot       : true,
			...inputOpts || {},
		} ) )

		console.debug( {
			templatePaths : paths,
			input,
		} )

		await Promise.all( paths.map( async path => {

			const content = await getContent( path )
			if ( !content ) return

			const res = await replacePlaceholders( {
				content,
				params,
			} )

			await writeFile( path, res, 'utf-8' )

		} ) )

	}

	/**
	 * Return the input path of a template by name or path.
	 *
	 * @param   {string}                      [input] - The name of the template or the path to the template.
	 * @returns {Promise<string | undefined>}         The input path of the template or undefined if not found.
	 * @example
	 * // with template path
	 * const input = await core.getTemplateInput( { input : 'my/template/path' } )
	 * @example
	 * // With template key
	 * // template key must be specified in the config prompt secction.
	 * const input = await core.getTemplateInput( { input : 'templateKey' )
	 */
	async getTemplateInput( { input }:{ input?: string } = {} ) {

		const templates = Object.entries( this.config.prompt ).reduce( ( acc, [ _key, value ] ) => {

			if ( value.type === OPTION.template && value.options )
				Object.assign( acc, value.options )

			return acc

		}, {} as Record<string, {
			input : string
			name  : string
		}> )

		console.debug( { getTemplateInputData : {
			input,
			templates,
		} } )

		if ( input && templates[input].input ) return templates[input].input
		if ( input && await existsDir( input ) ) return input

		this.utils.prompt.log.error( `Error creating Template: template input "${input}" not found` )

		return

	}

	/**
	 * Create a new project template.
	 *
	 * @param   {CreateTemplateOpts} values - The values to create the template.
	 * @returns {Promise<void>}             - A promise that resolves when the template is created.
	 * @example
	 * // basic usage
	 * await core.createTemplate( { input : 'my/template/path', output : 'my/project/path' } )
	 * @example
	 * // custom usage
	 * await core.createTemplate( {
	 *   input : 'my/template/path',
	 *   output : 'my/project/path',
	 *   install : 'pnpm',
	 *   open : 'vscode',
	 *   consts : {
	 *     version : '1.0.0',
	 *     header : '// Template generated by Creatium. a project from PigeonPosse',
	 *   },
	 * } )
	 */
	async createTemplate( values: CreateTemplateOpts ) {

		try {

			const {
				openEditor, input, output, install, consts, ...prompt
			} = values

			const data = {
				input  : await this.getTemplateInput( { input } ),
				output : output ? resolvePath( output ) : undefined,
			}

			console.debug( { createTemplate : {
				values,
				data,
			} } )

			this.utils.prompt.log.step( '' )

			if ( !( data.input && data.output ) )
				throw new Error( 'Invalid input or output template' )

			await this.copyDir( {
				input  : data.input,
				output : data.output,
			} )
			await this.replacePlaceholders( {
				input  : data.output,
				params : {
					name    : this.config.name,
					version : this.config.version,
					consts,
					prompt,
				},
			} )

			await this.install( {
				input     : data.output,
				installer : install,
			} )
			await this.openEditor( {
				input  : data.output,
				editor : openEditor,
			} )

			// OUTRO
			await this.outro()

		}
		catch ( e ) {

			const error = e instanceof Error ? e.message : e?.toString()
			this.utils.prompt.log.error( `Unexpected error creating template:\n${truncate( error || '', 100, '...' )}\n\n` )

			await this.#core.onCancel()

		}

	}

	/**
	 * Initialize the CLI and executes the callback function passed in the config.
	 *
	 * @param   {GetPromptValues<C>} [values] - The values to override the CLI prompts. If not set, the CLI prompts will be executed.
	 * @param   {CreateOpts}         [opts]   - The options to pass to the CLI.
	 * @returns                               The result of the callback function.
	 */
	async build( values?: Prettify<GetPromptValues<C>>, opts?: CreateOpts ) {

		const cliValues = opts?.activeCli !== false ? await this.#initCli( opts ) : {} as GetPromptValues<C>

		const config = ( values ? deepmergeCustom<GetPromptValues<C>>( {} )( values, cliValues ) : cliValues ) as GetPromptValues<C>

		return await this.#exec( config )

	}

	/**
	 * Initializes and executes the command-line interface (CLI) process.
	 *
	 * @param   {CliOpts} [props] - Optional CLI options to configure the initialization process.
	 * @returns                   A promise resolving to the prompt values obtained after executing the CLI.
	 * @example
	 * // simple usage
	 * await core.cli()
	 * @example
	 * // custom usage
	 * await core.cli( { args : process.argv.slice( 4), hideBin : false } )
	 */
	async cli( props?: CliOpts ) {

		const values = await this.#initCli( props )

		return await this.#exec( values as GetPromptValues<C> )

	}

}
