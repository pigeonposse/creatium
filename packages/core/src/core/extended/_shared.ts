import { deepmerge } from 'deepmerge-ts'

import type { OptionSelect } from '../_super/select'

export const SELECT_BASE_OPTS = { NONE: 'none' } as const

export type OptionNone = typeof SELECT_BASE_OPTS['NONE']

type OptionsValue = {
	/** Visible name of the option */
	name? : string
	/** Description of the option. Used in cli prompt */
	desc? : string
}

export type SelectBaseOptions<Value extends string = string> = Partial<Omit<OptionSelect<Value>, 'options'>> & {
	/**
	 * Select only specific options by key.
	 *
	 * Minimum 2 option.
	 * @example ['yarn', 'pnpm']
	 */
	onlyOptions? : [Exclude<Value, OptionNone>, Exclude<Value, OptionNone>, ...Exclude<Value, OptionNone>[]]
	/** Change the options values by key */
	options?: {
		[key in Value]?: OptionsValue;
	}
}

export const mergeSelectBaseOptions = <V extends string, C extends SelectBaseOptions>( config: C, defaultOptions: Record<V, OptionsValue> ) => {

	const options = deepmerge( defaultOptions || {}, config.options || {} )

	const filteredOptions = config.onlyOptions && config.onlyOptions.length > 1
		? Object.entries( options ).reduce( ( acc, [ key, value ] ) => {

			if ( key === SELECT_BASE_OPTS.NONE || config.onlyOptions!.includes( key as Exclude<V, OptionNone> ) )
				acc[key as V] = value as OptionsValue

			return acc

		}, {} as Record<V, OptionsValue>  )
		: options

	return {
		...config,
		options : Object.keys( filteredOptions ).length > 1 ? filteredOptions : options,
	}

}

