export default function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    return (...args) => rest.reduceRight(
        (composed, f) => f(composed),
        last(...args)
    )
}


function compose2(...funcs) {
    const lastFunc = funcs[funcs.length - 1];
    const restFunc = funcs.slice(0, -1)

    return (...args) => {
        return restFunc.reduceRight(
            (totalValue, func) => {
                return func(totalValue)
            },
            lastFunc(...args))
    }

}

function compose3(...funcs) {

    return funcs.reduce((aFunc, bFunc) => {
        return (...args) => {
            return aFunc(bFunc(...args))
        }
    })

}
