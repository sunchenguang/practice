/**
 * 在 JavaScript 中，new 操作符用于创建一个用户自定义的对象类型的实例或具有构造函数的内置对象的实例。new 操作符执行以下步骤：
 *
 * 创建一个新的空对象。
 * 将这个新对象的内部原型__proto__链接到构造函数的 prototype 对象。 但使用 Object.create() 或 Object.setPrototypeOf() 是更推荐的方式来设置对象的原型。
 * 将这个新对象作为 this 上下文来执行构造函数。
 * 如果该构造函数没有返回其他对象，那么返回 this。
 *
 * @param constructor
 * @param args
 * @returns {*|{}}
 */
function myNew(constructor, ...args) {
    // let obj = {};
    // obj.__proto__ = constructor.prototype;
    let obj = Object.create(constructor.prototype);

    let result = constructor.call(obj, ...args);
    return result instanceof Object ? result : obj;
}


function curry(fn) {
    let fnLength = fn.length;


    return function innerCurry(...args) {
        if (args.length === fnLength) {
            return fn.apply(this, args);
        } else {
            return function (...args1) {
                return innerCurry.apply(this, args.concat(args1));
            };
        }
    };


}


function flattenArray(arr) {
    let result = [];

    arr.forEach(item => {
        result = result.concat(Array.isArray(item) ? flattenArray(item) : item);
    });

    return result;
}

function flattenArrayV2(arr) {
    let arrCopy = arr.slice();
    let result = [];

    while (arrCopy.length > 0) {
        let item = arrCopy.shift();
        if (Array.isArray(item)) {
            arrCopy.unshift(...item);
        } else {
            result.push(item);
        }
    }

    return result;

}

// let nestedArray = [1, [2, [3, [4]], 5]];
// console.log(nestedArray.flat(Infinity)); // 输出 [1, 2, 3, 4, 5]


function flattenArrayV3(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

let nestedArray = [1, [2, [3, [4]], 5]];
console.log(flattenArrayV3(nestedArray)); // 输出 [1, 2, 3, 4, 5]


function add(item) {
    let sum = item;

    function innerAdd(num) {
        sum += num;
        return innerAdd;
    }

    innerAdd.getResult = function () {
        return sum;
    };

    return innerAdd;
}

let result = add(1)(2)(3);
console.log(result.getResult()); // 输出 6


function buildTree(items, parentId = null) {
    let tree = [];

    for (const item of items) {
        if (item.parentId === parentId) {
            let children = buildTree(items, item.id);
            if (children.length > 0) {
                item.children = children;
            }
            tree.push(item);
        }
    }

    return tree;
}

const items = [{ id: 1, name: 'Item 1', parentId: null }, { id: 2, name: 'Item 1.1', parentId: 1 }, {
    id: 3, name: 'Item 1.2', parentId: 1
}, { id: 4, name: 'Item 2', parentId: null }, { id: 5, name: 'Item 2.1', parentId: 4 }
    // ... 更多的项目  
];

// 使用上面的函数构建树  
const tree = buildTree(items);
console.log(tree);


let redLight = document.getElementById('red');
let greenLight = document.getElementById('green');
let yellowLight = document.getElementById('yellow');

let createLightPromise = (dom, timeout) => {
    return new Promise(resolve => {
        dom.style.opacity = 1;
        setTimeout(() => {
            dom.style.opacity = 0;
            resolve();
        }, timeout);
    });
};
let arr = [() => createLightPromise(redLight, 2000), () => createLightPromise(greenLight, 2000), () => createLightPromise(yellowLight, 2000)];

function execute(arr, index = 0) {
    arr[index]().then(() => {
        index++;
        execute(arr, index >= arr.length ? 0 : index);
    });
}

execute(arr);


Function.prototype.myBind = function (context, ...args) {
    const self = this;
    return function (...otherArgs) {
        return self.apply(context, args.concat(otherArgs));
    };
};

Function.prototype.myCall = function (context = window, ...args) {
    let fn = Symbol('fn');
    context[fn] = this;

    let result = context[fn](...args);
    delete context[fn];

    return result;
};

Function.prototype.myApply = function (context = window, args) {
    let fn = Symbol('fn');
    context[fn] = this;
    let result = context[fn](...(args || []));
    delete context[fn];
    return result;
};



function myInstanceof(left, right) {
    let proto = left.__proto__;
    let prototype = right.prototype;
    while (proto) {
        if (proto === prototype) {
            return true;
        }
        proto = proto.__proto__;
    }
    return false;
}





