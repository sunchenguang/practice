class Scheduler {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    add(task) {
        return new Promise((resolve, reject) => {
            const execute = () => {
                this.running++;

                task()
                    .then(resolve)
                    .catch(reject)
                    .finally(() => {
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
                // 这里塞的是execute
                this.queue.push(execute);
            }
        });
    }
}

// 使用示例
const scheduler = new Scheduler(2);

const task1 = () => new Promise((resolve) => setTimeout(() => {
    console.log('Task 1 completed');
    resolve();
}, 1000));

const task2 = () => new Promise((resolve) => setTimeout(() => {
    console.log('Task 2 completed');
    resolve();
}, 500));

const task3 = () => new Promise((resolve) => setTimeout(() => {
    console.log('Task 3 completed');
    resolve();
}, 800));

const task4 = () => new Promise((resolve) => setTimeout(() => {
    console.log('Task 4 completed');
    resolve();
}, 300));

const task5 = () => new Promise((resolve) => setTimeout(() => {
    console.log('Task 5 completed');
    resolve();
}, 300));

// Promise.reject().finally(() => {
//     console.log('1111')
// })
//
//
// new Promise((resolve, reject) => {
//     reject()
//     // resolve()
// }).finally(() => {
//     console.log('2222')
// })

scheduler.add(task1);
scheduler.add(task2);
scheduler.add(task3);
scheduler.add(task4);
scheduler.add(task4);
scheduler.add(task4);
