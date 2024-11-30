import { creatium } from './main'

/**
 * Asynchronously creates a new instance using the provided parameters.
 * @param {Parameters<typeof creatium.build>[0]} params - The parameters required for creation.
 * @returns {Promise<Object>} A promise that resolves to the result of the creation process.
 */
export const create = async ( params ) => {

	return await creatium.build( params )

}

