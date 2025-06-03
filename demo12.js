// function demo(name = 'suncg', ...args) {
//     console.log(name, ...args);
// }


// demo(null);
// demo('sun');



async function demo() {
    console.log('111');
    const name = await demo2();
    console.log('name');
}

function demo2() {
    console.log('demo2');
    return 'suncg';
}

console.log('aaa');
demo();
console.log('bbb');

