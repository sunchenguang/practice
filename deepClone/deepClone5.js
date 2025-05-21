function deepClone5(obj, hash = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    if (hash.has(obj)) {
        return hash.get(obj);
    }

    let newObj = Array.isArray(obj) ? [] : {};
    hash.set(obj, newObj);

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone5(obj[key], hash);
        }
    }

    return newObj;


}


function deepClone6(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    const root = Array.isArray(obj) ? [] : {};
    const stack = [
        {
            parent: root,
            key: undefined,
            data: obj
        }
    ];

    while (stack.length) {
        let node = stack.pop();
        let { parent, key, data } = node || {};
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = Array.isArray(data) ? [] : {};
        }

        for (let k in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[k] === 'object' && data[k] !== null) {
                    stack.push({
                        parent: res,
                        key: k,
                        data: data[k]
                    })
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;


}



















