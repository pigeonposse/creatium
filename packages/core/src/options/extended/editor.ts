
import {
	mergeSelectBaseOptions,
	SELECT_BASE_OPTS,
} from './_shared'
import { existsLocalBin } from '../../utils'
import { OptionsUtils }   from '../_super/_shared'
import { Select }         from '../_super/select'

import type { SelectBaseOptions } from './_shared'
import type { ObjectValues }      from '../../utils'

/** Text editor values used in `openEditor` option. */
export const TEXT_EDITOR = {
	...SELECT_BASE_OPTS,
	VSCODE   : 'code',
	SUBLIME  : 'subl',
	WEBSTORM : 'webstorm',
} as const

export type TextEditor = ObjectValues<typeof TEXT_EDITOR>

export type OptionEditor = SelectBaseOptions<TextEditor>

export class Editor extends Select<TextEditor> {

	constructor( config: OptionEditor, public _utils: OptionsUtils ) {

		const defaultOptions = {
			[TEXT_EDITOR.SUBLIME]  : { name: 'Sublime Text' },
			[TEXT_EDITOR.VSCODE]   : { name: 'Visual Studio Code' },
			[TEXT_EDITOR.WEBSTORM] : { name: 'WebStorm' },
			[TEXT_EDITOR.NONE]     : {
				name : 'None',
				desc : 'Do not open the project with any text editor',
			},
		}

		if ( !config.desc ) config.desc = 'Select the text editor to open the project'
		const finalConfig = mergeSelectBaseOptions( config, defaultOptions ) as Select<TextEditor>['config']

		super( finalConfig, _utils )

		this.config = finalConfig

	}

	async validateInitialValue( data?: {
		showSuccess? : boolean
		showError?   : boolean
	} ) {

		const validateValue = await super.validateInitialValue( { showSuccess: false } )
		if ( !validateValue ) return undefined // Nothing to print in log because it will be printed in super function
		if ( validateValue && ( await existsLocalBin( validateValue ) ) ) {

			if ( data?.showSuccess !== false )
				this._utils.prompt.log.success( this._text.initialValueSuccess( this.config.promptMsg || this.config.desc, validateValue ) )
			return validateValue

		}

		if ( data?.showError !== false )
			this._utils.prompt.log.warn( this._text.initialValueError( this.initialValue ) )
		return undefined

	}

	async prompt(): Promise<TextEditor> {

		let value = await super.prompt()

		if ( value === TEXT_EDITOR.NONE ) return value

		const exists = await existsLocalBin( value )

		if ( !exists ) {

			// Remove the option
			// @ts-ignore
			this.config.options = Object.fromEntries(
				Object.entries( this.config.options ).filter( ( [ key ] ) => key !== value ),
			)

			const badge = ( txt: string ) => this._utils.color.red( this._utils.color.inverse( ' ' + txt + ' ' ) )

			this._utils.prompt.log.error( `Binary ${badge( value )} not found in system` )
			value = await this.prompt()

		}

		return value as TextEditor

	}

}
