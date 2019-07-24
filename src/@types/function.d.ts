// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionWithAnyArguments<T = void> = (...args: any[]) => T;