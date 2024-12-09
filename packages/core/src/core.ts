/* eslint-disable jsdoc/require-returns-type */

import { deepmergeCustom } from 'deepmerge-ts'

import {
	createCli,
	hideBin,
	currentProcess,
	execChild,
} from './_shared/process/main'
import { replacePlaceholders } from './_shared/string/placeholder'
import {
	copyDir,
	readFile,
	getPaths,
	writeFile,
	existsDir,
	resolvePath,
} from './_shared/sys/main'
import { OPTION }    from './core/const'
import { INSTALLER } from './core/extended/install'
import { Core }      from './core/main'

import type { Response }   from './_shared/ts/return'
import type { Prettify }   from './_shared/ts/super'
import type { TextEditor } from './core/extended/editor'
import type { Installer }  from './core/extended/install'
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
import type { UpdateNotifier } from 'update-notifier'

/**
 * Customizable class of `Creatium` for create project templates (CLI and Library).
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

	#core  : Core
	#data  : HookParams | undefined
	utils
	config : C
	#style
	#cwd = currentProcess.cwd()

	constructor( config: C ) {

		// MUST BE THE FIRST
		this.#core = new Core( config.prompt )

		this.config = config

		this.utils             = this.#core.utils
		this.#core.cache       = this.config.cache === undefined ? true : this.config.cache
		this.#core.projectName = this.config.name
		this.debugMode         = false
		this.#style            = { tick: this.utils.style.color.green.dim( '✓' ) }

	}

	/** Force debug mode */
	public set debugMode( value: boolean ) {

		this.#core.debugMode = value

	}

	async #exec( values?: GetPromptValues<C> ): Promise<GetPromptValues<C>> {

		this.#data = { values }

		console.debug( { initData: this.#data } )

		this.#core.onCancel = async () => await this.cancel()

		if ( this.config.hooks?.beforePrompt )
			await this.config.hooks.beforePrompt( this.#data )

		console.debug( { beforePromptData: this.#data } )

		// INTRO
		await this.intro()

		// PROMPT
		const prompts = await this.#core.getPrompts( this.#data.values )
		const answers = await this.utils.prompt.group( prompts, { onCancel: this.#core.onCancel } ) as unknown as GetPromptValues<C>

		this.#data.values = answers

		console.debug( { promptData: this.#data } )

		if ( this.config.hooks?.afterPrompt )
			await this.config.hooks.afterPrompt( this.#data )

		console.debug( { afterPromptData: this.#data } )

		// CREATION
		// await this.#createTemplate( answers as GetPromptValues<C> )

		return answers

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

		const instance = await createCli<GetArgvValues<C>>( {
			args,
			fn : async cli => {

				cli.scriptName( this.config.name )
					.version( this.config.version )
					.usage( 'Usage: $0 [options]' )
					.locale( 'en' )
					.help( false )
					.showHelpOnFail( false )
					.alias( 'h', 'help' )
					.alias( 'v', 'version' )

				if ( this.config.prompt ) {

					const props = await this.#core.getCmds()
					cli.options( props )

				}

				cli.option( 'debug', {
					desc : 'Set Debug mode',
					type : 'boolean',
				} )

				return cli

			},
		} )

		const argv = await instance.argv

		if ( !argv.debug ) this.debugMode = false
		else this.debugMode = true

		const {
			_,
			$0,
			...values
		} = argv

		return values as unknown as GetArgvValues<C>

	}

	/**
	 * Shows a notification if the current package is outdated.
	 *
	 * **information**: If this 'custom' function is provided, the default
	 * notification will not be shown.
	 *
	 * ---
	 * @param {object} [opts] - Options for the update notification.
	 * @param {object} [opts.opts] - Options for the `update-notifier` package.
	 * @param {Function} [opts.custom] - A custom function to run with the update
	 * @example
	 * // With default options. Recommended for most use cases.
	 * await core.updateNotify()
	 * @example
	 * // With custom options
	 * await core.updateNotify({ opts: { ... } })
	 * @example
	 * // With custom function
	 * await core.updateNotify({ custom: () => {} })
	 */
	async updateNotify( {
		custom, opts,
	}:{
		opts?   : Parameters<UpdateNotifier['notify']>[0]
		custom? : ( info?: UpdateNotifier['update'] ) => Response<void>
	} = {} ) {

		const { default : up } = await import( 'update-notifier' )

		const updater = up( { pkg : {
			name    : this.config.name,
			version : this.config.version,
		} } )

		if ( custom ) await custom( updater.update )
		else updater.notify( opts )

	}

	/**
	 * Cancels the current process and exits with code 0.
	 *
	 * If a `message` is provided, it will be displayed in the console.
	 * If `onCancel` is set in the config, it will be called with the current data.
	 * If `onCancel` is not set, a default message will be displayed.
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
	 * @param {string} [message] The intro message.
	 */
	async intro( message?: string ) {

		if ( message )
			this.utils.prompt.intro( message )
		else if ( typeof this.config.intro === 'function' )
			await this.config.intro( this.#data || {} )
		else if ( this.config.intro === undefined ) {

			console.log()
			this.utils.prompt.intro( this.utils.style.color.cyan.inverse( ` ${this.config.name} ` ) )
			this.utils.prompt.log.step( '' )

		}

	}

	/**
	 * Outro prompt line.
	 *
	 * If the parameter `message` is provided, it will be used as the outro message.
	 * If the `outro` option is a function, it will be called with the `this.#data` as the argument.
	 * If the `outro` option is undefined, the default outro message will be used.
	 * @param {string} [message] The outro message.
	 */
	async outro( message?: string ) {

		this.utils.prompt.log.step( '' )

		if ( message )
			this.utils.prompt.outro( message )
		else if ( typeof this.config.outro === 'function' && this.#data )
			await this.config.outro( this.#data )
		else if ( this.config.outro === undefined ) {

			this.utils.prompt.outro( 'Successfully completed 🌈' )

		}

	}

	/**
	 * Copy a directory from input path to output path.
	 * @param {object} data - Options object with input and output paths.
	 * @param {string} data.input  - The path to the directory to copy.
	 * @param {string} data.output - The path to the destination directory.
	 * @returns {Promise<void>}    - Resolves when the directory has been copied.
	 * @example
	 *
	 * const copyResult = await core.copyDir({
	 *   input : '/path/to/sourceDir',
	 *   output: '/path/to/destinationDir',
	 * })
	 */
	async copyDir( data: {
		input  : string
		output : string
	} ) {

		console.debug( { copyDirData: data } )
		return await copyDir( data )

	}

	/**
	 * Installs the project with the given package manager.
	 * @param {object} [options] - The options to install.
	 * @param {Installer} [options.installer] - The package manager to use for the installation.
	 * @param {string} [options.input] - The path to the folder. If not provided, the current directory is used.
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

		const  command = {
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
	 * @param {object} params - The parameters for opening the editor.
	 * @param {TextEditor} params.editor - The editor to open the project in.
	 * @param {string} params.input - The input path. If not provided, the current directory is used.
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
	 * @param {object} args - The arguments object.
	 * @param {string} [args.input] - The directory path containing files with placeholders.
	 * @param {object} [args.params] - An object containing key-value pairs for replacing placeholders.
	 * @returns {Promise<void>} A Promise that resolves once all placeholders have been replaced.
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

		console.debug( { replacePlaceholdersData : {
			params,
			input,
		} } )

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

		const paths = await getPaths( [ input ], {
			onlyFiles : true,
			dot       : true,
			...inputOpts || {},
		} )

		console.debug( { templatePaths: paths } )

		for ( const path of paths ) {

			const content = await getContent( path )
			if ( !content ) continue

			const res = await replacePlaceholders( {
				content,
				params,
			} )

			await writeFile( path, res, 'utf-8' )

		}

	}

	/**
	 * Return the input path of a template by name or path.
	 * @param {string} [input] The name of the template or the path to the template.
	 * @returns {Promise<string | undefined>} The input path of the template or undefined if not found.
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
	 * @param {CreateTemplateOpts} values - The values to create the template.
	 * @returns {Promise<void>} - A promise that resolves when the template is created.
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
			this.utils.prompt.log.error( `Unexpected error creating template:\n${error}\n\n` )

			await this.#core.onCancel()

		}

	}

	/**
	 * Initialize the CLI and executes the callback function passed in the config.
	 * @param {GetPromptValues<C>} [values] - The values to override the CLI prompts. If not set, the CLI prompts will be executed.
	 * @param {CreateOpts} [opts] - The options to pass to the CLI.
	 * @returns The result of the callback function.
	 */
	async build( values?: Prettify<GetPromptValues<C>>, opts?: CreateOpts ) {

		const cliValues = opts?.activeCli !== false ? await this.#initCli( opts ) : {} as GetPromptValues<C>

		const config = ( values ? deepmergeCustom<GetPromptValues<C>>( {} )( values, cliValues ) : cliValues ) as GetPromptValues<C>

		return await this.#exec( config )

	}

	/**
	 * Initializes and executes the command-line interface (CLI) process.
	 * @param {CliOpts} [props] - Optional CLI options to configure the initialization process.
	 * @returns A promise resolving to the prompt values obtained after executing the CLI.
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
