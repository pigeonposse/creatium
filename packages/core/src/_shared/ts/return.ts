import type { Any } from './super'

export type ReturnAwaitedType<T extends ( ...args: Any ) => Any> = Awaited<ReturnType<T>>

export type Response<V> = Promise<V> | V
export type GetResponse<T> =
	T extends ( ...args: Any[] ) => infer R
		? Awaited<R>
		: T

/** TEST */
// const IDE = {
// 	VSCODE   : 'code',
// 	SUBLIME  : 'subl',
// 	WEBSTORM : 'webstorm',
// } as const

// type Value = typeof IDE[ keyof typeof IDE ]

// type ResTest = Response<Value>
// type FnTest = ( ...args: Any[] ) =>ResTest

// type resultTest = GetResponse<FnTest>
