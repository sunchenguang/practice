function arrayDuplicateRemove(arr) {
    if(!Array.isArray(arr)) {
        return arr
    }

    let newArr = [];
    for (const item of arr) {
        if(newArr.indexOf(item) === -1) {
            newArr.push(item)
        }
    }

    return newArr;
}
