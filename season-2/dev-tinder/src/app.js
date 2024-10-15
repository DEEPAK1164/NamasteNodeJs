const express = require('express');
const connectDB = require('./config/database'); // Import the database connection
const User = require('./models/user');
const app = express();
const {validateSignUpData}=require('./utils/validation');
const bcrypt=require("bcrypt");
// Middleware (if any)
app.use(express.json()); // Example middleware to handle JSON requests

app.post('/signup',async (req,res)=>{
 
    try{

      //validate the user
      validateSignUpData(req);


     //encrypt password
     //https://www.npmjs.com/package/bcrypt -> read docs
     const{password}=req?.body;
    const HashPassword= await bcrypt.hash(password, 10);
     // console.log(HashPassword);


    const user=new User(req.body);
    await user.save();
    res.send("User Added successfully!");
    }catch (err){
      res.status(400).send(`Error saving the user: ${err?.message}`);
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



app.delete('/delete',async(req,res)=>{
const userId=req.body.userId;
try{
//OR  const user=await User.findOneAndDelete({ _id: userId}).
// OR  const user=await User.findByIdAndDelete({ _id: userId}).
const user=await User.findByIdAndDelete(userId);

if(!user)
{
  return res.status(404).send("User not found!")
}
  return res.send(`user with userId ${userId} deleted successfully!`)
}catch(err){
  return res.status(400).send(`Something went wrong!: ${err?.message}`);
}

})

//it ignores the field which are not present in the schema
app.patch('/update/:userId', async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    // Correcting the check: return the result of the include check
    const isUpdatesAllowed = Object.keys(data).every((key) => {
      return ALLOWED_UPDATES.includes(key); // add return here
    });

    if (!isUpdatesAllowed) {
      throw new Error("Update not Allowed!");
    }

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      data,
      { returnDocument: "after", runValidators: true } // changed 'afterUpdate' to 'after'
    );
    
    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.send("User updated successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong, can't update! " + err.message);
  }
});



// Delete all users API - DELETE /deleteAll
app.delete('/deleteAll', async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.send(`Successfully deleted ${result.deletedCount} users.`);
  } catch (err) {
    res.status(400).send(`Error deleting users: ${err?.message}`);
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
