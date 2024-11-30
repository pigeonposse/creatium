#!/usr/bin/env node

import {
	creatium,
	createTemplate,
} from './main'

// Run the CLI and obtain the prompt values
const res = await creatium.cli()

// Call to the create function for create the template
await createTemplate( res )

