# Clone-redux
<p>Redux clone, Pattern observable</p>


## Usage
```js
import {createStore} from "credux";

// Define initial state
const initialState = {
    num: 0
}

// Create simple reducer, such as in redux reducers
// Notice: You must pass to first param initial state

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {...state, num: state.num + 1}
        case "DECREMENT":
            return {...state, num: state.num - 1}
        default:
            return state
    }
}
// Custom middleware 

function customMiddleware({getState, dispatch}) {
    return function (next) {
        return function (action) {
            if (action.type === "INCREMENT") {
                dispatch({type: "DECREMENT"})
            }
            next(action)
        }
    }
}


// Create store
const store = createStore({
    reducer: rootReducer,
    middlewares: [customMiddleware]
})

// Subscribe, .subscribe(listenr) method return unsubscribe function
let unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

// Dispatch action
store.dispatch({type: "INCREMENT"})

// Call unsubscribe function
unsubscribe()

```
