import {
	creatium,
	createTemplate,
} from './main'

type CreateParams = Parameters<typeof creatium.build>[0]

export const create = async ( params: CreateParams ) => {

	// Run the build function without running the CLI.
	// The user will can not use the cli flags to configure the template.
	const res = await creatium.build( params, { activeCli: false } )

	// call to the create function for create the template
	await createTemplate( res )

}

