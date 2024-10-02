const express = require('express');
const connectDB = require('./config/database'); // Import the database connection
const User = require('./models/user');
const app = express();
// Middleware (if any)
app.use(express.json()); // Example middleware to handle JSON requests
//it reads json object and converts to js object and add js object back to req object in the body now my
//req.body contains js object 


//signup api to add data to DB.
app.post('/signup',async (req,res)=>{

  


  //req is request which postman has sent to us
  //and express has converted this request to an object
  //and it is given to us to use it and data which we send 
  //post man body is also the part of this request object
  //console.log(req);


    // console.log(req.body); // output is undefined coz server is not able to read Json data
    //to read json data we need help of middleware which check the incomming 
    //request and convert json into js object the middleware is app.use(express.json())
    //available in express v4.16.0 ownwards

    const user=new User(req.body);
    try{
    await user.save();
    res.send("User Added successfully!");
    }catch (err){
      res.status(400).send("Error saving the user:",err?.message);
    }
})



app.get('/user',async(req,res)=>{

const userEmail=req.body.emailId;
try{
  //it gives array of objects as per filter criteria
  const users=await User.find({emailId:userEmail})

  //findOne returns object
  // const users=await User.findOne({emailId:userEmail})
  // if(!users) to check object exists or not

  if(users.length===0)
  {
    res.status(404).send("User Not Found!")
  }
  else
  {
    res.send(users);
  }

}catch(err){
  res.status(400).send(`Something went wrong!,${err?.message}`)
}


})


//Feed API - GET/feed - get all users from the database
//https://mongoosejs.com/docs/models.html
app.get("/feed",async (req,res)=>{
  try{
    //throw new Error("Uknown Error occured!");
    const allUsers= await User.find({});
    res.send(allUsers);
  }catch(err){
    res.status(400).send(`Error fetching all users: ${err?.message}`);


  }
 
});



// Connect to db 1st then listen to server
connectDB().then(()=>{
console.log("DB connected successfully!");
app.listen(7777,()=>{
  console.log("Server is running on port 7777...")
})
}).catch((err)=>{
console.error("DB can't be connected");
})
