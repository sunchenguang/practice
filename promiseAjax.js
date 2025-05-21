function ajaxRequest(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        if (method === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        xhr.onload = function () {
            if (this.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(this.statusText));
            }
        }

        xhr.onerror = function () {
            reject(new Error(this.statusText));
        }

        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    })
}


ajaxRequest('', 'GET').then((response) => {
    console.log(response);
}).catch(() => {
})



























