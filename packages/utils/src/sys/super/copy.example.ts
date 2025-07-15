import {
	copyDir,
	getContentDir,
} from './copy'
import {
	getCurrentDir,
	joinPath,
} from './core'

const cDir     = getCurrentDir( import.meta.url )
const buildDir = joinPath( cDir, '../../../build' )

await copyDir( {
	input : [
		{
			path    : 'file1.txt',
			content : 'Contenido de archivo 1',
		},
		{
			path    : 'src/file2.txt',
			content : 'Contenido dentro de subfolder',
		},
		{
			path    : 'src/core/index.js',
			content : 'export const a = 1',
		},
	],
	output : joinPath( buildDir, 'virtual' ),
} )

await copyDir( {
	input  : cDir,
	output : joinPath( buildDir, 'fs' ),
} )

await copyDir( {
	input  : await getContentDir( joinPath( cDir, '..' ) ),
	output : joinPath( buildDir, 'virtual-from-fs' ),
} )
