#!/usr/bin/env node

import {
	creatium,
	createTemplate,
} from './main'

const run = async () => {

	const res = await creatium.cli()
	await createTemplate( res )

}
run()

