// Error Handling middleware
const express=require("express");
const app=express();
app.get('/getUserDetails',(req,res)=>{
  //Logic of DB call and get user data and get some error
  //to deal with unhandeled errors
  throw new Error("error occured!");
  res.send("user data send");



})



//order must be same like below
app.use('/',(err,req,res,next)=>{
if(err)
{
    res.status(500).send("something went wrong!")
}
})

app.listen(3000,()=>{
console.log("server is running on port 3000...")
});