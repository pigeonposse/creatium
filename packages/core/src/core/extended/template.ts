import { Select } from '../_super/select'

import type { ContentInput } from '../../utils'

export type OptionTemplate = Partial<Omit<Select['config'], 'options'>> & { options: { [key: string]: {
	/**
	 * Input for download
	 * Could be an directory or an array of files
	 */
	input : string | ContentInput[]
	/**
	 * Name of the template.
	 * If not set, the name of the template will be the key of the template
	 */
	name? : string
	/**
	 * Description of the template.
	 */
	desc? : string
} } }

export class Template extends Select<keyof OptionTemplate['options']> {

	constructor( config: OptionTemplate ) {

		const {
			options: _options, ...rest
		} = config

		const options = Object.fromEntries(
			Object.entries( _options ).map( ( [ key, value ] ) => [
				key,
				{
					name : value.name || key,
					desc : value.desc,
				},
			] ),
		)

		const finalConfig = {
			desc : config.desc ?? 'Select project template',
			options,
			...rest, // Propiedades opcionales adicionales
		}

		super( finalConfig )
		this.config = finalConfig

	}

}

