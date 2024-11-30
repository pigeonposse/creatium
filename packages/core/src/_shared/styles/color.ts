
import chalk          from 'chalk'
import gradientString from 'gradient-string'

import type {
	GradientColors,
	GradientOpts,
} from './types'
import type { Color } from './types'

/**
 * Export types that can be used from outside.
 *
 */
export {
	GradientColors,
	GradientOpts,
}

/**
 * Provides colors for terminal output.
 * @type {object}
 * @example
 * console.log(color.green('This text is green'));
 */
export const color: Color = chalk

/**
 * Generates a gradient string with the specified colors.
 * @param   {string}         txt    - The text to apply the gradient to.
 * @param   {GradientColors} colors - An array of color names or hex values.
 * @param   {GradientOpts}   [opts] - Custom opts.
 * @returns {string}                - The text with the applied gradient.
 * @example
 * // Example usage:
 * const gradientText = gradient('Gradient Text', ['red', 'yellow', 'green']);
 * console.log(gradientText);
 */
export const gradient = ( txt: string, colors: GradientColors, opts?: GradientOpts ) => {

	// @ts-ignore: todo
	return gradientString( ...colors ).multiline( txt, opts )

}
