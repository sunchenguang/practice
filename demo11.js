function deepClone(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    const clone = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }

    return clone;
}


function map(arr, func, ctx) {
    const context = ctx || null;
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(func.call(context, arr[i], i, arr));
    }
    return result;
}

function reduce(arr, func, initValue) {
    let hasInitValue = typeof initValue !== 'undefined';
    let totalValue = hasInitValue ? initValue : arr[0];

    for (let i = hasInitValue ? 0 : 1; i < arr.length; i++) {
        totalValue = func(totalValue, arr[i], i, arr);
    }

    return totalValue;
}


function repeat(str, count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        result += str;
    }
    return result;
}

/**
 * 字符串两端去掉空格
 * @param {string} str 
 */
function trim(str) {
    let result = str.replace(/^\s+|\s+$/g, '');
    return result;
}


/**
 * 链表节点类
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    push(value) {
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        return this;
    }

    shift() {
        if (!this.head) {
            return undefined;
        }

        let current = this.head;
        this.head = this.head.next;

        if (this.head === null) {
            this.tail = null;
        }

        return current.value;
    }

    unshift(value) {
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }

        return this;
    }

    pop() {
        if (!this.head) {
            return undefined;
        }

        let current = this.head;
        let newTail = current;
        while (current.next) {
            newTail = current;
            current = current.next;
        }

        this.tail = newTail;
        this.tail.next = null;

        return current.value;
    }
}

function timeFormat(time, format) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let result = format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hour)
        .replace('mm', minute)
        .replace('ss', second);

    return result;
}

/**
 * 校验是否是有效的email格式
 * @param {string} str 
 */
function isValidEmail(str) {
    // 使用正则表达式校验email格式
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(str);
}

function flat(arr) {
    return arr.toString().split(',').map(Number);
}

function jsonStringify(obj) {
    // 处理基本类型
    if (obj === null) return 'null';
    if (typeof obj === 'undefined') return undefined;
    if (typeof obj === 'function') return undefined;
    if (typeof obj === 'symbol') return undefined;
    if (typeof obj === 'string') return `"${obj}"`;
    if (typeof obj === 'number') return isFinite(obj) ? obj.toString() : 'null';
    if (typeof obj === 'boolean') return obj.toString();

    // 处理数组
    if (Array.isArray(obj)) {
        const elements = obj.map(item => {
            // undefined、函数、symbol会被转换成null
            if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
                return 'null';
            }
            return jsonStringify(item);
        });
        return `[${elements.join(',')}]`;
    }

    // 处理普通对象
    if (typeof obj === 'object') {
        const pairs = Object.entries(obj).reduce((acc, [key, value]) => {
            // 跳过undefined、函数、symbol值
            if (typeof value === 'undefined' || typeof value === 'function' || typeof value === 'symbol') {
                return acc;
            }
            acc.push(`"${key}":${jsonStringify(value)}`);
            return acc;
        }, []);
        return `{${pairs.join(',')}}`;
    }

    return undefined;
}


function jsonParse(str) {
    return eval(`(${str})`);
}

// 实现ES6的extends功能
function _extends(subClass, superClass) {
    // 创建一个新对象,使用superClass的原型对象作为新创建对象的原型
    subClass.prototype = Object.create(superClass.prototype);
    // 将constructor属性指向子类构造函数,保持原型链的完整性
    subClass.prototype.constructor = subClass;
    // 设置子类的[[Prototype]]指向父类,实现静态属性/方法的继承
    Object.setPrototypeOf(subClass, superClass);
}

function extends1() {

    function SuperType() {
        this.type = 'super';
    }

    SuperType.prototype.getType = function () {
        return this.type;
    };

    function SubType() {
        this.type = 'sub';
    }

    SubType.prototype = new SuperType();
    SubType.prototype.constructor = SubType;

    let sub = new SubType();


}


function extends2() {
    function SuperType(type) {
        this.type = type;
    }


    SuperType.prototype.getType = function () {
        return this.type;
    };

    function SubType(type) {
        SuperType.call(this, type);
    }

    SubType.prototype = new SuperType();
    SubType.prototype.constructor = SubType;


}


function extends3() {
    function SuperType(type) {
        this.type = type;
    }

    SuperType.prototype.getType = function () {
        return this.type;
    };

    function SubType(type) {
        SuperType.call(this, type);
    }

    SubType.prototype = Object.create(SuperType.prototype);
    SubType.prototype.constructor = SubType;

}



function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype);
    const result = fn.apply(obj, args);
    return typeof result === 'object' && result !== null ? result : obj;
}

function myObjectCreate(proto, properties) {
    function F() { }
    F.prototype = proto;
    const obj = new F();
    if (properties) {
        Object.defineProperties(obj, properties);
    }
    return obj;
}




