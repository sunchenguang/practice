function reduce(arr, callbackFunc, initValue) {
    let hasInitValue = typeof initValue !== 'undefined';
    let totalValue = hasInitValue ? initValue : arr[0];

    for (let i = hasInitValue ? 0 : 1; i < arr.length; i++) {
        totalValue = callbackFunc.call(
            this,
            totalValue,
            arr[i],
            i,
            arr
        )

    }
    return totalValue;
}


const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;

const sumWithInitial = reduce(
    array1,
    (accumulator, currentValue) => accumulator + currentValue
);

console.log(sumWithInitial);
