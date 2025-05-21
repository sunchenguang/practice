function map(arr, func, ctx) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        let value = func.call(ctx, arr[i], i, arr)
        newArr.push(value)
    }

    return newArr
}
