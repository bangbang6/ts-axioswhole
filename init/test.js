//元祖
var nameUser = ['hello', 1];
console.log(nameUser[0].substr(1));
var user = "user";
user = 'bang';
var a = [1, 2, 3];
console.log(a[0]);
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;
console.log(c);
//any 表示任何都可以 就是js
var source = 2;
source = [1, 2, 3];
console.log(source[2]);
function warnUser() {
    console.log('rentrun void');
}
warnUser();
// | 表示联合类型
var u = undefined;
u = 1;
//object 是对象
var userNameM = {
    name: 'a',
    age: 1
};
var someValue = " sss";
console.log(someValue.length);
var x = ['aa', 1];
x[3] = '1';
