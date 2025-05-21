function structuralClone(obj) {
    return new Promise(resolve => {
        const { port1, port2 } = new MessageChannel();
        port1.onmessage = ev => {
            resolve(ev.data);
            port1.close();
            port2.close();
        };
        port2.postMessage(obj);
    });
}

var obj = {
    a: 1,
    b: {
        c: 2
    }
};

obj.b.d = obj.b;

// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
const test = async () => {
    const clone = await structuralClone(obj);
    console.log(clone);
};
test();
