function compose(...funcs) {
    if (funcs.length == 0) {
        return (arg) => arg
    }
    if (funcs.length == 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b, i) => {
        return (...args) => a(b(...args))
    })
}

export default compose;