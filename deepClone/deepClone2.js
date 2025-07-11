function isObject(obj) {
    return typeof obj === 'object' && obj != null;
}

function cloneDeep4(source, hash = new WeakMap()) {

    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source);

    let target = Array.isArray(source) ? [] : {};
    hash.set(source, target);

    Reflect.ownKeys(source).forEach(key => { // 改动
        target[key] = isObject(source[key]) ? cloneDeep4(source[key], hash) : source[key];
    });
    return target;
}
