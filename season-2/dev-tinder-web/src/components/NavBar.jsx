import React from 'react'
import { useSelector } from 'react-redux'
const NavBar = () => {

//In navBAr can I show photo of loggedIn user by subscribing to the appStore?
const loggedInUser=useSelector((store)=>store.user)
console.log(loggedInUser);

  return (
  
     <div className="navbar bg-neutral">
  <div className="flex-1">
    <a className="btn btn-white text-xl">👨🏻‍💻DevTinder</a>
  </div>

  {loggedInUser &&
   <div className="flex-none gap-2">
    <div className="form-control">
      {/* <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" /> */}
    </div>


<div className="dropdown dropdown-end mx-10 flex">
    <p className='px-4 text-white flex items-center'>Welcome, {loggedInUser.firstName}</p>
      <div tabindex="0" role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={loggedInUser.photoUrl}/>
        </div>
      </div>
      <ul
        tabindex="0"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>


  </div>}



</div>
  
  )
}

export default NavBar
