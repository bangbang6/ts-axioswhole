function createLabel(mylabel) {
    console.log(mylabel.label);
}
var obj = { label: "aaa", size: 1 };
createLabel({ label: "aaa", size: 1 });
function createSquare(config) {
    var newSquare = { color: "red", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.area) {
        newSquare.area = config.area * config.area;
    }
    return newSquare;
}
var mysquare = ({ color: "green" });
console.log(createSquare(mysquare).area);
