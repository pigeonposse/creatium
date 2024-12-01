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

/**
 * Customizable class of `Creatium` for create project templates (CLI and Library).
 * @template C
 * @example
 * //////////////// core.js ///////////////////
 *
 * export const core = new CreatiumPrompt({
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
export class CreatiumPrompt<C extends Config = Config> {

	#core  : Core
	#data  : HookParams | undefined
	utils
	config : C
	#style

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

		console.debug( { data: this.#data } )

		this.#core.onCancel = async () => await this.cancel()

		if ( this.config.hooks?.beforePrompt )
			await this.config.hooks.beforePrompt( this.#data )

		console.debug( { beforePrompt: this.#data } )

		// INTRO
		await this.intro()

		// PROMPT
		const prompts = await this.#core.getPrompts()
		const answers = await this.utils.prompt.group( prompts, { onCancel: this.#core.onCancel } ) as unknown as GetPromptValues<C>

		this.#data.values = answers

		console.debug( { answers } )

		if ( this.config.hooks?.afterPrompt )
			await this.config.hooks.afterPrompt( this.#data )

		console.debug( { afterPrompt: this.#data } )

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

	async #createTemplate( values: CreateTemplateOpts ) {

		const {
			openEditor, input, output, install, consts, ...prompt
		} = values

		const data = {
			input  : await this.getTemplateInput( input ),
			output : output ? resolvePath( output ) : undefined,
		}

		console.debug( { templateData: data } )

		this.utils.prompt.log.step( '' )

		if ( !( data.input && data.output ) )
			throw new Error( 'Invalid input or output template' )

		await this.copyDir( data.input, data.output )
		await this.replacePlaceholders( data.output, {
			name    : this.config.name,
			version : this.config.version,
			consts,
			prompt,
		} )
		await this.install( install, data.output )
		await this.openEditor( openEditor, data.output )

		this.utils.prompt.log.step( '' )

		// OUTRO
		await this.outro()

	}

	async updateNotify() {

		const { default : up } = await import( 'update-notifier' )

		const updater = up( { pkg : {
			name    : this.config.name,
			version : this.config.version,
		} } )
		updater.notify()

	}

	async cancel() {

		if ( this.config.onCancel && this.#data )
			await this.config.onCancel( this.#data )
		else if ( this.config.onCancel === undefined ) {

			this.utils.prompt.log.step( '' )
			this.utils.prompt.cancel( 'Canceled 💔' )
			currentProcess.exit( 0 )

		}

	}

	async intro() {

		if ( typeof this.config.intro === 'function' )
			await this.config.intro( this.#data || {} )
		else if ( this.config.intro === undefined ) {

			console.log()
			this.utils.prompt.intro( this.utils.style.color.cyan.inverse( ` ${this.config.name} ` ) )
			this.utils.prompt.log.step( '' )

		}

	}

	async outro() {

		if ( typeof this.config.outro === 'function' && this.#data )
			await this.config.outro( this.#data )
		else if ( this.config.outro === undefined )
			this.utils.prompt.outro( 'Succesfully finished 🌈' )

	}

	async copyDir( input: string, output: string ) {

		return await copyDir( {
			input,
			output,
		} )

	}

	async install( installer?: Installer, output?: string ) {

		if ( !installer || installer === 'none' ) return

		const s = this.utils.prompt.spinner()

		const  command = {
			[INSTALLER.PNPM] : !output ? 'pnpm i' : `pnpm i --dir ${output}`,
			[INSTALLER.NPM]  : !output ? 'npm install' : `npm install --prefix ${output}`,
			[INSTALLER.YARN] : !output ? 'yarn install' : `yarn install --cwd ${output}`,
			[INSTALLER.DENO] : !output ? 'deno install' : `deno install --root ${output}`,
			[INSTALLER.BUN]  : !output ? 'bun install' : `bun install --cwd ${output}`,
		}
		try {

			s.start( `Installing with ${installer}` )
			await execChild( command[installer] )
			s.stop( this.#style.tick + ' Package installed successfully' )

		}
		catch ( _e ) {

			if ( this.debugMode )
				s.stop( `Error in installation with [${installer}]: ${_e?.toString()}` )
			else
				s.stop( `Error in installation with [${installer}]` )

		}

	}

	async openEditor( editor?: TextEditor, output?: string ) {

		if ( !editor || editor === 'none' ) return

		const s = this.utils.prompt.spinner()

		try {

			s.start( `Opening in ${editor}` )
			await execChild( `${editor} ${output}` )
			s.stop( this.#style.tick + ' IDE opened successfully' )

		}
		catch ( _e ) {

			if ( this.debugMode )
				s.stop( `Error opening in [${editor}]: ${_e?.toString()}` )
			else
				s.stop( 'Error opening IDE' )

		}

	}

	async replacePlaceholders( input: string, params: Parameters<typeof replacePlaceholders>[0]['params'] ) {

		if ( !input || !params ) throw new Error( 'Missing parameters "output" and "params" for replace placeholders' )

		const getContent = async ( filePath: string ) => {

			try {

				const content = await readFile( filePath, 'utf-8' )
				return typeof content === 'string' && content.trim().length > 0 ? content : undefined

			}
			catch ( _e ) {

				return undefined

			}

		}

		const paths = await getPaths( [ input ], { onlyFiles: true } )

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

	async getTemplateInput( input?: string ) {

		const templates = Object.entries( this.config.prompt ).reduce( ( acc, [ _key, value ] ) => {

			if ( value.type === OPTION.template && value.options )
				Object.assign( acc, value.options )

			return acc

		}, {} as Record<string, {
			input : string
			name  : string
		}> )
		console.debug( { templates } )

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

			await this.#createTemplate( values )

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
