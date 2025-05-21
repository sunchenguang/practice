var a = 20;
var test = {
    a: 40,
    init: () => {
        console.log(this.a);

        function go() {
            console.log(this.a);
        }

        go.prototype.a = 50;

        return go;
    }
};

var p = test.init();
p();
new p();
