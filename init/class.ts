class Animal{
    move(dis:number=0){
        console.log(`moved ${dis}m`)
    }
    name:string
    constructor(name:string){
        this.name = name
    }
}
//private 只能在本类中使用 不能在外面使用 比如 new animal().name 不行
//protected 只能在本类和子类里面使用 不能在外面使用
//向在外面使用 必须public
class Dog extends Animal{
    bark(){
        console.log('bacrk')
    }
    //后遭函数 重构必须加super 并且放在第一个 表示调用父类的后遭函数
    constructor(name){
        super(name) // 相当于调用父类constractor(name)传namedang做参数
    }
    //重构
    move(dis:number = 5){
        console.log('wawawa'+this.name)
        super.move(dis)
    }
}

const dog = new Dog('wangcai')
dog.bark()
dog.move(10)

class Person{
    constructor(public name:string){ // name直接会当做成员

    }
}
let p = new Person('bang')
console.log(p.name)


class Grid{
    static origin:object = {
        x:0,
        y:0
    }
}


abstract class Departm{
    name:string
    constructor(name:string){this.name = name}

    abstract printMeeting()
}

class Accounts extends Departm{
    
    printMeeting(){
        console.log('aaa')
    }
}

let ab:Departm = new Accounts('aaa')
ab.printMeeting();
ab.name = 'aaa';   