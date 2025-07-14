import type {
	GetPromptValue,
	OptionsClasses,
} from './core/types'
import type { Config }   from './types'
import type { Prettify } from '@creatium-js/utils'

export type GetPromptValues<C extends Config> = Prettify<{
	[K in keyof C['prompt']]?: Prettify<(
		C['prompt'][K] extends { type: infer T }
			? T extends keyof OptionsClasses
				? GetPromptValue<T>
				: never
			: never
	)>
}>

export type GetPromptKeys<C extends Config> = keyof C['prompt']

export type GetArgvValues<V extends Config> = Prettify<GetPromptValues<V> & {
	debug?   : boolean
	version? : boolean
	help?    : boolean
}>

