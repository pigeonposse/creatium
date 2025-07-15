import {
	existsDir,
	existsFile,
} from '../../utils'
import { Text } from '../_super/text'

export const PATH_TYPE = {
	folder : 'folder',
	file   : 'file',
}
export type PathType = typeof PATH_TYPE[ keyof typeof PATH_TYPE ]
export type OptionPath = Partial<Path['config']> & {
	/**
	 * Set path type
	 *
	 * @default 'file'
	 */
	pathType? : PathType
	/**
	 * Set if you want to check if path exists or not.
	 *
	 * @default false
	 */
	exists?   : boolean
}

export class Path extends Text {

	#existsPath : boolean
	#pathType   : PathType

	constructor( config: OptionPath ) {

		if ( !config.pathType ) config.pathType = PATH_TYPE.file
		if ( !config.exists ) config.exists = false

		const finalConfig = {
			desc : config.desc ?? `Set input ${config.exists ? 'existing' : 'new'} ${config.pathType}`,
			...config,
		}

		super( finalConfig )
		this.config = finalConfig

		this.#existsPath = config.exists as boolean
		this.#pathType   = config.pathType as PathType

	}

	async #validatePath( path: string ) {

		const mustExists = this.#existsPath as boolean
		const type       = this.#pathType as PathType
		const existsPath = type === PATH_TYPE.file ? await existsFile( path ) : await existsDir( path )
		const validation = mustExists === existsPath

		console.debug( { pathValueData : {
			validatePath : path,
			existsPath,
			mustExists,
			type,
			validation,
		} } )

		if ( validation ) return path
		this._utils.prompt.log.error( `${type === PATH_TYPE.file ? 'File' : 'Folder'} [${path}] ${mustExists ? 'not exists. Set path that exists' : 'already exists. Set path that not exists'}` )
		return undefined

	}

	async validateInitialValue( data?: {
		showSuccess? : boolean
		showError?   : boolean
	} ) {

		const validateValue = await super.validateInitialValue( { showSuccess: false } )
		if ( !validateValue ) return undefined // Nothing to print in log because it will be printed in super function

		if ( validateValue && ( await this.#validatePath( validateValue ) ) ) {

			if ( data?.showSuccess !== false )
				this._utils.prompt.log.success( this._text.initialValueSuccess( this.config.promptMsg || this.config.desc, validateValue ) )
			return validateValue

		}
		if ( data?.showError !== false )
			this._utils.prompt.log.warn( this._text.initialValueError( this.initialValue ) )
		return undefined

	}

	async prompt() {

		let value = await this._utils.prompt.text( {
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

		const exists = await this.#validatePath( value )
		if ( !exists ) value = await this.prompt() as string

		return value

	}

}
