
import { Core } from './_shared'

import type {
	CliOption,
	CoreInterface,
	OptionCommonWithPlaceholder,
} from './_shared'

type Value = boolean
export type OptionBoolean = OptionCommonWithPlaceholder<Value>

export class Boolean extends Core<OptionBoolean, Value> implements CoreInterface<Value> {

	async cmd(): Promise<CliOption> {

		return {
			desc  : this.config.desc,
			type  : this._type.boolean,
			alias : this.config.alias,
		}

	}

	async validateInitialValue( data?: {
		showSuccess? : boolean
		showError?   : boolean
	} ) {

		const message = this.config.promptMsg || this.config.desc
		if ( typeof this.initialValue === 'boolean' ) {

			if ( data?.showSuccess !== false )
				this._utils.prompt.log.success( this._text.initialValueSuccess( message, this.initialValue.toString() ) )
			return this.initialValue

		}

		if ( data?.showError !== false )
			this._utils.prompt.log.warn( this._text.initialValueError( this.initialValue ) )

		return undefined

	}

	async prompt() {

		const message = this.config.promptMsg || this.config.desc
		const value   = await this._utils.prompt.confirm( {
			message,
			initialValue : this.config.placeholderValue,
		} )

		if ( this._utils.prompt.isCancel( value ) ) {

			await this._onCancel()
			throw ''

		}
		return value

	}

}
