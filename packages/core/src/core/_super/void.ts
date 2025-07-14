
import { Core } from './_shared'

import type {
	CoreInterface,
	OptionSuper,
} from './_shared'
import type { Response } from '@creatium-js/utils'

export type OptionVoid = OptionSuper & { fn: () => Response<void> }

export class Void extends Core<OptionVoid, void> implements CoreInterface<void> {

	async cmd() {

		return undefined

	}

	async validateInitialValue() {

		return undefined

	}

	async prompt() {

		if ( this.config.fn )
			await this.config.fn()

	}

}
