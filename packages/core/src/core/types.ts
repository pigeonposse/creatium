
import type { CliOption } from './_super/_shared'
import type {
	OptionArray,
	Array,
}             from './_super/array'
import type {
	OptionBoolean,
	Boolean,
}         from './_super/boolean'
import type {
	OptionMultiselect,
	Multiselect,
} from './_super/multiselect'
import type {
	OptionNumber,
	Number,
}           from './_super/number'
import type {
	OptionSelect,
	Select,
}           from './_super/select'
import type {
	OptionText,
	Text,
} from './_super/text'
import type {
	OptionVoid,
	Void,
}               from './_super/void'
import type { OPTION } from './const'
import type {
	Editor,
	OptionEditor,
}     from './extended/editor'
import type {
	Install,
	OptionInstall,
}   from './extended/install'
import type {
	Name,
	OptionName,
}         from './extended/name'
import type {
	Output,
	OptionOutput,
}       from './extended/output'
import type {
	OptionPath,
	Path,
} from './extended/path'
import type {
	OptionTemplate,
	Template,
} from './extended/template'
import type {
	ObjectToArray,
	Prettify,
} from '../_shared/ts/super'

export type Options = {
	/**Array of values*/
	[OPTION.array]       : OptionArray
	/**Single selection option*/
	[OPTION.select]      : OptionSelect
	/**Multiple selection option*/
	[OPTION.multiselect] : OptionMultiselect
	/**Boolean option (true/false)*/
	[OPTION.boolean]     : OptionBoolean
	/**Numeric input*/
	[OPTION.number]      : OptionNumber
	/**Text input*/
	[OPTION.text]        : OptionText
	/**Void option (no value)*/
	[OPTION.void]        : OptionVoid

	// Extended options

	/** Options for path*/
	[OPTION.path] : OptionPath

	// Extended Core options

	/**Input for download*/
	[OPTION.output]     : OptionOutput
	/**Name of the project
	 * @default filename(output)*/
	[OPTION.name]       : OptionName
	/**Templates*/
	[OPTION.template]   : OptionTemplate
	/**Package manager to install dependencies*/
	[OPTION.install]    : OptionInstall
	/** Open project in a text editor if exist */
	[OPTION.openEditor] : OptionEditor
}

export type OptionsClasses = {
	/** Class for handling array options */
	[OPTION.array]       : typeof Array
	/** Class for handling select options */
	[OPTION.select]      : typeof Select
	/** Class for handling multiselect options */
	[OPTION.multiselect] : typeof Multiselect
	/** Class for handling boolean options */
	[OPTION.boolean]     : typeof Boolean
	/** Class for handling number options */
	[OPTION.number]      : typeof Number
	/** Class for handling text options */
	[OPTION.text]        : typeof Text
	/** Class for handling void options */
	[OPTION.void]        : typeof Void

	// Extended options

	/** Options for path*/
	[OPTION.path] : typeof Path

	// Extended Core options

	/** Class for handling output options */
	[OPTION.output]     : typeof Output
	/** Class for handling name options */
	[OPTION.name]       : typeof Name
	/** Class for handling template options */
	[OPTION.template]   : typeof Template
	/** Class for handling install options */
	[OPTION.install]    : typeof Install
	/** Class for handling openEditor options */
	[OPTION.openEditor] : typeof Editor
}

export type OptionKey = Prettify<keyof Options>

export type OptionsParams = Prettify<Record<string, ObjectToArray<Options>[number]>>

export type GetPromptsResponse = { [key: string ]: OptionsClasses[keyof OptionsClasses]['prototype']['prompt'] }
export type GetCMDsResponse = { [key: string ]: CliOption }

export type GetPromptValue<K extends keyof OptionsClasses> = Prettify<
	'prompt' extends keyof OptionsClasses[K]['prototype']
		? Awaited<ReturnType<OptionsClasses[K]['prototype']['prompt']>>
		: never
>
