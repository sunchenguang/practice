/**
 * 实现一个 AsyncScheduler 类，用于控制异步任务的并发执行数量，满足以下要求：
构造函数接收最大并发数 concurrency。
提供 add(task) 方法，接收返回 Promise 的异步任务函数，返回一个新的 Promise。
任何时候同时运行的异步任务数量不超过 concurrency。
任务按照添加顺序依次开始执行（非并行任务的顺序保证）。
当某个任务失败时，不影响其他任务的执行。
进阶要求：支持任务取消功能（选做）
 */
class AsyncScheduler {
    constructor(concurrency) {
        // 初始化代码
        this.concurrency = concurrency;
        this.queue = [];
        this.running = 0;
    }

    add(task) {

        const execute = (itemTask, callback) => {
            this.running++;

            itemTask().then((val) => {
                console.log('value ====', val);
            }).finally(() => {
                this.running--;

                callback && callback();
            });
        };

        const checkFunc = () => {
            if (this.queue.length > 0) {
                let queueTask = this.queue.shift();
                execute(queueTask, checkFunc);
            }
        };

        return new Promise((resolve, reject) => {
            if (this.running >= this.concurrency) {
                this.queue.push(task);
            } else {
                execute(task, checkFunc);
            }
        });

    }

    // 可选：取消任务的方法
}



class Scheduler {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.queue = [];
        this.running = 0;
    }
    add(task) {
        return new Promise((resolve, reject) => {
            const execute = () => {
                this.running++;

                task().then((val) => {
                    console.log('value ====', val);
                }).finally(() => {
                    this.running--;
                    if (this.queue.length > 0) {
                        const next = this.queue.shift();
                        next();
                    }
                });
            };

            if (this.running < this.concurrency) {
                execute();
            } else {
                this.queue.push(execute);
            }
        })
    }
}

const scheduler = new AsyncScheduler(2); // 最大并发数2
// const scheduler = new Scheduler(2); // 最大并发数2
const delay = (ms, val) => () => new Promise(resolve => setTimeout(() => resolve(val), ms));

scheduler.add(delay(1000, 'A'));
scheduler.add(delay(500, 'B'));
scheduler.add(delay(300, 'C'));
scheduler.add(delay(200, 'D'));







