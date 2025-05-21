function loadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            resolve(img);
        };
        img.onerror = (error) => {
            reject(error);
        };
        img.src = url;
    });
}


loadImage('').then((img) => {
    document.body.appendChild(img);
    console.log('Loaded image');
}).catch((err) => {
});


class PubSub {
    constructor() {
        this.subscribers = {};
    }

    subscribe(event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    }

    unsubscribe(event, callback) {
        if (this.subscribers[event]) {
            this.subscribers[event] = this.subscribers[event].filter((item) => {
                return item !== callback;
            });
        }
    }

    publish(event, data) {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach((item) => item(data));
        }
    }
}

// 使用示例
const pubsub = new PubSub();

const callback = data => console.log('Received data:', data);

// 订阅事件
pubsub.subscribe('myEvent', callback);

// 发布事件
pubsub.publish('myEvent', 'Hello, world!'); // 输出: Received data: Hello, world!

// 取消订阅事件
pubsub.unsubscribe('myEvent', callback);

// 再次发布事件，此时不会有输出，因为已经取消了订阅
pubsub.publish('myEvent', 'Hello again!');


async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        return data;
    } catch (e) {
        throw e;
    }
}

async function fetchAndUseData() {
    try {
        const url = '';
        const data = await fetchData(url);
        console.log(data);
    } catch (e) {


    }
}


fetchAndUseData();


class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    notify() {
        this.subs.forEach(sub => sub.update());
    }


}


class Watcher {
    constructor(vm, exp, cb) {
        this.cb = cb;
        this.vm = vm;
        this.exp = exp;
        this.value = this.get();

    }


    get() {
        Dep.target = this;
        let value = this.vm[this.exp];
        Dep.target = null;
        return value;
    }

    update() {
        let newValue = this.vm[this.exp];
        if (newValue !== this.value) {
            this.value = newValue;
            this.cb(newValue);
        }

    }

}


class Vue {
    constructor(data) {
        this.data = data;
        Object.keys(data).forEach(key => {
            this[key] = this._proxyData(key);
        });
        this._initWatch();
    }

    // 初始化watcher
    _initWatch() {
        this._watchers = [];
        let updateComponent = () => {
            console.log('组件更新');
        };
        Object.keys(this.data).forEach(key => {
            new Watcher(this, key, updateComponent);
        });
    }

    // 数据代理，用于实现双向绑定
    _proxyData(key) {
        let self = this;
        return new Proxy(this.data[key], {
            get(target, prop) {
                if (Dep.target) {
                    let dep = target.__dep__ || (target.__dep__ = new Dep());
                    dep.addSub(Dep.target);
                }
                return Reflect.get(target, prop);
            }, set(target, prop, value) {
                let result = Reflect.set(target, prop, value);
                let dep = target.__dep__;
                if (dep) {
                    dep.notify();
                }
                return result;
            }
        });
    }
}

// 使用示例
let vm = new Vue({
    data: {
        message: 'Hello, Vue!'
    }
});

// 在控制台输出message属性的变化
// vm.$watch('message', (newVal, oldVal) => {
//     console.log(`Message changed from ${oldVal} to ${newVal}`);
// });

// 修改message属性，视图和模型都会自动更新
vm.message = 'Hello, World!';


function fibo(n) {
    if (n <= 1) {
        return n;
    }

    return fibo(n - 1) + fibo(n - 2);
}

function fiboV2(n) {
    let arr = [0, 1];
    if (n <= 1) {
        return arr[n];
    }

    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }

    return arr[n];
}

console.log(fiboV2(2));
console.log(fiboV2(3));
console.log(fiboV2(4));
console.log(fiboV2(20));

function fiboV3(n) {
    if (n <= 1) {
        return n;
    }

    let pre = 0, current = 1;
    for (let i = 2; i <= n; i++) {
        let next = pre + current;
        pre = current;
        current = next;
    }

    return current;
}


function lengthOfLongestSubstring(s) {
    let start = 0;
    let maxLength = 0;
    let seen = new Set();

    for (let end = 0; end < s.length; end++) {
        while (seen.has(s[end])) {
            seen.delete(s[start]);
            start++;
        }

        seen.add(s[end]);

        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;

}

function lengthOfLongestSubstringV2(s) {
    let start = 0;
    let charIndexMap = {};
    let maxLength = 0;

    for (let end = 0; end < s.length; end++) {
        let currentChar = s[end];
        if (charIndexMap[currentChar] !== undefined && charIndexMap[currentChar] >= start) {
            start = charIndexMap[currentChar] + 1;
        }
        charIndexMap[currentChar] = end;
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}


// setInterval(() => {
//     console.log('hello');
// }, 1000);

function mySetInterval(handler, timeout, ...args) {

    let timer = setTimeout(() => {
        handler.apply(this, args);

        clearTimeout(timer);

        mySetInterval(handler, timeout, ...args);
    }, timeout);
}

// mySetInterval((arg) => console.log(arg + 'Hello, world!'), 1000, 'hello');


function twoSum(numsArr, target) {
    let numIndexMap = {};
    let result = [];
    for (let i = 0; i < numsArr.length; i++) {
        let item = numsArr[i];
        let complement = target - item;
        if (numIndexMap[complement] >= 0) {
            result.push({
                indexArr: [numIndexMap[complement], i], itemArr: [complement, item]
            });
        }

        numIndexMap[item] = i;
    }

    return result;
}

function twoSumV2(numsArr, target) {
    for (let i = 0; i < numsArr.length - 1; i++) {
        for (let j = i + 1; j < numsArr.length; j++) {
            if (numsArr[i] + numsArr[j] === target) {
                return [i, j];
            }
        }
    }

    return [];
}

function threeSum(numsArr, target) {
    let result = [];

    for (let i = 0; i < numsArr.length - 2; i++) {
        let numsArrCopy = numsArr.slice(i + 1);

        let complement = target - numsArr[i];
        let twoSumArr = (twoSum(numsArrCopy, complement) || []).map((item) => {
            return item.itemArr;
        });

        if (twoSumArr.length > 0) {
            twoSumArr.forEach((item) => {
                let itemArr = [numsArr[i]].concat(item).sort((a, b) => a - b);
                let itemArrString = itemArr.join("_");
                if (!result.includes(itemArrString)) {
                    result.push(itemArrString);
                }
            });
        }
    }

    return result.map((item) => {
        return item.split('_').map(Number);
    });


}

// 三数之和示例用法
const threeSumNums = [-1, 0, 1, 2, -1, -4];
const threeSumTarget = 0;
const threeSumResult = threeSum(threeSumNums, threeSumTarget);
console.log("三数之和结果:", threeSumResult);

function firstUniqChar(str) {
    let charArr = [];

    for (const char of str) {
        if (str.indexOf(char) === str.lastIndexOf(char)) {
            return char;
            // charArr.push(char);
        }
    }

    return '';
    // return charArr[0];
}


function permute(str) {
    let results = [];

    if (str.length === 1) {
        return str;
    }

    if (str.length === 2) {
        return [str, str.split('').reverse().join('')];
    }

    for (let i = 0; i < str.length; i++) {
        let firstItem = str[i];
        let otherStr = str.slice(0, i) + str.slice(i + 1);
        let arr = permute(otherStr);
        let newStrArr = arr.map((item) => {
            return firstItem + item;
        });
        results = results.concat(newStrArr);
    }

    return results;
}

console.log('permute === ', permute('abcd'));

function permuteString(str) {
    const result = [];

    function backtrace(path, used) {
        if (path.length === str.length) {
            result.push(path.join(''));
            return;
        }

        for (let i = 0; i < str.length; i++) {
            if (used[i]) {
                continue;
            }

            if (i > 0 && str[i] === str[i - 1] && !used[i - 1]) {
                continue;
            }

            used[i] = true;
            path.push(str[i]);
            backtrace(path, used);
            used[i] = false;
            path.pop();

        }


    }

    str.split('').sort().join('');
    backtrace([], []);
    return result;

}

function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }
    }

    return arr;
}

// 示例用法
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = bubbleSort(unsortedArray);
console.log("排序后的数组:", sortedArray);


function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }

    return arr;
}

// 示例用法
const unsortedArray1 = [64, 25, 12, 22, 11];
const sortedArray1 = selectionSort(unsortedArray1);
console.log("排序后的数组:", sortedArray1);

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let pivot = arr[0];
    let left = [], right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(pivot).concat(quickSort(right));
}


// 示例用法
const unsortedArray2 = [3, 6, 8, 10, 1, 2, 1];
const sortedArray2 = quickSort(unsortedArray2);
console.log("排序后的数组:", sortedArray2);

function buildTree(items, parentId = null) {
    let tree = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (item.id === parentId) {
            let children = buildTree(items, item.id);
            if (children.length > 0) {
                item.children = children;
            }
            tree.push(item);
        }
    }

    return tree;
}

function DFS(root) {
    if (root === null) {
        return;
    }

    console.log(root.value);

    for (const item of root.children) {
        DFS(item);
    }
}

function BFS(root) {
    if (root === null) {
        return;
    }

    let queue = [root];

    while (queue.length > 0) {
        let item = queue.shift();

        console.log(item.value);
        for (const child of item.children) {
            queue.push(child);
        }
    }


}


function findNodes(tree, predicate) {
    let result = [];

    function traverse(node) {
        if (predicate(node)) {
            result.push(node);
        }

        for (const child of node.children) {
            traverse(child);
        }
    }

    traverse(tree);

    return result;
}


function longestIncreasingSubsequence(arr) {
    let data = [];

    for (let i = 0; i < arr.length - 1; i++) {
        let result = [arr[i]];

        for (let j = i + 1; j < arr.length; j++) {
            let item = arr[j];
            if (item >= result[result.length - 1]) {
                result.push(item);
            }
        }


    }


}

let CreateSingleton = (function () {
    let instance;

    return function (name) {
        if (instance) {
            return instance;
        }

        this.name = name;
        instance = this;
        return instance;

    };
})();

CreateSingleton.prototype.getName = function () {
    console.log(this.name);
};


// function loadScript(src) {
//     return new Promise((resolve, reject) => {
//         let script = document.createElement('script');
//         script.src = src;
//         script.onload = resolve;
//         script.onerror = reject;
//         document.head.appendChild(script);
//     })
// }


// loadScript('your-js').then(() => {
//     console.log('demo')
// }).catch((err) => {
//     console.log('err: ', err);
// })


// import('./your-js').then((module) => {
//     console.log('module: ', module);
// }).catch((err) => {
//     console.log('err: ', err);
// })





















