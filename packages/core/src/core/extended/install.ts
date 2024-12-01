import {
	mergeSelectBaseOptions,
	SELECT_BASE_OPTS,
} from './_shared'
import { existsLocalBin } from '../../_shared/process/main'
import { Select }         from '../_super/select'

import type { SelectBaseOptions } from './_shared'
import type { ObjectValues }      from '../../_shared/ts/super'

/** installer values used in `install` option. */
export const INSTALLER = {
	DENO : 'deno',
	BUN  : 'bun',
	NPM  : 'npm',
	PNPM : 'pnpm',
	YARN : 'yarn',
	...SELECT_BASE_OPTS,
} as const

export type Installer = ObjectValues<typeof INSTALLER>

export type OptionInstall = SelectBaseOptions<Installer>

export class Install extends Select<Installer> {

	constructor( config: OptionInstall ) {

		const defaultOptions = {
			[INSTALLER.NPM]  : { name: 'npm' },
			[INSTALLER.PNPM] : { name: 'pnpm' },
			[INSTALLER.YARN] : { name: 'yarn' },
			[INSTALLER.DENO] : { name: 'deno' },
			[INSTALLER.NONE] : {
				name : 'None',
				desc : 'Do not install project dependencies',
			},
		}

		if ( !config.desc ) config.desc = 'Select the package manager to install the dependencies.'

		const finalConfig = mergeSelectBaseOptions( config, defaultOptions ) as Select<Installer>['config']

		super( finalConfig )

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

	async prompt(): Promise<Installer> {

		let value = await super.prompt()

		if ( value === INSTALLER.NONE ) return value

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

		return value as Installer

	}

}
