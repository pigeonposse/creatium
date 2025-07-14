import {
	getPaths,
	joinPath,
} from './core'

const paths = await getPaths( '**', {
	dot       : true,
	cwd       : joinPath( process.cwd(), 'packages', 'core', 'src' ),
	filesOnly : true,
	absolute  : true,
} )
console.log( paths )
