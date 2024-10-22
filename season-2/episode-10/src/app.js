const express = require('express');
const connectDB = require('./config/database'); // Import the database connection
const User = require('./models/user');
const app = express();
const {validateSignUpData}=require('./utils/validation');
const bcrypt=require("bcrypt");
var cookieParser = require('cookie-parser')
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth")
// Middleware (if any)
app.use(express.json()); // Example middleware to handle JSON requests
app.use(cookieParser())



app.post('/signup',async (req,res)=>{
 
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


app.post("/login",async(req,res)=>{
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


app.get("/profile",userAuth,async(req,res)=>{
try{
  const user=req.user;
  res.send(user);
}
catch(err){
res.status(400).send("Error :"+err.message);
}


// try{
//   const cookies=req.cookies;//gives all cookies
//   // console.log(cookies);// undefined to read 
//   //cookie we need npm lib cookie parser
//   //https://www.npmjs.com/package/cookie-parser
//    const{token}=cookies;
// if(!token)
// {
//   throw new Error("Invalid Token");
// }
// //validate token
// const decodedMsg=await jwt.verify(token,"D**p@k*1164");
// // console.log(decodedMsg);
// const{_id}=decodedMsg;
// // console.log("Logged in user is "+_id);
// const user=await User.findById(_id);
// if(!user)
// {
//   throw new Error("User does not exists or try again token might get expired.")
// }

//   res.send(user);
// }catch(err){
// res.send("ERRO :"+err.message)
// }


})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{

//who is sending connection request?
const user=req.user;



  // console.log("Sending a connection request");
  res.send(user.firstName+" send the connection request");
})

connectDB().then(()=>{
console.log("DB connected successfully!");
app.listen(7777,()=>{
  console.log("Server is running on port 7777...")
})
}).catch((err)=>{
console.error("DB can't be connected");
})
