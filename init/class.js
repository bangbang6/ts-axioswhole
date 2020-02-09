var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (dis) {
        if (dis === void 0) { dis = 0; }
        console.log("moved " + dis + "m");
    };
    return Animal;
}());
//private 只能在本类中使用 不能在外面使用 比如 new animal().name 不行
//protected 只能在本类和子类里面使用 不能在外面使用
//向在外面使用 必须public
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    //后遭函数 重构必须加super 并且放在第一个 表示调用父类的后遭函数
    function Dog(name) {
        return _super.call(this, name) || this; // 相当于调用父类constractor(name)传namedang做参数
    }
    Dog.prototype.bark = function () {
        console.log('bacrk');
    };
    //重构
    Dog.prototype.move = function (dis) {
        if (dis === void 0) { dis = 5; }
        console.log('wawawa' + this.name);
        _super.prototype.move.call(this, dis);
    };
    return Dog;
}(Animal));
var dog = new Dog('wangcai');
dog.bark();
dog.move(10);
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var p = new Person('bang');
console.log(p.name);
