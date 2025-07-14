/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import * as p from '@clack/prompts'

import { number }            from './number'
import { promptLineMethods } from './types'
import {
	box,
	columns,
	table,
} from '../../../styles'

import type { PromptLineCancelProps } from './types'

const clackPrompts: typeof p = p

export const printOptions: Pick<PromptLineCancelProps, 'table' | 'columns' | 'box'> = {
	/**
	 * Logs a table in the prompt line.
	 */
	table : ( {
		value, opts, type = promptLineMethods.message,
	} ) => p.log[type]( table( value, opts ) ),
	/**
	 * Logs data formatted into aligned columns in the prompt line.
	 */
	columns : ( {
		value, opts, type = promptLineMethods.message,
	} ) => p.log[type]( columns( value, opts ) ),
	/**
	 * Logs a styled box in the prompt line.
	 */
	box : ( {
		value, opts, type = promptLineMethods.message,
	} ) => p.log[type]( box( value, opts ) ),
}

export const prompt =  {
	...clackPrompts,
	number,
	...printOptions,
}

