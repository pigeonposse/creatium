/* eslint-disable @stylistic/object-curly-newline */

import { Core } from './_shared'

import type {
	CliOption,
	CoreInterface,
	OptionCommonWithPlaceholder,
} from './_shared'

type Value = string
export type OptionMultiselect<V extends Value = Value> = OptionCommonWithPlaceholder<V[]> & {
	/** Set the options of multiselect */
	options : {
		[key in V] : {
			/** Visible name of the option */
			name  : string
			/** Description of the option. Used in cli prompt */
			desc? : string
		}
	}
}

export class Multiselect<V extends Value = Value> extends Core<OptionMultiselect<V>, V[]> implements CoreInterface<V[]> {

	async cmd(): Promise<CliOption> {

		return {
			desc    : this.config.desc,
			type    : this._type.array,
			alias   : this.config.alias,
			choices : Object.keys( this.config.options ),
		}

	}

	async validateInitialValue( data?: {
		showSuccess? : boolean
		showError?   : boolean
	} ) {

		const message = this.config.promptMsg || this.config.desc

		if ( this.initialValue
			&& Array.isArray( this.initialValue )
			&& Object.keys( this.config.options ).every( v => this.initialValue?.includes( v as V ) )
		) {

			if ( data?.showSuccess !== false )
				this._utils.prompt.log.success( this._text.initialValueSuccess( message, this.initialValue.join( ', ' ) ) )
			return this.initialValue

		}
		if ( data?.showError !== false )
			this._utils.prompt.log.warn( this._text.initialValueError( this.initialValue?.join( ', ' ) ) )
		return undefined

	}

	// @ts-ignore
	async prompt() {

		const message = this.config.promptMsg || this.config.desc
		const value   = await this._utils.prompt.multiselect( {
			message,
			initialValues : this.config.placeholderValue,
			options       : Object.entries<OptionMultiselect['options'][number]>( this.config.options ).map( ( [ key, value ] ) => ( {
				value : key,
				label : value?.name || key,
				hint  : value?.desc,
			} ) ),

		} )

		if ( this._utils.prompt.isCancel( value ) ) {

			await this._onCancel()
			throw ''

		}
		return value

	}

}
