function MyPromise(func) {
    this.fullfilled = false;
    this.rejected = false;
    this.pending = true;
    this.value = undefined;
    this.reason = undefined;
    this.handlers = [];
    this.errorHandlers = [];

    const resolve = (value) => {
        if (this.pending) {
            this.fullfilled = true;
            this.pending = false;
            this.value = value;
            this.handlers.forEach(handler => handler());
        }
    }

    const reject = (reason) => {
        if (this.pending) {
            this.rejected = true;
            this.pending = false;
            this.reason = reason;
            this.errorHandlers.forEach(handler => handler());
        }

    }

    func.call(this, resolve.bind(this), reject.bind(this));
}

MyPromise.prototype.then = function (func, func2) {

    return new MyPromise((resolve, reject) => {
        const handleFulfilled = () => {
            const value = func(this.value);
            resolve(value);
        }

        const handleRejected = (reason) => {
            const value = func2(reason);
            resolve(value);
        }


        if (this.fullfilled) {
            setTimeout(handleFulfilled, 0);
        } else if (this.rejected) {
            setTimeout(handleRejected, 0);
        } else {
            this.handlers.push(() => {
                setTimeout(handleFulfilled, 0);
            })

            this.errorHandlers.push(() => {
                setTimeout(handleRejected, 0);
            })
        }

    });
};
MyPromise.prototype.catch = function (func) {
    this.errorHandlers.push(func);
    return this;
};

MyPromise.race = promises => new MyPromise((resolve, reject) => {
    promises.forEach(MyPromise => {
        MyPromise.then(resolve, reject);
    });
});

MyPromise.all = promises => new MyPromise((resolve, reject) => {
    let len = promises.length;
    let res = [];
    promises.forEach((p, i) => {
        p.then(r => {
            if (len === 1) {
                resolve(res);
            } else {
                res[i] = r;
            }
            len--;
        }, reject);
    });
});

// test
const p1 = new MyPromise(resolve => {
    // resolve('resolved===');

    setTimeout(() => {
        resolve('resolved===');
    }, 3000)
})
p1.then(console.log).then((...args) => console.log("second", ...args));
//
// const p2 = new MyPromise((resolve, reject) =>
//     setTimeout(reject.bind(null, "rejected"), 3000)
// );
// p2.then(console.log).catch((...args) => console.log("fail", ...args));
