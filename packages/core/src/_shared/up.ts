import { Updater } from '@clippium/updater'

import { color } from '../utils'

export const updater = ( name: string, version: string ) => {

	const {
		blue,
		bold,
		gray,
		green,
		italic,
	} = color

	async () => {

		const _updater = new Updater( {
			version,
			name,
		} )
		const data     = await _updater.get()
		if ( !data ) return

		console.log( `📦 ${bold( 'Update available' )} ${gray( data.currentVersion )} → ${green( data.latestVersion )} ${italic( `(${data.type})` )}

Run ${blue( data.packageManager + ' i ' + name )} to update
		` )

	}

}
