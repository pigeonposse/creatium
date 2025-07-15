import {
	getContentDir,
	getCurrentDir,
	joinPath,
	writeFile,
} from 'creatium'

const dir     = await getCurrentDir( import.meta.url )
const dataDir = joinPath( dir, 'data' )

const partials    = [ 'templates', 'workspace' ]
const partialsDir = joinPath( dataDir, 'partials' )

const templates    = [ 'js', 'ts' ]
const templatesDir = joinPath( dataDir, 'templates' )

const outDir = joinPath( dataDir, 'index.ts' )

const res = {
	templates : {},
	partials  : {},
}

for ( const partial of partials ) {

	const content            = await getContentDir( joinPath( partialsDir, partial ) )
	res['partials'][partial] = content

}

for ( const template of templates ) {

	const content = await getContentDir( joinPath( templatesDir, template ) )

	res['templates'][template] = content

}

await writeFile( outDir, `import type { ContentInput } from 'creatium'\n\nexport default ${JSON.stringify( res, null, 2 )} satisfies Record<string, Record<string, ContentInput[]>>` )
