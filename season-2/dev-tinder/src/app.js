const express=require('express');
const app=express();


//1st parameter is route handler 2nd cb fn below is known as request handler



//this route handle every thing that comes after /hello not only /hello
app.use('/test',(req,res)=>{
res.send("Hello from the test route");
})


//this route handle every thing that comes after /xyz not only /xyz
app.use('/xyz',(req,res)=>{
    res.send("Hello from the xyz route");
    })
    
    

//this route handle every thing that comes after / not only / but order is very important
app.use('/',(req,res)=>{
        res.send('Hello Hello Hello');
        })
        


app.listen(3000,()=>{
console.log("server is running on port 3000...")
});