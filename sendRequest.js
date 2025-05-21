async function sendRequest(urls, max, callback) {


    const tmpUrls = urls.slice();
    const maxUrls = tmpUrls.splice(0, max)
    const promiseArr = maxUrls.map((url, index) => fetch(url).then(() => {
        return index
    }))
    while (tmpUrls.length) {

        await Promise.race(promiseArr).then((index) => {
            let url = tmpUrls.shift();
            promiseArr[index] = fetch(url).then(() => {
                return index
            })
        }).catch(() => {
        })
    }

    Promise.all(promiseArr).then(() => {
        callback()
    }).catch(() => {
    })


}
