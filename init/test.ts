//元祖
let nameUser:[string,number] = ['hello',1]
console.log(nameUser[0].substr(1))


let user:string = "user"
user = 'bang'


let a:number[] = [1,2,3]
console.log(a[0])

enum Color{
    Red = 1,Green = 2,Blue = 4
}
let c:Color = Color.Blue
console.log(c)

//any 表示任何都可以 就是js
let source:any = 2
source = [1,2,3]
console.log(source[2])

function warnUser():void{
    console.log('rentrun void')
}
warnUser()
// | 表示联合类型
let u:undefined | number = undefined
u = 1;

//object 是对象

let userNameM:object = {
    name:'a',
    age:1
}

let someValue:any = " sss";
console.log(someValue.length)

/* let x:[string,number] = ['aa',1]
x[3] = '1' */