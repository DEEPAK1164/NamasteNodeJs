const express = require('express');
const connectDB = require('./config/database'); // Import the database connection
const app = express();

var cookieParser = require('cookie-parser')


// Middleware (if any)
app.use(express.json()); // Example middleware to handle JSON requests
app.use(cookieParser())

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);






connectDB().then(()=>{
console.log("DB connected successfully!");
app.listen(7777,()=>{
  console.log("Server is running on port 7777...")
})
}).catch((err)=>{
console.error("DB can't be connected");
})
