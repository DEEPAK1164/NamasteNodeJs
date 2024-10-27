const express=require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter=express.Router();
const ConnectionRequestModel=require("../models/connectionRequest")


//get all the pending connection request for the logged in user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
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







module.exports=userRouter;