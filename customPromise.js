const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class CustomPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onFulfilledCallbacks.forEach((callback) => callback());
            }
        }

        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((callback) => callback());
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason
        };

        const newPromise = new CustomPromise((resolve, reject) => {
            const handleFulfilled = () => {
                try {
                    const result = onFulfilled(this.value);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }

            const handleRejected = () => {
                try {
                    const result = onRejected(this.reason);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }

            if (this.status === FULFILLED) {
                setTimeout(handleFulfilled, 0);
            } else if (this.status === REJECTED) {
                setTimeout(handleRejected, 0);
            } else {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(handleFulfilled, 0);
                })

                this.onRejectedCallbacks.push(() => {
                    setTimeout(handleRejected, 0);
                })
            }
        })

        return newPromise;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

CustomPromise.resolve = value => {
    return new CustomPromise((resolve) => {
        resolve(value)
    })
}

CustomPromise.reject = reason => {
    return new CustomPromise((resolve, reject) => {
        reject(reason)
    })
}


const promise = new CustomPromise((resolve, reject) => {
    resolve('成功')

    // setTimeout(() => {
    //     resolve('成功')
    // }, 1000);
})
// promise.then((value) => {
//     console.log('value ==== ', value)
// }).catch(e => {
//     console.log('err === ', e)
// })

CustomPromise.resolve('demo').then((value) => {
    console.log('value ---- ', value)
})
