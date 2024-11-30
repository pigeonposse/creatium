import { creatium } from './main'

type CreateParams = Partial<Parameters<typeof creatium.build>[0]>

export const create = async ( params?: CreateParams ) => {

	return await creatium.build( {
		input  : 'js', // Default input. it is the key of one template
		output : './build', // Default output
		...( params ?? {} ),
	} )

}

