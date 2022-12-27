export type Reducer<S = any, A = any> = (state: S, action: A) => S;

export type AnyAction<T extends string = string, P = any> = {
    type: T,
    payload?: P
}

export type OptionsCreateStore = {
    reducer: Reducer
    preloadedState?: any,
    middlewares?:any
}

export interface IStore {
    getState: () => any,
    dispatch: (func: AnyAction) => void,
    subscribe: (callback: (...rest: any) => void) => (() => void)
}

export type CreateStore = (OptionsCreateStore) => IStore;

export type MiddlewareApi = {
    dispatch: (arg: AnyAction) => void
    getState: any
}