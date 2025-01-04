import { defineConfig } from '@dovenv/core'
import ppTheme, {
	getWorkspaceConfig,
	Predocs,
} from '@dovenv/theme-pigeonposse'

// import readmes from './readmes.js'

const core = await getWorkspaceConfig( {
	metaURL  : import.meta.url,
	path     : '..',
	packages : {
		metaURL : import.meta.url,
		path    : '../packages',
	},
	core : {
		metaURL : import.meta.url,
		path    : '../packages/core',
	},
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

	ppTheme( {
		core : await getWorkspaceConfig( {
			metaURL  : import.meta.url,
			path     : '..',
			packages : {
				metaURL : import.meta.url,
				path    : '../packages',
			},
			core : {
				metaURL : import.meta.url,
				path    : '../packages/core',
			},
		} ),
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
		lint      : { staged: { '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,json,yml,yaml}': 'pnpm --silent . lint eslint --silent' } },
		workspace : { check : { pkg : { schema : async ( {
			v, path, content,
		} ) => {

			if ( !content ) throw new Error( `No data in ${path}` )
			if ( 'private' in content ) return

			if ( !content.keywords.includes( 'pp' ) || !content.keywords.includes( 'pigeonposse' ) )
				throw new Error( `You must add "pigeonposse" and "pp" keywords in ${path}` )

			return v.object( {
				name          : v.string(),
				version       : v.string(),
				description   : v.string(),
				files         : v.array( v.string() ),
				keywords      : v.array( v.string() ),
				publishConfig : v.object( { access: v.literal( 'public' ) } ),
			} )

		} } } },
	} ),
)
