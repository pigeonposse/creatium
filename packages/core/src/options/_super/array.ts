/* eslint-disable @stylistic/object-curly-newline */

import { Core } from './_shared'

import type {
	CliOption,
	CoreInterface,
	OptionCommonWithPlaceholder,
} from './_shared'

type Value = string[]
export type OptionArray = OptionCommonWithPlaceholder<Value> & {
	/**
	 * Separator for value strings.
	 *
	 * @default ','
	 */
	separator? : string
}

export class Array extends Core<OptionArray, Value> implements CoreInterface<Value> {

	#defaultSeparator = ','

	async cmd(): Promise<CliOption> {

		return {
			desc  : this.config.desc,
			type  : this._type.array,
			alias : this.config.alias,
		}

	}

	async validateInitialValue( data?: {
		showSuccess? : boolean
		showError?   : boolean
	} ) {

		const separator = this.config.separator || this.#defaultSeparator
		const message   = this.config.promptMsg || this.config.desc
		const value     = this.initialValue as Value | undefined | string

		if ( value && globalThis.Array.isArray( value ) ) {

			if ( data?.showSuccess !== false )
				this._utils.prompt.log.success( this._text.initialValueSuccess( message, value.join( separator ) ) )

			return value

		}
		else if ( value && typeof value === 'string' ) {

			if ( data?.showSuccess !== false )
				this._utils.prompt.log.success( this._text.initialValueSuccess( message, value ) )

			return ( value as string ).split( separator ).map( v => v.trim() )

		}

		if ( data?.showError !== false )
			this._utils.prompt.log.warn( this._text.initialValueError( value ) )
		return undefined

	}

	async prompt() {

		const message   = this.config.promptMsg || this.config.desc
		const separator = this.config.separator || this.#defaultSeparator

		const value = await this._utils.prompt.text( {
			message,
			initialValue : this.config.placeholderValue?.join( separator ),
			validate     : v => {

				if ( !v ) return 'Value is required'
				if ( v.trim().length === 0 ) return 'Value is required'

			},
		} )

		if ( this._utils.prompt.isCancel( value ) ) {

			await this._onCancel()
			throw ''

		}

		const res = value.includes( separator )
			? value.split( separator ).map( v => v.trim() )
			: [ value ]

		return res

	}

}
