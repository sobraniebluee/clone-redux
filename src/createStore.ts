import {AnyAction, IStore, OptionsCreateStore, Reducer} from "./utils/types";
import Actions from "./utils/actions";
import addMiddlewares from "./addMiddlewares";

class Store implements IStore {
    protected isDispatching = false;
    protected state = {};
    protected subscribers = [];
    protected reducer: Reducer;

    constructor(reducer: Reducer, preloadedState = undefined) {
        this.state = reducer.call(null, preloadedState, Actions.getInitState)
        this.reducer = reducer
    }

    getState(): any {
        return this.state;
    }

    dispatch(func: AnyAction) {
        if (this.isDispatching) {
            throw Error("You can't use dispatch")
        }
        try {
            this.isDispatching = true
            this.state = this.reducer.call(null, this.state, func);
        } finally {
            this.isDispatching = false
        }
        for (let i = 0;i < this.subscribers.length;i++) {
            const callback = this.subscribers[i];
            callback.call(null)
        }
    }

    subscribe(callback: (...rest: any) => void) {
        this.subscribers.push(callback);

        // Return unsubscribe function
        return () => {
            let callbackIndex = this.subscribers.indexOf(callback)
            if (callbackIndex !== -1) {
                this.subscribers = this.subscribers.filter((_, index) => index != callbackIndex);
            }
        }
    }
}

function createStore({reducer, preloadedState, middlewares}: OptionsCreateStore): IStore {
    if (typeof reducer !== "function") {
        throw new Error("Root reducer must be is a function!");
    }
    if (middlewares && middlewares.length > 0) {
        return addMiddlewares(...middlewares)(createStore)({reducer, preloadedState})
    }
    return new Store(reducer, preloadedState)
}

export default createStore;