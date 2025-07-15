import { copyFile as nodeCopyFile } from 'node:fs/promises'

import {
	createDir,
	existsDir,
	getPaths,
	joinPath,
	readDir,
	readFile,
	writeFile,
} from './core'

export type ContentInput = {
	/**
	 * The name of the file
	 *
	 * @example 'index.html'
	 * @example 'src/index.js'
	 */
	path    : string
	content : string | Buffer
}

export type CopyDirOptions = {
	/**
	 * The path of the directory to copy or an array of files and directories to copy.
	 */
	input : ContentInput[] | string

	/**
	 * The path of the destination directory.
	 */
	output : string
}

export const getContentDir = async (
	input: string,
	opts?: Omit<Parameters<typeof getPaths>[1], 'cwd' | 'filesOnly'> & {
		pattern?  : string
		encoding? : Parameters<typeof readFile>[1]
	},
): Promise<ContentInput[]> => {

	const entries: ContentInput[] = []

	const paths = await getPaths( opts?.pattern || '**', {
		absolute  : false,
		...( opts || {} ),
		filesOnly : true,
		cwd       : input,
	} )

	for ( const path of paths ) {

		const content = await readFile( joinPath( input, path ), opts?.encoding || 'utf-8' )
		entries.push( {
			path    : path,
			content : content,
		} )

	}

	return entries

}

/**
 * Copy a file from input path to output path.
 *
 * @param   {{input: string, output: string}} options - Options object with input and output paths.
 * @returns {Promise<void>}                           - Resolves when the file has been copied.
 * @throws {Error} If there is an error copying the file.
 * @example import { copyFile } from '@dovenv/utils'
 *
 * const copyResult = await copyFile({
 *   input : '/path/to/source.txt',
 *   output: '/path/to/destination.txt',
 * })
 */
export const copyFile = async ( {
	input, output,
}: {
	input  : string
	output : string
} ) => {

	try {

		await nodeCopyFile( input, output )
		// await fs.promises.rename( output, name )

	}
	catch ( error ) {

		console.error( error )

	}

}

const _copyFromFS = async ( inputPath: string, outputPath: string ) => {

	if ( !await existsDir( inputPath ) )
		throw new Error( `Input directory does not exist: ${inputPath}` )

	const entries = await readDir( inputPath )

	if ( !await existsDir( outputPath ) )
		await createDir( outputPath )

	for ( const entry of entries ) {

		const srcPath  = joinPath( inputPath, entry.name )
		const destPath = joinPath( outputPath, entry.name )

		if ( entry.isDirectory() ) {

			await _copyFromFS( srcPath, destPath )

		}
		else {

			await copyFile( {
				input  : srcPath,
				output : destPath,
			} )

		}

	}

}

const _copyFromMemory = async ( input: ContentInput, targetDir: string ) => {

	const targetPath = joinPath( targetDir, input.path )

	// Crea el directorio padre si no existe
	const dirPath = targetPath.split( '/' ).slice( 0, -1 ).join( '/' )
	if ( !await existsDir( dirPath ) ) await createDir( dirPath )

	await writeFile( targetPath, input.content )

}

/**
 * Copy a directory from input path to output path.
 *
 * @param   {{input: string, output: string}} options - Options object with input and output paths.
 * @returns {Promise<void>}                           - Resolves when the directory has been copied.
 * @throws {Error} If there is an error copying the directory.
 * @example
 *
 * const copyResult = await copyDir({
 *   input : '/path/to/sourceDir',
 *   output: '/path/to/destinationDir',
 * })
 *
 * const copyResult = await copyDir({
 *   input : [
 *     { name: 'file1.txt', content: 'Hello, world!' },
 *     { name: 'subfolder/subfile.txt', content: 'Subfolder content' } },
 *   ],
 *   output: '/path/to/destinationDir',
  })
 */
export const copyDir = async ( {
	input,
	output,
}: CopyDirOptions ) => {

	try {

		if ( !await existsDir( output ) ) await createDir( output )

		if ( typeof input === 'string' )
			return await _copyFromFS( input, output )

		if ( Array.isArray( input ) ) {

			for ( const item of input )
				await _copyFromMemory( item, output )
			return

		}

		throw new Error( `Invalid input type: expected string or ContentInput[] or path` )

	}
	catch ( error ) {

		const message = error instanceof Error ? error.message : String( error )
		throw new Error( `Error copying to "${output}": ${message}` )

	}

}
