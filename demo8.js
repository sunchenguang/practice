var mergeAlternately = function (word1, word2) {
    let word1Arr = word1.split('');
    let word2Arr = word2.split('');
    let word1ArrLength = word1Arr.length;

    let insertIndex = 1;

    word2Arr.slice(0, word1ArrLength).forEach((elem) => {
        word1Arr.splice(insertIndex, 0, elem);
        insertIndex += 2;
    });

    let finalWordArr = word1Arr.concat(word2Arr.slice(word1ArrLength));


    return finalWordArr.join('')
};


var mergeAlternately = function (word1, word2) {
    const len1 = word1.length;
    const len2 = word2.length;

    let i = 0, j = 0;
    let result = [];

    while (i < len1 || j < len2) {
        if (i < len1) {
            result.push(word1[i])
            i++
        }

        if (j < len2) {
            result.push(word2[j])
            j++
        }
    }

    return result.join('')


}


/**
 * 求字符串的最大公约数，刚好能整除的
 * @param str1
 * @param str2
 */
var gcdOfStrings = function (str1, str2) {
    let len1 = str1.length;
    let len2 = str2.length;
    let shortStr = len2 <= len1 ? str2 : str1;
    let i = shortStr.length;

    function check(subStr, str) {
        let num = (str.length) / (subStr.length);

        return subStr.repeat(parseInt(num)) === str;
    }


    for (; i >= 1; --i) {
        if (len1 % i === 0 && len2 % i === 0) {
            let subString = shortStr.slice(0, i);

            if (check(subString, str1) && check(subString, str2)) {
                return subString;
            }
        }

    }


    return ''

};


// console.log(gcdOfStrings('ABABABAB', 'ABAB'))

function bigNumberSum(a, b) {
// '123456789'
// '9876'
    const maxLength = Math.max(a.length, b.length);

    a = a.padStart(maxLength, '0');
    b = b.padStart(maxLength, '0');

    let needPlusOne = false;
    let resultArr = [];

    for (let i = maxLength - 1; i >= 0; i--) {
        let aItem = a[i];
        let bItem = b[i];
        const plusResult = Number(aItem) + Number(bItem) + (needPlusOne ? 1 : 0);

        resultArr.unshift(String(plusResult).slice(-1));

        needPlusOne = plusResult >= 10;
    }

    if (needPlusOne) {
        resultArr.unshift(1)
    }

    return resultArr.join('')
}


// console.log(bigNumberSum('123456789', '9876'))


Function.prototype.myBind = function (ctx, ...args) {
    return (...otherArgs) => {
        return this.call(ctx, ...args, ...otherArgs)

    }
}
// test
// const a = {
//     name: "name of a"
// };
//
// function test(...msg) {
//     console.log(this.name);
//     console.log(...msg);
// }
//
// const t = test.myBind(a, "hello");
// t("world");
//
// function curry(fn) {
//     const ctx = this;
//     function inner(...args) {
//         if (args.length === fn.length) return fn.call(ctx, ...args);
//         return (...innerArgs) => inner.call(ctx, ...args, ...innerArgs);
//     }
//
//     return inner;
// }

function curry(fn) {
    return function curryFn(...args) {
        if (args.length === fn.length) {
            return fn.apply(this, args)
        } else {
            return function (...otherArgs) {
                return curryFn.apply(this, args.concat(otherArgs))
            }
        }
    }
}

// test
// function test(a, b, c) {
//     console.log(a, b, c);
// }
//
// const f1 = curry(test)(1);
// const f2 = f1(2);
// f2(3);
function compose(...fns) {
    return fns.reduce((aFn, bFn) => {
        return (...args) => {
            return aFn(bFn(...args))
        }
    })
}

function a(msg) {
    return msg + "a";
}

function b(msg) {
    return msg + "b";
}

function c(msg) {
    return msg + "c";
}

const f = compose(
    a,
    b,
    c
);
// console.log(f("hello"));

// function compose(...fns) {
//     return fns.reduceRight((aFn, bFn) => {
//         return (...args) => {
//             return bFn(aFn(...args))
//         }
//     })
// }

function find(nums, target) {
    let start = 0
    let end = nums.length - 1;


    while (start <= end) {
        const mid = start + parseInt((end - start) / 2);
        if (nums[mid] === target) {
            return mid
        }

        if (nums[mid] >= nums[start]) {
            if (target >= nums[start] && target < nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }


        } else {
            if (target > nums[mid] && target <= nums[end]) {
                start = mid + 1
            } else {
                end = mid - 1
            }

        }


    }

    return -1;
}

function isObject(obj) {
    return typeof obj === 'object' && obj !== null
}


function deepClone(obj) {
    if (!isObject(obj)) {
        return obj
    }

    let newObj = Array.isArray(obj) ? [] : {};

    Reflect.ownKeys(obj).forEach((key) => {
        newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })


    return newObj

}


function extend(A, B) {
    function F() {

    }

    F.prototype = B;

    A.prototype = new F();

    A.prototype.constructor = A;

}

function flatten(arr, depth) {

    let result = [];
    let arrCopy = arr.slice()


    if (!Array.isArray(arr)) {
        return arr
    }

    if (depth <= 0) {
        return arr
    }


    // while (arrCopy.length) {
    //     let item = arrCopy.shift();
    //     if (Array.isArray(item)) {
    //         arrCopy.unshift(...item)
    //     } else {
    //         result.push(item)
    //     }
    // }

    arr.forEach((item) => {
        result = result.concat(Array.isArray(item) ? flatten(item, depth - 1) : item)
    })


    return result
}

// var a = flatten([1, 2, [3, [4, 5, [6, [7, 8]]]]], 2);

// console.log(a);

/**
 * const a = getUrlParams("a", "http://lucifer.ren?a=1&b=2&a=3");
 * const b = getUrlParams("b", "http://lucifer.ren?a=1&b=2&a=3");
 * const c = getUrlParams("c", "http://lucifer.ren?a=1&b=2&a=3");
 * @param key
 * @param href
 */
function getUrlParams(key, href) {
    let hash = href.split('?')[1];

    let resultArr = [];

    hash.split('&').forEach((item) => {
        const itemArr = item.split('=')

        if (itemArr[0] === key) {
            resultArr.push(itemArr[1])
        }
    })

    if (resultArr.length === 0) {
        return ''
    }

    if (resultArr.length === 1) {
        return resultArr[0]
    }

    return resultArr

}

var a = getUrlParams("a", "http://lucifer.ren?a=1&b=2&a=3");
var b = getUrlParams("b", "http://lucifer.ren?a=1&b=2&a=3");
var c = getUrlParams("c", "http://lucifer.ren?a=1&b=2&a=3");

// console.log(a);
// console.log(b);
// console.log(c);


/**
 * const a = implementMapUsingReduce([1, 2, 3, 4], a => a + 1); // [2,3,4,5]
 * console.log(a);
 * @param list
 * @param func
 */
function implementMapUsingReduce(list, func) {
    return list.reduce((acc, item, index) => {
        acc.push(func(item))
        // acc[index] = func(item)
        return acc
    }, [])
}

function lensProp(lens, obj) {
    let keys = lens.split('.');

    return keys.reduce((acc, key) => {
        if (acc !== undefined) {
            return acc[key]
        }

        return acc

    }, obj)
}

var a = lensProp("a", {a: 1}); // 1
var b = lensProp("b", {a: 1}); // undefined
var c = lensProp("a.b", {a: {b: "c"}}); // c
var d = lensProp("a.b.c.d.e.f", {a: {b: "c"}}); // undefined

// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);


function longestCommonSequence(s1, s2) {
    let s1Arr = s1.split('')
    let s2Arr = s2.split('')
    let resultArr = [];

    s1Arr.forEach((item) => {
        let index = s2Arr.indexOf(item);
        if (index > -1) {
            resultArr.push(item);

            s2Arr.splice(index, 1);
        }
    })

    return resultArr.join('')

}

// console.log(longestCommonSequence("fosh", "fish"))
// console.log(longestCommonSequence("fish", "hish"))
// console.log(longestCommonSequence("lucider", "lucifer"))
// console.log(longestCommonSequence("hahaui", "hfui"))
// console.log(longestCommonSequence("sasa", "fgdfrsa"))


function longestCommonSubstring(s1, s2) {
    let shortStr = s1.length <= s2.length ? s1 : s2;
    let longStr = s1.length > s2.length ? s1 : s2;
    const shortStrLength = shortStr.length;
    let commonSubString = '';


    for (let i = 0; i < shortStrLength - 1; i++) {
        for (let j = i + 1; j < shortStrLength; j++) {
            let subString = shortStr.slice(i, j + 1);
            if (longStr.indexOf(subString) > -1 && subString.length > commonSubString.length) {
                commonSubString = subString
            }
        }
    }


    return commonSubString

}

// console.log(longestCommonSubstring("hish", "fish"))
// console.log(longestCommonSubstring("fish", "hish"))
// console.log(longestCommonSubstring("lucider", "lucifer"))
// console.log(longestCommonSubstring("sasa", "fgdfrsa"))
// console.log(longestCommonSubstring("hulatang", "ata"))


/**
 * 千分位展示
 * @param num
 */
// 123456789
// 123,456,789
function moneyFormat(num) {
    let numStr = String(num);
    let [leftStr, rightStr] = numStr.split('.')

    let leftStrLength = leftStr.length;
    let strArr = [];
    let counter = 0;

    for (let i = leftStrLength - 1; i >= 0; i--) {
        strArr.unshift(leftStr[i]);
        counter++;
        if (counter % 3 === 0 && i !== 0) {
            strArr.unshift(',')
        }
    }

    const leftStrNew = strArr.join('')

    if (rightStr) {
        return leftStrNew + '.' + rightStr
    }

    return leftStrNew

}


// console.log(moneyFormat("123456789"));
// console.log(moneyFormat("1234567890"));
//
// console.log(moneyFormat("123456789.0002"));
// console.log(moneyFormat("1234567890.999"));

function sum(list) {
    return list.reduce((acc, cur) => acc + cur, 0);
}

function backtrack(list, res, tempList, T, start) {
    // 如果不限定每个数字只能使用一次, 下面增加一行代码 if (tempList.length > list.length) return;
    if (sum(tempList) === T) return res.push([...tempList]);

    for (let i = start; i < list.length; i++) {
        tempList.push(list[i]);
        // 如果不限定每个数字只能使用一次, 下面代码改为backtrack(list, res, tempList, T, i);
        backtrack(list, res, tempList, T, i + 1);
        tempList.pop();
    }
}

// 从一个无序，不相等的数组中，选取N个数，使其和为M实现算法
function nSum(list, T) {
    const res = [];
    backtrack(list, res, [], T, 0);
    return res;
}

// test
// const r = nSum([1, 3, 6, 4, 2, 7], 7);
// console.log(r);


function findNumbers(arr, M) {
    const result = [];

    function backtrack(start, currentCombination, currentSum) {
        if (currentSum === M) {
            result.push([...currentCombination]);
            return;
        }

        if (currentSum > M) {
            return;
        }

        for (let i = start; i < arr.length; i++) {
            const newSum = currentSum + arr[i];
            currentCombination.push(arr[i]);
            backtrack(i + 1, currentCombination, newSum);
            currentCombination.pop();
        }
    }

    backtrack(0, [], 0);
    return result;
}

// 示例用法
const arr = [1, 2, 3, 4, 5, 6];
const M = 9;
const combinations = findNumbers(arr, M);
console.log(combinations);



// function helper(list) {
//     if (list.length <= 1) return list;
//     // 空间复杂度 nlogn
//     const bigger = [];
//     const smaller = [];
//     const pivotIndex = Math.floor(Math.random() * list.length);
//     const pivot = list[pivotIndex];
//     // 时间复杂度O(nlogn)
//     for (let i = 0; i < list.length; i++) {
//         const number = list[i];
//         if (i === pivotIndex) continue;
//         if (number >= pivot) {
//             bigger.push(number);
//         } else {
//             smaller.push(number);
//         }
//     }
//     return helper(smaller)
//         .concat([pivot])
//         .concat(helper(bigger));
// }
// function quickSort(list) {
//     return helper(list);
// }

function quickSort(list) {
    if (list.length <= 1) {
        return list
    }

    const pivotIndex = Math.floor(list.length / 2);
    let pivot = list.splice(pivotIndex, 1)[0];
    let smallArr = [], bigArr = [];


    list.forEach((item, index) => {
        if (item <= pivot) {
            smallArr.push(item)
        } else {
            bigArr.push(item)
        }
    })


    return quickSort(smallArr).concat(pivot).concat(quickSort(bigArr))

}


// test

const l = quickSort([1, 3, 2, 9, 6, 5, 1, 0, -2, 10]);

// console.log(l);

/**
 * // const repeatFunc = repeat(console.log, 4, 3000);
 * // repeatFunc("hellworld"); //会打印4次 helloworld，每次间隔3秒
 *
 * const repeatFunc = repeat(console.log, 4, 3000, true);
 * repeatFunc("hellworld"); //先立即打印一个hellworld，然后每个三秒打印三个hellworld
 */
function repeat(func, times, ms, immediate) {
    let counter = 0;


    return function doFunc(...args) {
        counter++;

        if (counter > times) {
            return;
        }

        if (immediate && counter === 1) {
            func.apply(this, args)
            doFunc(...args)
            return;
        }

        setTimeout(() => {
            func.apply(this, args)
            doFunc(...args)
        }, ms)
    }

}

const repeatFunc = repeat(console.log, 4, 3000, true);

// repeatFunc("hellworld");


function reverseString(str) {
    return str.split('').reverse().join('')
}


// console.log(reverseString("abc"));
// console.log(reverseString("abca"));
// console.log(reverseString("8cchds7"));


function uniqueArr(list) {
    list.sort();

    let slowP = 0;
    let size = list.length;

    for (let fastP = 0; fastP < size; fastP++) {
        if (list[slowP] !== list[fastP]) {
            slowP++;
            list[slowP] = list[fastP]
        }
    }


    return list.slice(0, slowP + 1)
}


function isSequence(a, b) {
    let i = 0, j = 0

    while (i < a.length && j < b.length) {
        if (a[i] === b[j]) {
            i++
        }

        j++

    }

    return i === a.length
}

function render(tpl, data) {

    return tpl.replace(/\{\{(.+?)\}\}/g, ($1, $2) => {
        return data[$2]
    })

}

// console.log(
//     render("我是{{name}}，年龄{{age}}", {
//         name: "lucifer",
//         age: 17
//     }));

// const a = {
//     b: 1
// };
//
// function b() {
//     console.log("a的值发生改变");
// }
//
// bindData();
// // 此时输出 a的值发生改变
// a.b = 2;
//
// console.log(a.b);
//
// function bindData() {
//     Object.keys(a).forEach((key) => {
//         let value = a[key]
//         Object.defineProperty(a, key, {
//             get() {
//
//                 return value
//             },
//
//             set(newValue) {
//                 value = newValue
//                 b()
//             }
//         })
//     })
// }


function numFormat(str) {
    return str.replace(/\D/g, '');
}

// console.log(numFormat('¥1,231'))

// 123450
function numToChinese(num) {
    const numStr = String(num);
    const numMapper = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
    ];

    const unitMapper = [, , "十", "百", "千", "万"];

    let res = "";

    for (let i = 0; i < numStr.length; i++) {
        const chNum =
            numStr[i] === "0" && res[res.length - 1] === "零"
                ? ""
                : numMapper[numStr[i]];
        const unit = numStr[i] === "0" ? "" : unitMapper[numStr.length - i] || "";
        res = res + chNum + unit;
    }

    return res[res.length - 1] === "零" ? res.slice(0, -1) : res;
}


function fn(id, list) {
    const match = list.find(item => item.id === id);
    if (match) return [id];
    const sub = list.find(item => id.startsWith(item.id));
    return [sub.id].concat(fn(id, sub.children));
}

function getAllHTMLTags() {
    const tags = [...window.document.querySelectorAll("*")].map(
        dom => dom.tagName
    );
    return [...new Set(tags)];
}


function helper(node, path) {
    if (node === document.body) return `body > ${path}`;

    const i = Array.prototype.findIndex.call(node.parentNode.children, el => el === node)
    return helper(node.parentNode, `${node.tagName.toLowerCase()}[${i}]${path ? ' > ' + path : ''}`);
}

function XPath(node) {
    return helper(node, '');
}


console.log(
    XPath(document.querySelector('.column3'))
)

function dfs(A, start, d) {
    if (start + 1 >= A.length) return;
    const [depth, v] = [A[start], A[start + 1]];
    if (d[depth - 1] == void 0) {
        d[depth - 1] = {};
    }
    let next = {};
    if (
        start + 2 >= A.length ||
        (start + 2 < A.length && A[start + 2] < A[start])
    )
        next = null;
    d[depth - 1][v] = next;
    d[depth] = next;
    dfs(A, start + 2, d);
}

function deserialization(A) {
    const d = {};
    dfs(A, 0, d);
    return d[-1];
}

deserialization([0, "a", 1, "b", 2, "c", 3, "e", 2, "d", 1, "x", 0, "ff"]);


// 不能分割出两个独立的、长度大于
// 2
// 2 的连续子串，使得这两个子串完全相同；更具体地，如果存在两个长度大于
// 2
// 2 的独立子串
// Abc9Abc1
function checkSubString(s) {
    if (s.length < 4) {
        return false
    }

    let sLength = s.length;
    let maxSubStringLength = Math.floor(s.length / 2);
    let minSubStringLength = 3;

    for (let i = minSubStringLength; i <= maxSubStringLength; i++) {
        for (let j = 0; j <= sLength - 2 * i; j++) {
            const subString = s.slice(j, j + i);
            console.log('subString === ', subString)
            let firstIndex = s.indexOf(subString);
            let lastIndex = s.lastIndexOf(subString)

            if (firstIndex !== lastIndex && lastIndex - firstIndex >= i) {
                return true;
            }
        }


    }

    return false
}

// let str = 'Abc9Abc1';
let str = 'Abc1111wwww';
console.log(checkSubString(str))




const [n ,m] = readline().split(' ').map(Number)
const matrix = []
while(line = readline()) {
    matrix.push(line.split(' ').map(Number))
}
// 定义四个方向
const dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]]

function findPath(matrix) {
    const dfs = (matrix, x, y) => {
        let pathList = []
        // 查找到目标点开始回溯
        if (x === n - 1 && y === m - 1) {
            return [[x, y]]
        }
        // 每次查找后将值置为1
        matrix[x][y] = 1
        for(const [dx, dy] of dirs) {
            const row = x + dx
            const col = y + dy
            // 索引越界跳过
            if(row < 0 || row >= n || col < 0 || col >= m) continue
            // 值为墙跳过
            if (matrix[row][col] === 1) continue
            pathList = dfs(matrix, row, col)
            // 长度不为0表示已经查找到终点，将终点的上一个回溯点入队
            if (pathList.length !== 0) {
                pathList.unshift([x, y])
                return pathList
            }
        }
        return pathList
    }
    return dfs(matrix, 0, 0)

}

const pathList = findPath(matrix)
pathList.forEach(([x,y]) => {
    console.log(`(${x},${y})`)
})

