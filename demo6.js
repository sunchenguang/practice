var fullname = '1';

var obj = {
    fullname: '2',
    // 箭头函数里没有this, 是指向window的
    getFullname: () => {
        return this.fullname;
    }
};

console.log(obj.getFullname());
var test = obj.getFullname();
console.log(test);
