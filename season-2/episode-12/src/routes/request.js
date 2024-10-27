const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const ConnectionRequestModel=require("../models/connectionRequest");
const User=require("../models/user")



requestRouter.post("/request/send/:status/:toUserId",
  userAuth,
  //note req.user will give info about logged in user (req.user) it is same person 
  //who is sending the request
  async(req,res)=>{
     try{
const fromUserId=req.user._id;
const toUserId=req.params.toUserId;
const status=req.params.status

const allowedStatus=["ignored","interested"];
if(!allowedStatus.includes(status))
{
   return res.status(400).json({
    message:"Invalid status type :"+status
   })
}

const toUser=await User.findById(toUserId);
if(!toUser)
{
  return res.status(404).json({
    message:"User not found!"
  })
}


//if there is an existing ConnectionRequest
//if conn req from p1 to p1 already exist or
//if there is con req already pending from b to a
//in both cases user not allowed to send con request
const existingConnectionRequest=await ConnectionRequestModel.findOne({
  $or:[
  {fromUserId,toUserId},
  {fromUserId:toUserId,toUserId:fromUserId}
  ]
})

if(existingConnectionRequest)
{
  return res.status(400).send({message:"Connection Request Already Exists!"})
}








const connectionRequest=new ConnectionRequestModel({
  fromUserId,
  toUserId,
  status
})

const data=await connectionRequest.save();
res.json({
  message:"Connection Request :"+req.params.status,
  data,
})
     }catch(err){
       res.status(400).send("Error :"+err.message);
     }


    })




module.exports=requestRouter;