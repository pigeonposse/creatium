
import { Core } from './_shared'

import type {
	CliOption,
	CoreInterface,
	OptionCommonWithPlaceholder,
} from './_shared'

type Value = string

export type OptionText = OptionCommonWithPlaceholder<Value>

export class Text extends Core<OptionText, Value> implements CoreInterface<Value> {

	async cmd(): Promise<CliOption> {

		return {
			desc  : this.config.desc,
			type  : this._type.string,
			alias : this.config.alias,

		}

	}

	async validateInitialValue( data?: {
		showSuccess? : boolean
		showError?   : boolean
	} ) {

		const message = this.config.promptMsg || this.config.desc

		if ( typeof this.initialValue === 'string' ) {

			if ( data?.showSuccess !== false )
				this._utils.prompt.log.success( this._text.initialValueSuccess( message, this.initialValue ) )
			return this.initialValue

		}
		if ( data?.showError !== false )
			this._utils.prompt.log.warn( this._text.initialValueError( this.initialValue ) )
		return undefined

	}

	async prompt() {

		const value = await this._utils.prompt.text( {
			message     : this.config.promptMsg || this.config.desc,
			// initialValue : this.config.initialValue,
			placeholder : this.config.placeholderValue,
			validate    : v => {

				if ( !v ) return 'Value is required'
				if ( v.trim().length === 0 ) return 'Value is required'

			},
		} )
		if ( this._utils.prompt.isCancel( value ) ) {

			await this._onCancel()
			throw ''

		}
		return value

	}

}
