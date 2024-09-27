// The middleware in node. js is 
//a function that will have all the
//access for requesting an object,
//responding to an object, and moving
// to the next middleware function
// in the application request-response cycle.

const express=require('express');
const app=express();

//...............................................
// app.get("/admin/getAllData",(req,res)=>{
//   const token="xyz";
//   const isAdminAuthorized=token==="xyz";
//   if(isAdminAuthorized)
//   {
//     res.send("All data send");
//   }
//   else{
//     res.status(202).send("Unauthorized request");
//   }
// })



// app.get("/admin/deleteUser",(req,res)=>{
//   const token="xyz";
//   const isAdminAuthorized=token==="xyz";
//   if(isAdminAuthorized)
//   {
//     res.send("Deleted USer");
//   }
//   else{
//     res.status(202).send("Unauthorized request");
//   }
// })
//...............................................
// middleware allows us to follow DRY principle

//Handle Auth Middleware for all GET, POST, PATCH, UPDATE, DELETE http methods
app.use("/admin",(req,res,next)=>{
  console.log("Auth middleware runs to check admin auth")
  const token="xyz";
  const isAdminAuthorized=token==="xyz";
  if(!isAdminAuthorized)
  {
    res.status(202).send("Unauthorized request");
  }
  else{
   next();
  }
})



app.get("/admin/getAllData",(req,res)=>{
  
    res.send("All data send");
 
})



app.get("/admin/deleteUser",(req,res)=>{
 
    res.send("Deleted USer");
 
})



app.listen(3000,()=>{
console.log("server is running on port 3000...")
});