import {
	extra,
	homepage,
} from '../../../package.json'
import data     from '../data'
import {
	version,
	description,
} from '../package.json'

const name      = extra.libraryId
const TEMPLATES = {
	JS : 'js',
	TS : 'ts',
} as const
export {
	name,
	version,
	description,
	homepage,
	data,
	TEMPLATES,
}

