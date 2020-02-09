interface label{
    label:string,
   
}
function createLabel(mylabel:label){
    console.log(mylabel.label)
}

createLabel({label:"aaa",size:1} as label )//类型断言为label 不加的话size会报错

interface square{
    color:string,
    area:number
}
interface squareConfig{
   readonly color?:string //表只读属性
    area?:number
}
function createSquare(config:squareConfig):square{
    let newSquare = {color:"red",area:100}
    if(config.color){
        newSquare.color = config.color
    }
    if(config.area){
        newSquare.area = config.area * config.area
    }
    return newSquare
}

let mysquare = ({color:"green"})
console.log(createSquare(mysquare).area)
//函数接口

interface serchFunc{
    (souce:string,sub:string):boolean
}
let mysearch:serchFunc = function(src:string,sub:string){
    return false
}


interface clockInterface{
    currentTime:Date
    setTime(d:Date)
}

class Clock implements clockInterface{
    currentTime:Date
    constructor(h:Date){
        this.currentTime = h
    }
    setTime(d:Date){
        this.currentTime = d
    }
}



interface Couter{
    (start:number):string,//这个接口是一个函数类型
    interval:number
    reset():void
}

function getCouter():Couter{
    let couter = (function(start:number){

    }) as Couter
    couter.interval = 123
    couter.reset = function(){

    }
    return couter
}

let couter = getCouter()
couter(10)
couter.interval= 5.0


class control {
    private state:any
}
