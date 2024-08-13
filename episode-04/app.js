require('./xyz.js') // one module into another
require('./sum.js') 
const obj=require('./sum');
//OR
// const {x,calSum}=require('./sum.js');


var name="Depak Maurya";
var a=10;
var b=15;

obj.calSum(a,b);
console.log(obj.x);


// calSum(a,b);
// console.log(x);

console.log(name,a,b);
