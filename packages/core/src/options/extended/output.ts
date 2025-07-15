import {
	Path,
	PATH_TYPE,
} from './path'
import { OptionsUtils } from '../_super/_shared'

export type OptionOutput = Partial<Omit<Path['config'], 'pathType' | 'exists'>>

export class Output extends Path {

	constructor( config: OptionOutput, public _utils: OptionsUtils ) {

		const finalConfig = {
			desc      : config.desc ?? 'Set the path where you want to create your project',
			promptMsg : config.promptMsg ?? 'Where do you want to create your project?',
			...config,
		}

		super( {
			...finalConfig,
			pathType : PATH_TYPE.folder,
			exists   : false,
		}, _utils )
		this.config = finalConfig

	}

}
