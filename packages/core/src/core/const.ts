import { TEXT_EDITOR } from './extended/editor'
import { INSTALLER }   from './extended/install'
import { name }        from '../../package.json'

export {
	TEXT_EDITOR,
	INSTALLER,
	name,
}

/** Object of the CREATIUM types */
export const OPTION = {
	array       : 'array',
	select      : 'select',
	multiselect : 'multiselect',
	boolean     : 'boolean',
	number      : 'number',
	text        : 'text',
	void        : 'void',

	// customs

	output     : 'output',
	name       : 'name',
	template   : 'template',
	install    : 'install',
	openEditor : 'openEditor',
	path       : 'path',
} as const
