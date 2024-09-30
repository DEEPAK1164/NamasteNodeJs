const express = require('express');
const connectDB = require('./config/database'); // Import the database connection
const User = require('./models/user');
const app = express();
// Middleware (if any)
app.use(express.json()); // Example middleware to handle JSON requests

//signup api to add data to DB.
app.post('/signup',async (req,res)=>{
    const user=new User({
      firstName:"Vivek",
      lastName:"Yadav",
      emailId:"vivek@gmail.com",
      password:"viv@1234",
      age:23,
      gender:"Male"
    })

    try{
      // throw new Error("some error")
      await user.save();
    res.send("Use Added Successfully!");
    }
    catch(err){
      res.status(400).send("Eroor saving the user:"+err?.message);
    }
    
})




// Connect to db 1st then listen to server
connectDB().then(()=>{
console.log("DB connected successfully!");
app.listen(7777,()=>{
  console.log("Server is running on port 7777...")
})
}).catch((err)=>{
console.error("DB can't be connected");
})
