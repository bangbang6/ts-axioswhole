class Lion {
    name:string
}

//T是繁星
function createLion<T>(c:new() => T):T{
    return new c()
}

//new()和number object 一样表示这个是类实例类型(Line)即构造函数类型 可以传一个类名进去


let li = createLion(Lion)
li.name = 'aaa'

//泛型接口
//函数接口
interface interfaceFunc<T>{
    (x:T,y:T) : T
}

let func : interfaceFunc<number>
func = function(x:number,y:number){
    return x + y
}
//类型检查 用 as any 断言解决所有类型编写代码时候问题
//用undefined或者typeof解决类型问题 instance of
class Pet{
    name:string
}
class Fish{
    cname:string
}
let pet = new Fish()// 如果有swim这个属性
pet.cname = 'a'
if((pet as any).name){
console.log('yes')
}