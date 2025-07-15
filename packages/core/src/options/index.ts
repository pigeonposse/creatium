import { cache }       from '../utils'
import { Array }       from './_super/array'
import { Boolean }     from './_super/boolean'
import { Multiselect } from './_super/multiselect'
import { Number }      from './_super/number'
import { Select }      from './_super/select'
import { Text }        from './_super/text'
import { Void }        from './_super/void'
import { name }        from '../_shared/const'
import { Editor }      from './extended/editor'
import { Install }     from './extended/install'
import { Name }        from './extended/name'
import { Output }      from './extended/output'
import { Path }        from './extended/path'
import { Template }    from './extended/template'

import type {
	AnyOption,
	AnyOptionInstance,
	OptionsUtils,
} from './_super/_shared'
import type {
	GetCMDsResponse,
	GetPromptsResponse,
	OptionsClasses,
	OptionsParams,
} from './types'

export class Options {

	onCancel

	/** Enable cache */
	cache    = false
	/**
	 * Project name.
	 * Used for cache
	 */
	projectName = name

	/** Debug mode */
	public set debugMode( value: boolean ) {

		if ( value === true ) {

			const dim     = ( txt: string ) => this.utils.color.gray( this.utils.color.dim( txt ) )
			console.debug = ( ...args ) => {

				console.log( )

				const TITLE = dim( this.utils.line( {
					title    : 'DEBUG',
					lineChar : ' ',
					align    : 'left',
				} ) )
				const LINE  = dim( this.utils.line( { title: '' } ) )

				// console.log( LINE )
				console.log( TITLE )
				console.log( LINE )
				console.log( ...args )
				console.log( LINE )
				console.log( )

			}

		}
		else console.debug = () => {}

	}

	constructor( public config: OptionsParams, public utils: OptionsUtils ) {

		this.onCancel = async () => {}

	}

	async #getCache() {

		const resetObjectValues = <T extends Record<string, unknown>>( obj: T ): { [K in keyof T]: undefined } => {

			return Object.keys( obj ).reduce( ( acc, key ) => {

				acc[key as keyof T] = undefined
				return acc

			}, {} as { [K in keyof T]: undefined } )

		}

		if ( !this.cache ) return

		return await cache( {
			projectName : this.projectName,
			id          : 'create-prompts',
			values      : resetObjectValues( this.config ),
		} )

	}

	#getClasses(): OptionsClasses {

		return {
			array       : Array,
			number      : Number,
			boolean     : Boolean,
			multiselect : Multiselect,
			select      : Select,
			text        : Text,
			void        : Void,
			openEditor  : Editor,
			output      : Output,
			install     : Install,
			name        : Name,
			template    : Template,
			path        : Path,
		}

	}

	#getClass( type:keyof OptionsClasses ) {

		const Klass = this.#getClasses()

		if ( !( type in Klass ) ) throw new Error( `Option ${type} not found` )

		return Klass[type] as unknown as AnyOption

	}

	#getClassInstance( type:keyof OptionsClasses, props:Record<string, unknown> ) {

		const Klass    = this.#getClass( type )
		const instance = new Klass( props, this.utils ) as AnyOptionInstance
		return instance

	}

	async getCmds( ): Promise<GetCMDsResponse> {

		const res: GetCMDsResponse = {}

		await Promise.all( Object.entries( this.config ).map( async ( [ key, value ] ) => {

			const {
				type, ...props
			} = value

			const instance = this.#getClassInstance( type, props )

			if ( 'cmd' in instance ) {

				const cmd = await instance.cmd()
				if ( cmd ) res[key] = cmd

			}

		} ) )
		return res

	}

	async getPrompts( initialValues?: { [key: string]: unknown } ): Promise<GetPromptsResponse> {

		const res: GetPromptsResponse = {}

		const cached       = await this.#getCache()
		const cachedValues = await cached?.get()

		console.debug( { cacheData : {
			active : this.cache,
			...cached,
			values : cachedValues,
		} } )

		await Promise.all( Object.entries( this.config ).map( async ( [ key, value ] ) => {

			const {
				type, ...props
			} = value

			const instance = this.#getClassInstance( type, props )

			instance._onCancel = this.onCancel
			instance.debugMode = this.debugMode

			const initialValue = initialValues?.[key]
			if ( initialValue ) instance.initialValue = initialValue

			const cachedValue = cachedValues?.[key]
			if ( cachedValue ) instance.config.placeholderValue = cachedValue

			// @ts-ignore
			instance.afterPrompt = async value => await cached?.set( { [key]: value } )

			if ( 'prompt' in instance )
				res[key] = await instance.getPromptHooked.bind( instance )

		} ) )
		return res

	}

}
