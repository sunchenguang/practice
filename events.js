/*
const fn1 = (...args) => console.log('I want sleep1', ...args)
const fn2 = (...args) => console.log('I want sleep2', ...args)

const event = new Event();
event.on('sleep', fn1, 1,2,3);
event.on('sleep', fn2, 1,2,3);
event.fire('sleep', 4,5,6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6

event.off('sleep', fn1);
event.once('sleep', () => console.log('I want sleep'));
event.fire('sleep');
*/

// 2.请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能


class Event {
    constructor() {
        this.eventMap = {};
        this.funcInQueueIndexMap = {};
    }


    on(eventName, func, ...args) {
        if (!this.eventMap[eventName]) {
            this.eventMap[eventName] = [];
        }

        const eventQueueLength = this.eventMap[eventName].push(
            (...newArgs) => {
                func.apply(this, args.concat(newArgs))
            }
        )
        this.funcInQueueIndexMap[func] = eventQueueLength - 1;

    }

    off(eventName, func) {
        let eventQueue = this.eventMap[eventName] || [];
        let index = this.funcInQueueIndexMap[func];

        console.log('index ====', index)

        eventQueue.splice(index, 1)
    }


    fire(eventName, ...args) {
        const eventQueue = this.eventMap[eventName] || [];

        eventQueue.forEach((eventFunc) => {
            eventFunc.apply(this, args)
        })
    }

    once() {

    }

}


const fn1 = (...args) => console.log('I want sleep1', ...args)
const fn2 = (...args) => console.log('I want sleep2', ...args)

const event = new Event();
event.on('sleep', fn1, 1,2,3);
event.on('sleep', fn2, 1,2,3);
event.fire('sleep', 4,5,6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6

event.off('sleep', fn2);
// event.once('sleep', () => console.log('I want sleep'));
event.fire('sleep');
