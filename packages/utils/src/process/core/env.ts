
const isBrowser: boolean = typeof window !== 'undefined' && typeof window.document !== 'undefined'

const isNode: boolean = typeof process !== 'undefined'
	&& process.versions != null
	&& process.versions.node != null

const isWebWorker: boolean = typeof self === 'object'
	&& self.constructor
	&& self.constructor.name === 'DedicatedWorkerGlobalScope'

// https://github.com/jsdom/jsdom/issues/1537#issuecomment-229405327
const isJsDom: boolean = ( typeof window !== 'undefined' && window.name === 'nodejs' )
	|| ( typeof navigator !== 'undefined'
		&& 'userAgent' in navigator
		&& typeof navigator.userAgent === 'string'
		&& ( navigator.userAgent.includes( 'Node.js' )
			|| navigator.userAgent.includes( 'jsdom' ) ) )

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const isDeno: boolean = typeof Deno !== 'undefined' && typeof Deno.version !== 'undefined' && typeof Deno.version.deno !== 'undefined'

const isBun = typeof process !== 'undefined' && process.versions != null && process.versions.bun != null

/**
 * True if the environment is a development environment.
 */
const isDev = process.env.NODE_ENV !== 'production'

export {
	isBrowser,
	isWebWorker,
	isNode,
	isJsDom,
	isDeno,
	isBun,
	isDev,
}

export const env = {
	isBrowser,
	isWebWorker,
	isNode,
	isJsDom,
	isDeno,
	isBun,
}
