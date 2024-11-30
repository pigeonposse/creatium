import { creatium } from './main'

type CreateParams = Parameters<typeof creatium.build>[0]

export const create = async ( params: CreateParams ): Promise<CreateParams> => {

	return await creatium.build( params )

}

