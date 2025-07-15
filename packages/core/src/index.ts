import { CreatiumCore } from './core'
import {
	OPTION,
	TEXT_EDITOR,
	INSTALLER,
} from './core/const'

import type {
	CliOpts,
	Config,
	ConfigSimple,
	CreateOpts,
	CreateTemplateOpts,
	ValuesSimple,
} from './types'

export type {
	CliOpts,
	Config,
	CreateOpts,
	CreateTemplateOpts,
}

export {
	OPTION,
	TEXT_EDITOR,
	INSTALLER,
	CreatiumCore,
}

export * from '@creatium-js/utils'
export type * from '@creatium-js/utils'

/**
 * Class of `Creatium` for create project templates (CLI and Library).
 *
 * @example
 * //////////////// core.js ///////////////////
 *
 * import { Creatium } from 'creatium'
 * export const core = new Creatium({
 *   name: 'My Project',
 *   version: '1.0.0',
 *   templates: {
 *     ...
 *   },
 * })
 *
 * //////////////// bin.js ///////////////////
 *
 * import { core } from './core.js'
 * core.cli()
 *
 * //////////////// lib.js ///////////////////
 *
 * import { core } from './core.js'
 * export const create = core.build
 */
export class Creatium {

	#core

	protected options : ConfigSimple
	protected config

	constructor( options: ConfigSimple ) {

		const {
			templates,
			opts,
			consts,
			...restConf
		} = options

		this.options = options

		this.config = {
			...restConf,
			prompt : {
				[OPTION.output] : { type: OPTION.output },
				...( opts?.name !== false ? { [OPTION.name]: { type: OPTION.name } } : {} ),
				input           : {
					type    : OPTION.template,
					options : templates,
				},
				...( opts?.install !== false
					? { [OPTION.install] : {
						type        : OPTION.install,
						onlyOptions : typeof opts?.install !== 'boolean' ? opts?.install : undefined,
					} }
					: {} ),
				...( opts?.openEditor !== false
					? { [OPTION.openEditor] : {
						type        : OPTION.openEditor,
						onlyOptions : typeof opts?.openEditor !== 'boolean' ? opts?.openEditor : undefined,
					} }
					: {} ),
			},
		}

		this.#core = new CreatiumCore( this.config )

	}

	/**
	 * A simplified version of the `build` method from the main class.
	 *
	 * @param   {ValuesSimple}          [values] - The values to override the CLI prompts. If not set, the CLI prompts will be executed.
	 * @param   {CreateOpts}            [opts]   - The options to pass to the CLI.
	 * @returns {Promise<ValuesSimple>}          A promise resolving to the prompt values obtained after executing the CLI.
	 * @example
	 * // simple usage
	 * await core.build()
	 * @example
	 * // custom usage
	 * await core.build( { args : process.argv.slice(4), hideBin : false } )
	 */
	async build( values? : ValuesSimple, opts?: CreateOpts ) {

		const data = await this.#core.build( values as Parameters<CreatiumCore['build']>[0], opts )
		await this.#core.createTemplate( {
			...data,
			consts : this.options.consts,
		} )

		return data

	}

	/**
	 * A simplified version of the `cli` method from the main class.
	 * Initializes and executes the command-line interface (CLI) process.
	 *
	 * @param   {CliOpts}               [props] - Optional CLI options to configure the initialization process.
	 * @returns {Promise<ValuesSimple>}         A promise resolving to the prompt values obtained after executing the CLI.
	 * @example
	 * // simple usage
	 * await core.cli()
	 * @example
	 * // custom usage
	 * await core.cli( { args : process.argv.slice(4), hideBin : false } )
	 */
	async cli( props?: CliOpts ) {

		const data = await this.#core.cli( props )

		await this.#core.createTemplate( {
			...data,
			consts : this.options.consts,
		} )

		return data

	}

}
