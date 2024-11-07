import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"

function App() {
 
  return (
    <>

<BrowserRouter basename="/">
  <Routes>
   
   {/* parent route */}
    <Route  path="/" element={<Body/>}>

    {/* children routes */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        
    </Route>

  </Routes>
</BrowserRouter>


    </>
  )
}

export default App
