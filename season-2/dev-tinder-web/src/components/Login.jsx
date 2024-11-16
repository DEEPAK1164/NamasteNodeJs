import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
const[emailId,setEmailId]=useState("");
const[password,setPassword]=useState("");
const[firstName,setFirstName]=useState("");
const[lastName,setLastName]=useState("");
const[isLoginForm,setIsLoginForm]=useState(true);
const[error,setError]=useState("");
const dispatch=useDispatch();

//never call hook inside the function
const navigate=useNavigate();


const handleLogin=async()=>{
try{
  const res = await axios.post(
    BASE_URL + "/login",
    { emailId, password },
    { headers: { "Content-Type": "application/json" }, withCredentials: true }
  );
  
//this data which we get pn hitting login api need to be stored in our appStore
//by dispatch an action
// console.log(res.data);
dispatch(addUser(res.data));
navigate("/");
}
catch(err){
  setError(err?.response?.data || "Something went wrong");
  console.error(err);
}
}


const handleSignUp=async()=>{
  try{

const res=await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true})
dispatch(addUser(res.data.data));
return navigate("/profile");
  }catch(err){
    setError(err?.response?.data || "Something went wrong");
    console.error(err);
  }
}

  return (
    <div className='flex justify-center my-10'>
     <div className="card bg-neutral text-base-content text-white w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm?"Login":"SignUp"}</h2>
   
   <div>

 {!isLoginForm && <>
   <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text text-white">First Name</span>
   
  </div>
  <input type="text"  
   value={firstName} 
   className="input input-bordered w-full max-w-xs bg-primary" 
   onChange={(e)=>setFirstName(e.target.value)} />
  <div className="label">
   
  </div>
</label>
</>}

{!isLoginForm && <>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text text-white">Last Name</span>
   
  </div>
  <input type="text"  
   value={lastName} 
   className="input input-bordered w-full max-w-xs bg-primary" 
   onChange={(e)=>setLastName(e.target.value)} />
  <div className="label">
   
  </div>
</label>
</>}




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
     <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn" onClick={isLoginForm?handleLogin:handleSignUp}>{isLoginForm?"Login":"SignUp"}</button>
    </div>
    <p className='cursor-pointer m-auto' onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm?"New User? SignUp Here":"Existing User? Login Here"}</p>
  </div>
</div>
    </div>
  )
}

export default Login
