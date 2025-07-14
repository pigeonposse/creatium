import { getClosestPackageDir } from './pkg'
import { getCurrentDir }        from './super'

const pkgDir = await getClosestPackageDir( getCurrentDir( import.meta.url ) )

console.log( pkgDir )
