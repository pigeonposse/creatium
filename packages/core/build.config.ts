import { config }            from '@creatium-js/repo-config/unbuild'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig( [
	{
		...config,
		externals : [ 'deepmerge-ts' ],
	},
] )
