import React from 'react'
import NavBar from './NavBar'
// Body.js
import { Outlet } from "react-router-dom";
import Footer from './Footer';

function Body() {
  return (
    <div>
      <NavBar/>

      {/* Render child routes here */}
      <Outlet />

      <Footer/>
    </div>
  );
}

export default Body;

