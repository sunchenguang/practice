function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}

function deepClone4(obj) {
    if (!isObject(obj)) {
        return obj;
    }


    let newObj = Array.isArray(obj) ? [] : {};


    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = isObject(obj[key]) ? deepClone4(obj[key]) : obj[key]
        }
    }

    // Reflect.ownKeys(obj).forEach((key) => {
    //     newObj[key] = isObject(obj[key]) ? deepClone4(obj[key]) : obj[key]
    // })


    return newObj;
}


//测试
let obj = {
    a: [1, 2, 3],
    b: {
        c: 2,
        d: 3
    }
}
let newObj = deepClone4(obj)


console.log(newObj)
