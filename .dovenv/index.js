import { defineConfig } from '@dovenv/core'
import  {
	pigeonposseMonorepoTheme,
	getWorkspaceConfig,
	Predocs,
} from '@dovenv/theme-pigeonposse'

const core = await getWorkspaceConfig( {
	metaURL  : import.meta.url,
	path     : '../',
	corePath : './packages/core',
} )

export default defineConfig(
	{ custom : { predocs : {
		desc : 'build docs pages',
		fn   : async ( { config } ) => {

			const docs = new Predocs( undefined, config )
			await docs.setIndexFile( {
				noFeatures : true,
				custom     : { features : [
					{
						title   : 'Get started',
						icon    : '🏁',
						details : 'Start your project now',
						link    : '/guide',
					},
					{
						title   : 'Library / CLI',
						icon    : '📚',
						details : 'Check the documentation',
						link    : '/guide/core',
					},
					{
						title   : 'Set up',
						icon    : '🚀 ',
						details : 'Start your project with a template',
						link    : '/guide/create',
					},
				] },
			} )
			await docs.setContributorsFile()
			await docs.setGuideIndexFile()
			await docs.setGuideSectionIndexFile( { none : [
				'config',
				'theme',
				'plugin',
			] } )

			await docs.setPkgFiles()

		},
	} } },

	pigeonposseMonorepoTheme( {
		core,
		docs : async () => ( {
			version   : core.corePkg.version,
			vitepress : {
				ignoreDeadLinks : true,
				themeConfig     : { outline: { level: [ 2, 3 ] } },
			},
		} ),
		repo : { commit : { scopes : [
			{
				value : 'packages',
				desc  : 'All or some packages',
			},
			{
				value : 'core',
				desc  : 'Core package',
			},
			{
				value : 'create',
				desc  : 'Create package',
			},
			{
				value : 'env',
				desc  : 'Only dev environment',
			},
			{
				value : 'all',
				desc  : 'env, packages etc',
			},
		] } },
	} ),
)
