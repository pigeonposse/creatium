
import { Text } from '../_super/text'

export type OptionName = Partial< Name['config'] >

export class Name extends Text  {

	constructor( config: OptionName ) {

		const finalConfig = {
			desc : config.desc ?? 'Set the name of the project.',
			...config,
		}

		super( finalConfig )
		this.config = finalConfig

	}

	async validateInitialValue() {

		const validateValue = await super.validateInitialValue()
		if ( !validateValue ) return undefined // Nothing to print in log because it will be printed in super function
		if ( validateValue && ( /\s/.test( validateValue ) ) ) {

			this._utils.prompt.log.success( this._text.initialValueSuccess( this.config.promptMsg || this.config.desc, validateValue ) )
			return validateValue

		}

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
				if ( /\s/.test( v ) ) return 'Spaces are not allowed'

			},
		} )
		if ( this._utils.prompt.isCancel( value ) ) {

			await this._onCancel()
			throw ''

		}
		return value

	}

}
