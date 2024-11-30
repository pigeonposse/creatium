/* eslint-disable @stylistic/object-curly-newline */
import type {
	Prettify,
	Response,
} from './_shared/ts/main'
import type { OPTION }     from './core/const'
import type { TextEditor } from './core/extended/editor'
import type { PkgManager } from './core/extended/install'
import type {
	Options,
	OptionsParams,
} from './core/types'

export type HookParams = {
	/** Values passed to the prompt */
	values? : { [x: string]: unknown }
}

export type CreateTemplateOpts = {
	/** Set the input path or the template key */
	input?      : string
	/** Set the output path */
	output?     : string
	/** Set the name of the template */
	name?       : string
	/** Set the installer */
	install?    : PkgManager
	/**
	 * Open editor
	 */
	openEditor? : TextEditor
	/**
	 * Add consts to use in your templates.
	 *
	 */
	consts?     : Record<string, string>
}

export type ValuesSimple = Prettify<
	Omit<CreateTemplateOpts, 'consts' | 'input' | 'output'>
	& Required<Pick<CreateTemplateOpts, 'output' | 'input'>
	>
>

export type Config = {
	/**
	 * Set name of you project
	 */
	name      : string
	/**
	 * Set version of you current project
	 * Used in for the updater notifications.
	 */
	version   : string
	/**
	 * Use cache
	 * @default true
	 */
	cache?    : boolean
	/**
	 * Use updater
	 * @default false
	 */
	updater?  : boolean
	/** Set custom function foor when user cancels the process */
	onCancel? : ( ( data: HookParams ) => Response<void> ) | false
	/** Set custom intro */
	intro?    : ( ( data: HookParams ) => Response<void> ) | false
	/** Set custom outro */
	outro?    : ( ( data: HookParams ) => Response<void> ) | false
	/**
	 * Set you prompts config
	 */
	prompt    : OptionsParams
	/**
	 * hooks for
	 */
	hooks?     : {
		/* Before the prompt is set */
		beforePrompt? : <D extends HookParams>( data: D ) => Response<D | undefined>
		/* After the prompt is set */
		afterPrompt?  : <D extends HookParams>( data: D ) => Response<D | undefined>
	}
}

export type ConfigSimple = Prettify< Omit<Config, 'prompt' | 'hooks'> & {
	/** Set your prompt options */
	opts?: {
		/** Active/deactivate the name prompt */
		[OPTION.name]?       : boolean
		/**
		 * Active/deactivate the install prompt
		 * Also, You can set the installators that you want to use.
		 */
		[OPTION.install]?    : false | Options['install']['onlyOptions']
		/**
		 * Active/deactivate the openEditor prompt.
		 * Also, You can set the editors that you want to use.
		 */
		[OPTION.openEditor]? : false | Options['openEditor']['onlyOptions']
	}
	/** Set your template ooptions */
	templates : | Options['template']['options']
	/**
	 * Add consts to use in your templates.
	 */
	consts?   : CreateTemplateOpts['consts']
}>

export type CliOpts = {
	/**
	 * Arguments to pass to the command
	 * @default process.argv.slice(2)
	 */
	args?    : string[]
	/**
	 * Hide the first two arguments
	 * @default false
	 */
	hideBin? : boolean
}

export type CreateOpts = CliOpts & {
	/**
	 * Options for activate cli.
	 * @default true
	 */
	activeCli? : boolean }
