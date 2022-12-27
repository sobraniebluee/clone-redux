import {AnyAction, Reducer} from "./utils/types";


type ReturnCombineReducer = (state: undefined | object, action: AnyAction) => object
type Reducers = { [key in string]: Reducer }

function combineReducers(reducers: Reducers): ReturnCombineReducer {
    return (state, action) => {
        return Object.entries(reducers).reduce((accum, [key, func]) => {
            const reducerState = state ? state[key] : undefined;
            return {
                ...accum,
                [key]: func(reducerState, action)
            }
        }, {});
    }
}

export default combineReducers;