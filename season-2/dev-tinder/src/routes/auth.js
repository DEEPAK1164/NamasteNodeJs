const express=require("express");
const authRouter=express.Router();

const {validateSignUpData}=require('../utils/validation');
const User = require('../models/user');
const bcrypt=require("bcrypt");



authRouter.post('/signup',async (req,res)=>{
 
    try{

      //validate the user
      validateSignUpData(req);


     //encrypt password
     //https://www.npmjs.com/package/bcrypt -> read docs
     const{firstName,lastName,emailId,password}=req?.body;
    const HashPassword= await bcrypt.hash(password, 10);
     // console.log(HashPassword);


    // const user=new User(req.body);
    const user=new User({
      firstName,
      lastName,
      emailId,
      password:HashPassword,
    });

    await user.save();
    res.send("User Added successfully!");
    }catch (err){
      res.status(400).send(`Error saving the user: ${err?.message}`);
    }
})


authRouter.post("/login",async(req,res)=>{
    try{
     const{emailId,password}=req.body;
     const user=await User.findOne({emailId:emailId});
     if(!user)
     {
       throw new Error("Invalid Credentials");//emailid invalid coz dont expose db
     }
   const isPasswordValid=await bcrypt.compare(password,user.password);//it returns boolean
 
 if(isPasswordValid)
 {
 //createa JWT Token
 //And the token to cokkie and 
 //https://expressjs.com/en/5x/api.html#res.cookie
 //send the respnse back to the user
 
 // const jwttoken=await jwt.sign({_id:user._id},"D**p@k*1164",{expiresIn:"1d"});
 // console.log(jwttoken);
 // Generate the token
 const token = await user.getJWT();
 
 // Set the token in the cookie, ensure it's valid
 if (token && typeof token === 'string') {
     res.cookie('token', token, {
         httpOnly: true, 
         expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
         
     });
 } else {
     throw new Error("Failed to generate a valid token.");
 }
 
   res.status(200).send("User logged in successfully!");
 }
 else
 {
   throw new Error('Password is invalid')
 }
 
    }catch(err){
      res.status(400).send("Error : "+err.message);
    }
 })





















module.exports=authRouter;