import { config }            from '@creatium-js/repo-config/unbuild'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig( [
	{
		...config,
		externals : [
			'deepmerge-ts',
			'cli-table3',
			'gradient-string',
			'string-width',
			'tiny-glob',
			'columnify',
			'@clack/prompts',
			'@clack/core',
			'@visulima/boxen',
		],
	},
] )
