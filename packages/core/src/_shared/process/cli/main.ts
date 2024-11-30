import yargs                       from 'yargs'
import { hideBin as hideBinYargs } from 'yargs/helpers'

export * from './flag'

import type { Argv } from 'yargs'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EmptyObject = {}
/**
 * Hides the first two arguments from the process.argv array.
 * @returns {string[]} Array of arguments without the first two elements.
 * @example
 * import { hideBin } from '@dovenv/utils'
 * const args = hideBin( process.argv ) // removes the uneeded arguments
 * console.log( args )
 */
export const hideBin = hideBinYargs

export const createCli = async <Options = EmptyObject>( options: {
	args? : string[]
	fn    : ( cli: Argv<Options> ) => Promise<Argv<Options>>
} ): Promise<Argv<Options>> => {

	const {
		args = process.argv, fn,
	} = options

	// Crear la instancia del CLI
	const bin = yargs( args ) as Argv<Options>

	// Configurar el CLI con la función proporcionada
	await fn( bin )

	// Configurar ayuda y parsear argumentos
	bin.help()
	bin.parse()

	return bin

}

