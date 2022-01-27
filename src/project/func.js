import { odd, even } from './var.js';
//const {odd,even}=require('./var');
function checkOddOrEven(num) {
    if (num % 2) { //홀수이면
        return odd;
    }
    return even;
}
export default checkOddOrEven;
//module.exports = checkOddOrEven;