import React, { useState } from 'react'
import axios from "axios";


const Login = () => {
const[emailId,setEmailId]=useState("");
const[password,setPassword]=useState("");
const handleLogin=async()=>{
try{
const res=await axios.post("http://localhost:7777/login",
  {
  emailId,
  password,
},
{
  withCredentials:true
}
);
}catch(err){
  console.error(err);
}
}


  return (
    <div className='flex justify-center my-10'>
     <div className="card bg-neutral text-base-content text-white w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
   
   <div>

   <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text text-white">Email ID</span>
   
  </div>
  <input type="text"  
   value={emailId} 
   className="input input-bordered w-full max-w-xs bg-primary" 
   onChange={(e)=>setEmailId(e.target.value)} />
  <div className="label">
   
  </div>
</label>


<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text text-white">Password</span>
   
  </div>
  <input type="text" 
  value={password} 
  className="input input-bordered w-full max-w-xs bg-primary" 
  onChange={(e)=>setPassword(e.target.value)}/>
  <div className="label">
   
  </div>
</label>

   </div>

    <div className="card-actions justify-center m-2">
      <button className="btn" onClick={handleLogin}>Login</button>
    </div>

  </div>
</div>
    </div>
  )
}

export default Login
