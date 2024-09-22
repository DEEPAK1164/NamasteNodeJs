const express=require('express');
const app=express();


//1st parameter is route handler 2nd cb fn below is known as request handler
app.use('/',(req,res)=>{
    res.send('Hello Hello Hello');
    })
    

app.use('/test',(req,res)=>{
res.send("Hello from the test route");
})



app.listen(3000,()=>{
console.log("server is running on port 3000...")
});