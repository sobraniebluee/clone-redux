import {CreateStore, MiddlewareApi, OptionsCreateStore} from "./utils/types";
import compose from "./compose";

function addMiddlewares(...middlewares) {
    return (createStore: CreateStore) => {
        return ({reducer, preloadedState }: OptionsCreateStore) => {
            const store = createStore({reducer, preloadedState});

            let dispatch = (...args) => {
                throw new Error("You can't use dispatch")
            }
            const middlewareApi: MiddlewareApi = {
                getState: store.getState.bind(store),
                dispatch: (...args) => dispatch(...args),
            };

            const chain = middlewares.map((middleware) => {
                return middleware(middlewareApi)
            }, [])
            // Composed the middleware functions
            // and pass them the dispatch function as a param
            dispatch = compose(...chain)(store.dispatch.bind(store));
            store.dispatch = dispatch;
            return store
        }
    }
}

export default addMiddlewares;