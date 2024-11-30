import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig( [
	{
		sourcemap   : false,
		declaration : true,
		rollup      : { esbuild : {
			target : 'node20',
		} },
		failOnWarn : true,
		entries : [ './src/lib', './src/bin' ],
	},
] )
