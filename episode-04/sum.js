// note : modules protect their variables and functions from leaking variables
//so we need to export the modules

console.log("Sum module get exeuted");
var x="var x from sum module";
function calSum(x,y){
    console.log(x+y);
}

// module.exports={
//     calSum:calSum,
//     x:x
// };

//OR


module.exports={
    calSum,
    x,
};


