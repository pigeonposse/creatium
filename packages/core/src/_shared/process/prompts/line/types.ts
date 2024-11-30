
import type { number } from './number'
import type {
	box,
	columns,
	table,
}              from '../../../styles/main'
import type { Prettify } from '../../../ts/super'
import type * as p       from '@clack/prompts'

export const promptLineMethods = {
	message : 'message',
	info    : 'info',
	success : 'success',
	step    : 'step',
	warn    : 'warn',
	warning : 'warning',
	error   : 'error',
} as const

export type PromptLineMethod = typeof promptLineMethods[keyof typeof promptLineMethods]

/**
 * NUMBER.
 *
 */

// eslint-disable-next-line @stylistic/object-curly-newline
export type NumberParams = Prettify< p.TextOptions & {
	// placeholder?  : number
	// defaultValue? : number
	errorText? : string }>

/**
 * Parameters of the `table` function from the `@dovenv/utils` module.
 *
 * [See module](https://clippo.pigeonposse.com/guide/utils/style#table).
 */
export type TableParams = Parameters<typeof table>
/**
 * Parameters of the `columns` function from the `@dovenv/utils` module.
 *
 * [See module](https://clippo.pigeonposse.com/guide/utils/styles#columns).
 */
export type ColumnsParams = Parameters<typeof columns>

/**
 * Parameters of the `box` function from the `@dovenv/utils` module.
 *
 * [See module](https://clippo.pigeonposse.com/guide/utils/styles#box).
 */
export type BoxParams = Parameters<typeof box>

/**
 * Props for canceling a prompt line, including functions from various modules.
 */
export type PromptLineCancelProps = typeof p & {
	number : typeof number
	table   : ( opts:{
		value : TableParams[0]
		opts? : TableParams[1]
		type? : PromptLineMethod
	} ) => void
	box     : ( opts:{
		value : BoxParams[0]
		opts? : BoxParams[1]
		type? : PromptLineMethod
	} ) => void
	columns : ( opts:{
		value : ColumnsParams[0]
		opts? : ColumnsParams[1]
		type? : PromptLineMethod
	}  ) => void
}

