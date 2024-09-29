// Error Handling middleware
const express=require("express");
const app=express();
app.get('/getUserDetails',(req,res)=>{
  //Logic of DB call and get user data and get some error
  //to deal with unhandeled errors
  try{
  throw new Error("error occured!");
  res.send("user data send");
  }
  catch(err){
    console.log(err?.message)
    res.status(500).send("Some error contact support team!")
  }
})



//order must be same like below
//gracefully handling error to void ui break but best way is to use try catch
app.use('/',(err,req,res,next)=>{
if(err)
{
    //console.log(err);
    res.status(500).send("something went wrong!")
}
})

app.listen(3000,()=>{
console.log("server is running on port 3000...")
});