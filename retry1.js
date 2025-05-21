function retry(func, times) {
    let total = times;

    new Promise(async (resolve, reject) => {
        while (total--) {
            try {
                let value = await func();
                console.log('value === ', value)
                resolve(value);
                break;
            } catch (e) {
                if(!total) {
                    reject(e)
                }
            }
        }
    }).then(() => {

    }).catch(() => {

    })


}
