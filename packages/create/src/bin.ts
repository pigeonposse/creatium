#!/usr/bin/env node

import { core } from './core'

const run = async () => {

	const instance = await core()
	const res      = await instance.cli()
	await instance.createTemplate( res )

}
run()

