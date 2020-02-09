var Lion = /** @class */ (function () {
    function Lion() {
    }
    return Lion;
}());
//T是繁星
function createLion(c) {
    return new c();
}
//new()和number object 一样表示这个是类实例类型(Line)即构造函数类型 可以传一个类名进去
var li = createLion(Lion);
li.name = 'aaa';
var func;
func = function (x, y) {
    return x + y;
};
//类型检查 用 as any 断言解决所有类型问题
var Pet = /** @class */ (function () {
    function Pet() {
    }
    return Pet;
}());
var Fish = /** @class */ (function () {
    function Fish() {
    }
    return Fish;
}());
var pet = new Fish(); // 如果有swim这个属性
pet.cname = 'a';
if (pet.name) {
    console.log('yes');
}
