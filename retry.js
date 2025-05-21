function fn() {
    return Promise.resolve();
    // return Promise.reject();
}
Promise.retry = (fn, times) => {
    let total = times;
    new Promise(async (resolve, reject) => {
        while (total--) {
            try {
                const res = await fn();
                console.log('执行成功,结果为：', res);
                resolve(res);
                break;
            } catch (err) {
                console.log('执行失败,结果为：', err);
                if (!total) {
                    reject(err);
                }
            }
        }
    }).catch(() => {
        console.log('执行完成，' + times + '次全部失败...');
    })
}

Promise.retry(fn, 7);
