

function getNumArr(num) {
    return num.toString().split('');
}

function getTwoNumArr(num1Arr, num2Arr) {
    const result = [];
    for (let i = 0; i < num1Arr.length; i++) {
        for (let j = 0; j < num2Arr.length; j++) {
            result.push(num1Arr[i] + num2Arr[j]);
        }
    }
    return result;
}

function checkIsEven(num) {
    return num.split('').reduce((acc, curr) => acc + Number(curr), 0) % 2 === 0;
}


/**
 * 例如对于[123, 456, 789]，14个符合条件的数为：147 149 158 167 169 248 257 259 268 347 349 358 367 369。
 * @param {*} numbers 
 * @returns 
 */
function solution(numbers, needPureArr = false) {

    if (numbers.length === 1) {
        const numArr = getNumArr(numbers[0]);
        const items = numArr.filter(checkIsEven);
        return needPureArr ? items : items.length;
    } else if (numbers.length === 2) {
        const numArr = getNumArr(numbers[0]);
        const numArr2 = getNumArr(numbers[1]);
        const twoNumArr = getTwoNumArr(numArr, numArr2);
        const items = twoNumArr.filter(checkIsEven);
        return needPureArr ? items : items.length;
    } else {
        const numArr = getNumArr(numbers[0]);
        const numArr2 = getTwoNumArr(getNumArr(numbers[1]), getNumArr(numbers[2]));

        console.log('numArr', numArr);
        console.log('numArr2', numArr2);
        const twoNumArr = getTwoNumArr(numArr, numArr2);

        console.log('twoNumArr', twoNumArr);
        const items = twoNumArr.filter(checkIsEven);

        console.log('items', items);
        return needPureArr ? items : items.length;
    }
}

function main() {
    // You can add more test cases here
    console.log(solution([123, 456, 789]) === 14);
    console.log(solution(['123456789']));
    console.log(solution([14329, 7568]));
}

main();