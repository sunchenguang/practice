// 方法一：
class Scheduler {
    constructor(count) {
        this.count = 2
        this.queue = []
        this.run = []
    }

    add(task) {
        this.queue.push(task)
        return this.schedule()
    }

    schedule() {
        if (this.run.length < this.count && this.queue.length) {
            const task = this.queue.shift()
            const promise = task().then(() => {
                this.run.splice(this.run.indexOf(promise), 1)
            })
            this.run.push(promise)
            return promise
        } else {
            return Promise.race(this.run).then(() => this.schedule())
        }
    }
}


// 方法二： add为 async
class Scheduler2 {
    list = []; //用来承载还未执行的异步

    count = 0; //用来计数

    constructor(limit) {
        this.limit = limit; //允许同时运行的异步函数的最大个数
    }

    async add(fn) {
        if (this.count >= this.limit) {
            // 超出限制的任务会一直 await，直到进行中的任务resolve
            await new Promise((resolve) => {
                this.list.push(resolve);
            });
        }

        this.count++;

        const result = await fn();

        this.count--;
        // 进行中的任务执行完成，resolve() 的是在此任务之后添加的待执行任务，先进先出
        if (this.list.length > 0) this.list.shift()();

        return result;
    }
}
