import { config }            from '@creatium/repo-config/unbuild'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig( [
	{
		...config,
		entries : [ './src/main' ],
	},
] )
