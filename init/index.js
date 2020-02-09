var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return User;
}());
function greetHello(person) {
    console.log(person.firstName);
}
var userName = new User('liao', 'zhen');
greetHello(userName);
