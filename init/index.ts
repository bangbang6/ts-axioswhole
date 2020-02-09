class User{
    firstName:string
    lastName:string
    constructor(firstName:string,lastName:string){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

function greetHello(person:User){
    console.log(person.firstName)
}

let userName:User  = new User('liao','zhen')
greetHello(userName)