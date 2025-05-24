import {
	existsFile,
	getDirName,
	joinPath,
	resolvePath,
} from './super'
import { currentProcess as process } from '../process/core/main'

/**
 * Finds the closest package.json by traversing up the directory tree.
 *
 * @param   {string} [startDir] - Directory to start searching from.
 * @returns {string}            Absolute path to the closest package.json.
 * @throws {Error} If no package.json is found.
 */
export const getClosestPackageJson = async ( startDir = process.cwd() ) => {

	let currentDir = resolvePath( startDir )

	while ( true ) {

		const pkgPath = joinPath( currentDir, 'package.json' )

		if ( await existsFile( pkgPath ) ) return pkgPath

		const parentDir = getDirName( currentDir )

		if ( parentDir === currentDir )
			throw new Error( 'No package.json found in any parent directory.' )

		currentDir = parentDir

	}

}

/**
 * Finds the closest package directory by traversing up the directory tree.
 *
 * @param   {string} [startDir] - Directory to start searching from.
 * @returns {string}            Absolute path to the closest package directory.
 */
export const getClosestPackageDir = async ( startDir = process.cwd() ) => {

	const pkgPath = await getClosestPackageJson( startDir )
	return getDirName( pkgPath )

}
