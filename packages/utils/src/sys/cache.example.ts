import { cache } from './cache'

const {
	get, set, defaultValues,
} = await cache( {
	projectName : 'dovenv',
	id          : 'example-setting',
	values      : {
		boolean : true,
		number  : 10,
		string  : 'en',
		array   : [
			1,
			2,
			3,
		],
		arrayMulti : [
			'string',
			2,
			3,
		],
	},
} )

const res = {
	boolean    : await get( 'boolean' ),
	number     : await get( 'number' ),
	string     : await get( 'string' ),
	array      : await get( 'array' ),
	arrayMulti : await get( 'arrayMulti' ),
}

await set( {
	boolean : false,
	number  : 10,
	string  : 'es',
	array   : [
		0,
		1,
		2,
		3,
	],
} )

const updatedRes = await get()

console.log( {
	initRes : res,
	updatedRes,
	defaultValues,
} )
