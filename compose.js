function compose(...funcs) {
    console.log('---funcs', funcs)
    if (funcs.length === 0) return

    if (funcs.length === 1) return funcs[0]

    return funcs.reduce(
        (aFunc, bFunc) =>
            (...args) =>
                aFunc(bFunc(...args))
    )


    // return funcs.reduceRight((aFunc, bFunc) => {
    //     return (...args) => {
    //         return bFunc(aFunc(...args))
    //     }
    // })
}

function add(num) {
    return num + 2
}

function sub(num) {
    return num - 1
}

function square(num) {
    return num ** 2
}

function cube(num) {
    return num ** 3
}

const res1 = add(sub(square(cube(2))))
const res2 = compose(add, sub, square, cube)(2)

console.log('---res1', res1)
console.log('---res2', res2)



