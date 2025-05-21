class Man {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}


class Factory {
    static create(name: string, age: number) {
        return new Man(name, age);
    }
}

const man = Factory.create('John', 20);
man.sayHello();


class Singleton {
    constructor() {
        console.log('Singleton constructor');
    }

    static instance: Singleton;

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();
console.log(singleton1 === singleton2);

class Adapter {
    adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        this.adaptee = adaptee;
    }

    request() {
        this.adaptee.specificRequest();
    }
}

class Adaptee {
    specificRequest() {
        console.log('Adaptee specificRequest');
    }
}

class Target {
    request() {
        console.log('Target request');
    }
}

const adapter = new Adapter(new Adaptee());
adapter.request();









