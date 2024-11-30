
import {
	mergeSelectBaseOptions,
	SELECT_BASE_OPTS,
} from './_shared'
import { existsLocalBin } from '../../_shared/process/main'
import { Select }         from '../_super/select'

import type { SelectBaseOptions } from './_shared'
import type { ObjectValues }      from '../../_shared/ts/super'

export const IDE = {
	...SELECT_BASE_OPTS,
	VSCODE   : 'code',
	SUBLIME  : 'subl',
	WEBSTORM : 'webstorm',
} as const

export type TextEditor = ObjectValues<typeof IDE>

export type OptionEditor = SelectBaseOptions<TextEditor>

export class Editor extends Select<TextEditor> {

	constructor( config: OptionEditor ) {

		const defaultOptions = {
			[IDE.SUBLIME]  : { name: 'Sublime Text' },
			[IDE.VSCODE]   : { name: 'Visual Studio Code' },
			[IDE.WEBSTORM] : { name: 'WebStorm' },
			[IDE.NONE]     : {
				name : 'None',
				desc : 'Do not open the project with any text editor',
			},
		}

		if ( !config.desc ) config.desc = 'Select the code editor to open the project.'
		const finalConfig = mergeSelectBaseOptions( config, defaultOptions ) as Select<TextEditor>['config']

		super( finalConfig )

		this.config = finalConfig

	}

	async validateInitialValue() {

		const validateValue = await super.validateInitialValue()
		if ( !validateValue ) return undefined // Nothing to print in log because it will be printed in super function
		if ( validateValue && ( await existsLocalBin( validateValue ) ) ) {

			this._utils.prompt.log.success( this._text.initialValueSuccess( this.config.promptMsg || this.config.desc, validateValue ) )
			return validateValue

		}
		this._utils.prompt.log.warn( this._text.initialValueError( this.initialValue ) )
		return undefined

	}

	async prompt(): Promise<TextEditor> {

		let value = await super.prompt()

		if ( value === IDE.NONE ) return value

		const exists = await existsLocalBin( value )

		if ( !exists ) {

			// Remove the option
			// @ts-ignore
			this.config.options = Object.fromEntries(
				Object.entries( this.config.options ).filter( ( [ key ] ) => key !== value ),
			)

			this._utils.prompt.log.error( `Binary ${this._utils.style.color.red.inverse( ' ' + value + ' ' )} not found in system` )
			value = await this.prompt()

		}

		return value as TextEditor

	}

}
