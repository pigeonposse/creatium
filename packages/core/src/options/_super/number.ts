
import { Core } from './_shared'

import type {
	CliOption,
	CoreInterface,
	OptionCommonWithPlaceholder,
} from './_shared'

type Value = number
export type OptionNumber = OptionCommonWithPlaceholder<Value>

export class Number extends Core<OptionNumber, Value> implements CoreInterface<Value> {

	async cmd(): Promise<CliOption> {

		return {
			desc  : this.config.desc,
			type  : this._type.number,
			alias : this.config.alias,
		}

	}

	async validateInitialValue( data?: {
		showSuccess? : boolean
		showError?   : boolean
	} ) {

		const message = this.config.promptMsg || this.config.desc
		const value   = this.initialValue as Value | string | undefined

		if ( typeof value === 'number' ) {

			if ( data?.showSuccess !== false )
				this._utils.prompt.log.success( this._text.initialValueSuccess( message, value.toString() ) )
			return value

		}
		else if ( typeof value === 'string' ) {

			if ( data?.showSuccess !== false )
				this._utils.prompt.log.success( this._text.initialValueSuccess( message, value ) )
			return globalThis.Number( value )

		}

		if ( data?.showError !== false )
			this._utils.prompt.log.warn( this._text.initialValueError( value ) )
		return undefined

	}

	async prompt() {

		const message = this.config.promptMsg || this.config.desc
		const value   = await this._utils.prompt.number( {
			message,
			initialValue : this.config.placeholderValue?.toString(),
			placeholder  : this.config.placeholderValue?.toString(),
			// validate    : v => {

			// 	if ( !v ) return 'Value is required'
			// 	if ( v.trim().length === 0 ) return 'Value is required'

			// },
		} )

		if ( this._utils.prompt.isCancel( value ) ) {

			await this._onCancel()
			throw ''

		}
		return value

	}

}
