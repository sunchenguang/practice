function shuffle(arr) {
    let copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

// console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));


function bigNumberSum(str1, str2) {
    let maxLength = Math.max(str1.length, str2.length);

    let arr1 = str1.split('').map(Number).reverse();
    let arr2 = str2.split('').map(Number).reverse();

    let carry = 0;
    let result = [];

    for (let i = 0; i < maxLength; i++) {
        let sum = (arr1[i] || 0) + (arr2[i] || 0) + carry;
        carry = Math.floor(sum / 10);
        result.push(sum % 10);
    }

    if (carry) {
        result.push(carry);
    }

    return result.reverse().join('');

}

// console.log(bigNumberSum('62345', '45678'));



let PENDING = 'pending';
let FULFILLED = 'fulfilled';
let REJECTED = 'rejected';

function MyPromise(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
            this.onFulfilledCallbacks.forEach(cb => cb());
        }
    }

    const reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
            this.onRejectedCallbacks.forEach(cb => cb());
        }
    }


    try {
        fn.call(this, resolve, reject);
    } catch (error) {
        reject(error);
    }

}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };

    return new MyPromise((resolve, reject) => {
        const handleFulfilled = (value) => {
            setTimeout(() => {
                try {
                    let newValue = onFulfilled(value);
                    resolve(newValue);
                } catch (error) {
                    reject(error);
                }
            }, 0)
        }

        const handleRejected = (reason) => {
            setTimeout(() => {
                try {
                    let newValue = onRejected(reason);
                    resolve(newValue);
                } catch (error) {
                    reject(error);
                }
            }, 0)
        }

        if (this.status === PENDING) {
            this.onFulfilledCallbacks.push(() => {
                handleFulfilled(this.value);
            });
            this.onRejectedCallbacks.push(() => {
                handleRejected(this.reason);
            });
        } else if (this.status === FULFILLED) {
            handleFulfilled(this.value);
        } else {
            handleRejected(this.reason);
        }
    })
}

MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}

MyPromise.prototype.finally = function (callback) {
    return this.then(callback, callback);
}


MyPromise.prototype.all = function (promises) {
    return new MyPromise((resolve, reject) => {
        let results = [];
        let count = 0;
        promises.forEach((promise, index) => {
            promise.then(value => {
                results[index] = value;
                count++;
                if (count === promises.length) {
                    resolve(results);
                }
            }).catch(reject);
        })
    })
}

MyPromise.prototype.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        promises.forEach(promise => {
            promise.then(resolve).catch(reject);
        })
    })
}


MyPromise.prototype.cancel = function () {
    this.status = REJECTED;
    this.reason = 'cancelled';
}

MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => {
        resolve(value);
    })
}

MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => {
        reject(reason);
    })
}

// const p1 = new MyPromise(resolve => {
//     // resolve('resolved===');

//     setTimeout(() => {
//         resolve('resolved===');
//     }, 3000)
// })
// p1.then(console.log).then((...args) => console.log("second", ...args));




function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    let newObj = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }

    return newObj;
}

function fetchUrls(urls, max, callback) {
    let index = 0;
    let completed = 0;
    const results = [];


    function fetchNext() {
        if (index >= urls.length) {
            return;
        }
        const currentIndex = index++;
        const url = urls[currentIndex];

        fetch(url)
            .then(response => response.json())
            .then(data => {
                results[currentIndex] = data;
            }).catch(error => {
                results[currentIndex] = error;
            }).finally(() => {
                completed++;
                if (completed === urls.length) {
                    callback(results);
                } else {
                    fetchNext();
                }
            })

    }

    for (let i = 0; i < max; i++) {
        fetchNext();
    }
}

// 示例使用
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3',
    'https://jsonplaceholder.typicode.com/todos/4',
    'https://jsonplaceholder.typicode.com/todos/5'
];
const max = 2;
const callback = (results) => {
    console.log('所有请求完成:', results);
};

// fetchUrls(urls, max, callback);


/**
 * 交换数字的任意两位，返回可能的最大数字
 * @param {*} num 
 */
function maximumSwap(num) {
    let arr = num.toString().split('');
    let maxNum = num;


    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                let newNum = parseInt(arr.join(''), 10);
                maxNum = Math.max(maxNum, newNum);
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }

    return maxNum;
}

// console.log(maximumSwap(5739));

function flatArray(arr) {
    return arr.flat(Infinity);
}

// console.log(flatArray([1, 2, 3, [4, 5, 6, [7, 8, 9]]]));


function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let count = 0;
        promises.forEach((promise, index) => {
            promise.then(value => {
                results[index] = value;
                count++;
                if (count === promises.length) {
                    resolve(results);
                }
            }).catch(reject);
        })
    })
}


function findNumberOfOccurrences(arr, target) {
    let index = arr.indexOf(target);
    let lastIndex = arr.lastIndexOf(target);
    if (index === -1) {
        return 0;
    }
    return lastIndex - index + 1;
}

// console.log(findNumberOfOccurrences([1, 1, 3, 4, 5, 6, 7, 8, 9, 10], 1));

/**
 * 获取时针和分针的角度 12:30  1:30
 * @param {string} time 
 */
function getHourAndMinuteAngle(time) {
    let [hour, minute] = time.split(':').map(Number);
    let hourAngle = (hour % 12) * 30 + minute * 0.5;
    let minuteAngle = minute * 6;
    return Math.abs(hourAngle - minuteAngle);
}

// console.log(getHourAndMinuteAngle('1:30'));


function curry(fn) {
    let fnLength = fn.length;

    return function curried(...args) {
        if (args.length >= fnLength) {
            return fn.apply(this, args);
        }
        return curried.bind(this, ...args);
    }
}

function add(a, b, c) {
    return a + b + c;
}

let curriedAdd = curry(add);

// console.log(curriedAdd(1, 2)(3));
// async function async1 () {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
// } 

// async function async2 () {
//     console.log('async2');
// }

// console.log('script start');

// setTimeout(function () {
//     console.log('setTimeout');
// }, 0);

// new Promise(function (resolve) {
//     console.log('promise1');
//     resolve();
// }).then(function () {
//     console.log('promise2');
// });

// async1();

// console.log('script end');



function repeat(func, times, wait, immediate) {
    return function (...args) {
        for (let i = 0; i < times; i++) {
            if (immediate) {
                func.apply(this, args);
            } else {
                setTimeout(() => {
                    func.apply(this, args);
                }, i * wait);
            }
        }
    }
}

const repeatFunc = repeat(console.log, 4, 3000)
repeatFunc('hello')



function throttle(func, wait) {
    let inThrottle = false;
    return function (...args) {
        if (!inThrottle) {
            inThrottle = true;
            func.apply(this, args);
            setTimeout(() => {
                inThrottle = false;
            }, wait);
        }
    }
}

class Dialog {
    constructor(options) {
        this.options = options;
        this.overlay = null;
        this.modal = null;
    }

    open() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');

        this.modal = document.createElement('div');
        this.modal.classList.add('modal');

        this.modal.innerHTML = this.options.content;


        this.overlay.addEventListener('click', () => {
            this.close();
        });

        this.modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);
    }

    close() {
        if (this.overlay) {
            document.body.removeChild(this.overlay);
            this.overlay = null;
            this.modal = null;
        }
    }
}












