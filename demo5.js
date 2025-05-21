//评测题目: 无

var opt = {
    name: "Amy",
    name2: this.name,
    say: function () {
        return this.name;
    },
    say2: function () {
        setTimeout(function () {
            console.log(this.name);
        })
    },
    say3: function () {
        setTimeout(() => {
            console.log(this.name);
        })
    }
}


console.log(opt.name2); // ''
console.log(opt.say); // function () {...}
opt.say2(); // ''
opt.say3(); // Amy
