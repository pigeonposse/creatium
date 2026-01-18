
import gradientString from 'gradient-string'
import {
	type InspectColor,
	styleText,
} from 'node:util'

import type {
	GradientColors,
	GradientOpts,
} from './types'

/**
 * Export types that can be used from outside.
 *
 */
export {
	GradientColors,
	GradientOpts,
}

const cTypes = [
	// ForegroundColors
	'black',
	'blackBright',
	'blue',
	'blueBright',
	'cyan',
	'cyanBright',
	'gray',
	'green',
	'greenBright',
	'grey',
	'magenta',
	'magentaBright',
	'red',
	'redBright',
	'white',
	'whiteBright',
	'yellow',
	'yellowBright',

	// BackgroundColors
	'bgBlack',
	'bgBlackBright',
	'bgBlue',
	'bgBlueBright',
	'bgCyan',
	'bgCyanBright',
	'bgGray',
	'bgGreen',
	'bgGreenBright',
	'bgGrey',
	'bgMagenta',
	'bgMagentaBright',
	'bgRed',
	'bgRedBright',
	'bgWhite',
	'bgWhiteBright',
	'bgYellow',
	'bgYellowBright',

	// Modifiers
	'blink',
	'bold',
	'dim',
	'doubleunderline',
	'framed',
	'hidden',
	'inverse',
	'italic',
	'overlined',
	'reset',
	'strikethrough',
	'underline',
] as const

const _color    = ( t: InspectColor, v: string ) => styleText( t, v )
const tc        = cTypes as unknown as InspectColor[]
const _colorObj = tc.reduce( ( acc, t ) => {

	acc[t] = ( v: string ) => _color( t, v )
	return acc

}, {} as Record<InspectColor, ( v: string ) => string> )

/**
 * Provides colors for terminal output.
 *
 * @type {object}
 * @example
 * console.log(color.green('This text is green'));
 */
export const color = _colorObj

/**
 * Generates a gradient string with the specified colors.
 *
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

	return gradientString( colors, opts ).multiline( txt )

}
