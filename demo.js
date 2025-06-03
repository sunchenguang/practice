console.log('hello')


function uniqNum(numArr) {
    for (let num of numArr) {
        let firstIndex = numArr.indexOf(num);
        let lastIndex = numArr.lastIndexOf(num);

        if (firstIndex === lastIndex) {
            return num
        }
    }
    return -1;
}


// console.log(uniqNum([2, 2, 1]))
// console.log(uniqNum([4, 1, 2, 1, 2]))


function rotateArr(numArr, k) {
    let copyArr = numArr.slice();
    let rightArr = copyArr.splice(numArr.length - k);
    copyArr.unshift(...rightArr);
    return copyArr;
}

// console.log(rotateArr([1, 2, 3, 4, 5, 6, 7], 3));
// console.log(rotateArr([-1, -100, 3, 99], 2));


/**
 * 打印矩阵
 * @param arr
 */
function printMatrix(arr) {
    let rows = arr.length
    let columns = arr[0].length

    let circleNumber = Math.ceil(Math.min(rows, columns) / 2)

    let start = 0
    while (start < circleNumber) {
        printMatrixCircle(arr, rows, columns, start)
        start++
    }
}

/**
 * 打印矩阵以(start, start)作为左上角的一圈
 * @param arr
 * @param rows
 * @param columns
 * @param start
 */
function printMatrixCircle(arr, rows, columns, start) {
    let endX = columns - 1 - start
    let endY = rows - 1 - start

    //从左到右打印一行
    for (let i = start; i <= endX; i++) {
        console.log(arr[start][i])
    }
    //从右上到右下打印一行
    if (endY > start) {
        for (let i = start + 1; i <= endY; i++) {
            console.log(arr[i][endX])
        }
    }
    //从右下到左下打印一行
    if (endX > start && endY > start) {
        for (let i = endX - 1; i >= start; i--) {
            console.log(arr[endY][i])
        }
    }

    //从左下到左上打印一行
    if (endY > start + 1 && endX > start) {
        for (let i = endY - 1; i >= start + 1; i--) {
            console.log(arr[i][start])
        }
    }

}

let arr1 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]

// printMatrix(arr1)


function printMatrixClockwise(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return [];
    }

    let rows = matrix.length;
    let cols = matrix[0].length;
    let result = [];

    let left = 0, right = cols - 1, top = 0, bottom = rows - 1;

    while (left <= right && top <= bottom) {
        // 从左到右打印顶部一行
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;

        // 从上到下打印右侧一列
        if (top <= bottom) {
            for (let i = top; i <= bottom; i++) {
                result.push(matrix[i][right]);
            }
            right--;
        }

        // 从右到左打印底部一行
        if (top <= bottom && left <= right) {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
            }
            bottom--;
        }

        // 从下到上打印左侧一列
        if (left <= right && top <= bottom) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }

    return result;
}

// 示例用法
let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// console.log(printMatrixClockwise(matrix));


function getNumberOfK(arr, k) {
    let index = arr.indexOf(k);
    let lastIndex = arr.lastIndexOf(k);

    if (index === -1 && lastIndex === -1) {
        return 0;
    }

    return lastIndex - index + 1;
}

let arr = [1, 2, 3, 3, 3, 3, 3, 3, 4, 5];
let k = 3;
// console.log(getNumberOfK(arr, k))

(function () {
    var person = {
        firstName: 'Jimmy',
        lastName: 'Smith'
    };
    Object.defineProperty(person, 'fullName', {
        get: function () {
            return this.firstName + ' ' + this.lastName;
        },
        set: function (name) {
            var words = name.split(' ');
            this.firstName = words[0] || '';
            this.lastName = words[1] || '';
        }
    });

    console.log(person.fullName);

})();









