const express=require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter=express.Router();
const ConnectionRequestModel=require("../models/connectionRequest")
const USER_SAFE_DATA="firstName lastName photoUrl age gender about skills";

//get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequestModel.find({
              toUserId:loggedInUser._id,
              status:"interested"
        }).populate("fromUserId",["firstName","lastName"])


    res.json({message:"Data fetched successfully!",
        data:connectionRequests
    })
    } catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
    
})


//who is connected to me who has accepted my rquest
userRouter.get("/user/connections", userAuth, async(req,res)=>{
try {
const loggedInUser=req.user;
//how to find all connections who are my connections
//ex akshay=>elon=>accepted
//elon=>mark=>accepted
//suppose I am finding out all the connections of elon
//then I ahve to check all database in which elon is to user or from user
//but status should always be accepted


const connectionRequests=await ConnectionRequestModel.find({
   $or:[
    {toUserId:loggedInUser._id,status:"accepted"},
    {fromUserId:loggedInUser._id,status:"accepted"}
   ] 
}).populate("fromUserId",USER_SAFE_DATA)
.populate("toUserId",USER_SAFE_DATA)

const data=connectionRequests.map((row)=>
{
    if(row.fromUserId._id.toString()===loggedInUser._id.toString())
     {
       return  row.toUserId;
     }
    return row.fromUserId;
});

res.json({"connections are":data})

}catch(err){

    res.status(400).send({message:err.message})
}


})



module.exports=userRouter;