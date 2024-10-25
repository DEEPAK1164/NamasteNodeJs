const express=require("express");
const User = require('../models/user');
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const jwt=require("jsonwebtoken");
const{validateEditProfileData}=require("../utils/validation");

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
      const user=req.user;
      res.send(user);
    }
    catch(err){
    res.status(400).send("Error :"+err.message);
    }
    
    
    try{
      const cookies=req.cookies;//gives all cookies
      // console.log(cookies);// undefined to read 
      //cookie we need npm lib cookie parser
      //https://www.npmjs.com/package/cookie-parser
       const{token}=cookies;
    if(!token)
    {
      throw new Error("Invalid Token");
    }
    //validate token
    const decodedMsg=await jwt.verify(token,"D**p@k*1164");
    // console.log(decodedMsg);
    const{_id}=decodedMsg;
    // console.log("Logged in user is "+_id);
    const user=await User.findById(_id);
    if(!user)
    {
      throw new Error("User does not exists or try again token might get expired.")
    }
    
      res.send(user);
    }catch(err){
    res.send("ERROR :"+err.message)
    }
    
    
    })
    

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
  try{

  if(!validateEditProfileData(req))
  {
   throw new Error("Invalid Edit Request.");
  
  }
 
  const loggedInUser=req.user;

  // console.log(loggedInUser);
  Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
  // console.log(loggedInUser);
    await loggedInUser.save();
res.send("Edit was successfull!");


  }catch(err){

  res.status(400).send("ERROR :"+ err?.message);

  }


})








module.exports=profileRouter;