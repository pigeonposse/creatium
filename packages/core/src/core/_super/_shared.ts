/* eslint-disable @stylistic/object-curly-newline */

import * as utils from '../../_shared/utils'

import type { Prettify } from '../../_shared/ts/super'
import type { Options }  from 'yargs'

export type OptionSuper = {
	/** Key of the option */
	// key  : string
	/** Description of the option */
	desc : string
}

export type OptionCommon = OptionSuper & {
	/**
	 * If is not set. Desc value will be used
	 */
	promptMsg? : string
	/** Alias of the option */
	alias?     : string[]
}

export type OptionCommonWithPlaceholder<V> = Prettify<OptionCommon & {
	/**
	 * Value that will be used as placeholder in prompt.
	 */
	placeholderValue? : V
}>

export type CliOption = Prettify<Options & { desc: string }>
export type CliOptionType = Exclude<NonNullable<CliOption['type']>, 'count'>

/**
 * Core interface
 * @template V
 */
export type CoreInterface<V = string> = {
	/**
	 * Validate value.
	 *
	 * Used to validate initial value in prompt method
	 */
	validateInitialValue : ( data:{
		/** Show success message */
		showSuccess? : boolean
		/** Show error message */
		showError?   : boolean
	} ) => Promise<V | undefined>
	/**
	 * Method to set the cli option
	 * @returns {Promise<CliOption | undefined>}
	 */
	cmd    : () => Promise<CliOption | undefined>
	/**
	 * Method to set the prompt for the option
	 * @returns {Promise<V>}
	 */
	prompt : () => Promise<V>
}

export const coreUtils = utils
export class Core<Config extends OptionSuper = OptionCommon, V = string> {

	// for use outside
	_utils = utils
	/** On cancel callback */
	_onCancel = async () => {}

	/** After the prompt is set */
	afterPrompt : ( <V>( value: V ) => Promise<V> ) | undefined

	/** Enable debug MODE */
	debugMode = false

	/**
	 * Set initial value.
	 * For example if you want to prioritize a cli flag.
	 * @default undefined
	 */
	initialValue : V | undefined

	protected _type: Record<CliOptionType, CliOptionType> = {
		string  : 'string',
		number  : 'number',
		boolean : 'boolean',
		array   : 'array',
	} as const

	constructor( public config: Prettify<Config> ) {

	}

	protected _text = {
		initialValueSuccess : ( t:string, v: string ) => `${t}\n${this._utils.style.color.dim.gray( v )}`,
		initialValueError   : ( v?: string ) => `Initial value ${this._utils.style.color.yellow( v )} is not valid`,
	}

	async getPromptHooked() {

		if ( !( 'prompt' in this && typeof this.prompt === 'function' ) ) return

		try {

			if (
				this.initialValue
				&& 'validateInitialValue' in this
				&& typeof this.validateInitialValue === 'function'
			) {

				const validateValue = await this.validateInitialValue()

				if ( validateValue ) return validateValue

			}

			const res = await this.prompt()

			if ( this.afterPrompt ) await this.afterPrompt( res )
			return res

		}
		catch ( error ) {

			if ( error instanceof Error )
				this._utils.prompt.log.error( 'Unexpected error:' + error?.message )

			return await this.prompt()

		}

	}

}
