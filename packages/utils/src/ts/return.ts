import type { Any } from './super'

export type ReturnAwaitedType<T extends ( ...args: Any ) => Any> = Awaited<ReturnType<T>>

export type Response<V> = Promise<V> | V
export type GetResponse<T>
	= T extends ( ...args: Any[] ) => infer R
		? Awaited<R>
		: T

/** TEST */
// const TEXT_EDITOR = {
// 	VSCODE   : 'code',
// 	SUBLIME  : 'subl',
// 	WEBSTORM : 'webstorm',
// } as const

// type Value = typeof TEXT_EDITOR[ keyof typeof TEXT_EDITOR ]

// type ResTest = Response<Value>
// type FnTest = ( ...args: Any[] ) =>ResTest

// type resultTest = GetResponse<FnTest>
