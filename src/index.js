const {odd, even} = require('./var');
const checkNumber = require('./func');
const checkOddOrEven = require('./func');

function checkStringOddOrEven(str) {
    if(str.length%2) { //홀수이면
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkOddOrEven(10));
console.log(checkStringOddOrEven('hello'));