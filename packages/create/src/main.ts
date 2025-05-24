import { core } from './core'

import type { CreateTemplateParams } from './core'

/**
 * Creates a new project using the specified parameters.
 *
 * @param   {CreateTemplateParams} params - The parameters required for building the project.
 * @returns {Promise<object>}             A promise that resolves to the result of the build process.
 */
export const create = async ( params: CreateTemplateParams ) => {

	const instance = await core()
	const res      = await instance.build( params, { activeCli: false } )
	await instance.createTemplate( res )
	return res

}
