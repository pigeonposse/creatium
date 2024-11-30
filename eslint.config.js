import { dovenvEslintConfig } from '@dovenv/lint'

/** @type {import('eslint').Linter.Config[]} */
export default [
	dovenvEslintConfig.includeGitIgnore(),
	...dovenvEslintConfig.config,
	dovenvEslintConfig.setIgnoreConfig( [
		'**/templates/**/*',
		'**/README.md',
		'**/partials/**/*',
	] ),
]
