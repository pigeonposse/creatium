import {
	creatium,
	createTemplate,
} from './core'

export type CreateParams = Parameters<typeof creatium.build>[0]

export const create = async ( params: CreateParams ) => {

	const res = await creatium.build( params, { activeCli: false } )
	await createTemplate( res )
	return res

}

