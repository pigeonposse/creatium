/* eslint-disable @stylistic/object-curly-newline */

import { Core } from './_shared'

import type {
	CliOption,
	CoreInterface,
	OptionCommonWithPlaceholder,
} from './_shared'

type Value = string | number

export type OptionSelect<V extends Value = Value> = OptionCommonWithPlaceholder<V> & {
	/** Set the options of select */
	options : {
		[key in V] : {
			/** Visible name of the option */
			name  : string
			/** Description of the option. Used in cli prompt */
			desc? : string
		}
	}
}

export class Select<V extends Value = Value> extends Core<OptionSelect<V>, V> implements CoreInterface<Value> {

	async cmd(): Promise<CliOption> {

		return {
			desc    : this.config.desc,
			type    : this._type.string,
			alias   : this.config.alias,
			choices : Object.keys( this.config.options ),
		}

	}

	async validateInitialValue() {

		const message = this.config.promptMsg || this.config.desc

		if ( typeof this.initialValue === 'number' || typeof this.initialValue === 'string' ) {

			this._utils.prompt.log.success( this._text.initialValueSuccess( message, this.initialValue.toString() ) )
			return this.initialValue

		}

		this._utils.prompt.log.warn( this._text.initialValueError( this.initialValue ) )
		return undefined

	}

	async prompt() {

		const value = await this._utils.prompt.select( {
			message : this.config.promptMsg || this.config.desc,
			options : Object.entries<OptionSelect['options'][number]>( this.config.options ).map( ( [ key, value ] ) => ( {
				value : key,
				label : value?.name || key,
				hint  : value?.desc,
			} ) ),
			initialValue : this.config.placeholderValue?.toString(),
		} )

		if ( this._utils.prompt.isCancel( value ) ) {

			await this._onCancel()
			throw ''

		}

		return value

	}

}
