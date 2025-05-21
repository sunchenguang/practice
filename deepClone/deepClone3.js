function deepClone(obj) {
    function isObject(o) {
        return (typeof o === 'object' || typeof o === 'function') && o !== null
    }

    if (!isObject(obj)) {
        throw new Error('非对象')
    }

    let isArray = Array.isArray(obj)
    let newObj = isArray ? [] : {}
    Reflect.ownKeys(obj).forEach(key => {
        newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })

    return newObj
}

//测试
let obj = {
    a: [1, 2, 3],
    b: {
        c: 2,
        d: 3
    }
}
let newObj = deepClone(obj)


console.log(newObj)
