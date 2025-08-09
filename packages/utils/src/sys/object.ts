import {
	readFile,
	validateHomeDir,
} from './super'

export type CommonObj
	= Record<string, unknown>
		| Record<string, unknown>[]
		| unknown[]

const getFileContent = async ( path:string ) => {

	path                    = validateHomeDir( path )
	const fileContentBuffer = await readFile( path )
	const fileContent       = fileContentBuffer.toString( 'utf8' )
	return fileContent

}

const getObjectFromJSONContent = async <Res extends CommonObj = CommonObj>( content: string ) => {

	const r = JSON.parse( content ) as Res
	return r

}

export const getObjectFromJSONFile = async <Res extends CommonObj = CommonObj>( path: string ) => {

	try {

		const fileContent = await getFileContent( path )
		return await getObjectFromJSONContent( fileContent ) as Res

	}
	catch ( error ) {

		// @ts-ignore
		throw new Error( `Error reading JSON file ${path}: ${error.message}` )

	}

}
