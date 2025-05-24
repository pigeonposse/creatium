import {
	exec as execNode,
	spawn,
	type SpawnOptions,
} from 'node:child_process'
import process from 'node:process'

import { catchError } from '../../error/main'

/**
 * Executes a command in the shell and waits for it to finish.
 *
 * @param   {string}        cmd - The command to execute.
 * @returns {Promise<void>}     - A promise that resolves when the command finishes successfully.
 * @throws {Error} - Throws an error if the command fails.
 */
export const exec = async ( cmd: string ): Promise<void> => {

	await new Promise<void>( ( resolve, reject ) => {

		const childProcess = spawn( cmd, {
			shell : true,
			stdio : 'inherit',
		} )

		childProcess.on( 'close', code => {

			if ( code === 0 ) resolve()
			else {

				const error = new Error( `Command failed with code ${code}` )
				console.error( error )
				reject( error )

			}

		} )

	} )

}

/**
 * Executes a command in a child process and captures its output.
 *
 * @param   {string}                                      cmd - The command to execute.
 * @returns {Promise<{ stdout: string; stderr: string }>}     - A promise that resolves with the output of the command.
 * @throws {Error} - Throws an error if the command fails, along with its stdout and stderr.
 */
export const execChild = async ( cmd: string ): Promise<{
	stdout : string
	stderr : string
}> => {

	return new Promise<{
		stdout : string
		stderr : string
	}>( ( resolve, reject ) => {

		const options: SpawnOptions = {
			shell : true,
			stdio : 'pipe',
		}

		const childProcess = spawn( cmd, options )

		let stdout = '',
			stderr = ''

		childProcess.stdout?.on( 'data', data => {

			stdout += data.toString()

		} )

		childProcess.stderr?.on( 'data', data => {

			stderr += data.toString()

		} )

		childProcess.on( 'close', code => {

			if ( code === 0 ) {

				resolve( {
					stdout,
					stderr,
				} )

			}
			else {

				const data = {
					code,
					stdout,
					stderr,
				}
				reject( data )

			}

		} )

		// Maneja errores del proceso
		childProcess.on( 'error', err => {

			reject( err )

		} )

	} )

}

/**
 * Executes a command and captures its output.
 *
 * @param   {string}          command - The command to execute, including any arguments.
 * @returns {Promise<string>}         A promise that resolves with the captured output (stdout).
 * @throws Will reject with an error if the command fails.
 * @example
 * const [error, output] = await catchExecOutput('dovenv --help')
 * if (error) {
 *   console.error(error);
 * } else {
 *   await writeFile('dovenvHelp.txt', output)
 * }
 */
export const catchExecOutput = <Res = string>( command: string ) => {

	return catchError( new Promise<Res>( ( resolve, reject ) => {

		execNode( command, ( error, stdout, stderr ) => {

			if ( error ) {

				reject( {
					error,
					stdout,
					stderr,
				} )
				return

			}
			resolve( stdout as Res )

		} )

	} ),
	)

}

export const existsLocalBin = async ( binName: string ) => {

	const command = process.platform === 'win32' ? `where ${binName}` : `which ${binName}`

	try {

		await execChild( command )
		return true

	}
	catch ( _e ) {

		return false

	}

}
export const existsLocalBins = async <Bin extends string>( binaries: Bin[] ): Promise<{ [key in Bin]: boolean }> => {

	type Bins = { [key in Bin]: boolean }
	const existingBinaries = {} as Bins

	// Crea un array de promesas para cada binario
	const checks = binaries.map( async bin => {

		const exists = await existsLocalBin( bin )

		existingBinaries[bin] = exists

	} )

	await Promise.all( checks )
	return existingBinaries

}
