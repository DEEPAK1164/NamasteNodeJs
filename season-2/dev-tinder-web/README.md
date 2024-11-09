# DevTinder Frontend

# Episode-15
-create vite + react project
-remove unecessary code
-configure tailwinf
-coonfigure daisyui (component library compatible with tailwind)
-add navbar component to App.jsx
-create seperate NavBar.jsx inside components folder
-installed reactRouter (https://reactrouter.com/en/main/start/tutorial#tutorial)
-create BrowserRouter  
   Routes
        Route(Parent)
           Route(children)
           Route(children)


-create outlet in Body Component
-Create Footer

# lets Design the Component
Body
   Navbar
   Route=/=>Feed
   Route=/login=>Login
   Route=/connections=>Connections
   Route=/profile=>Profile

   # Episode-16
   -create a login page
   -install axios
   -solve cors issue
   -CORS-install cors in backend => add middleware to with configurations:origin, credentials:true 
   -whenever making api call so pass 
   axios=>{withCredentials;true} in frontend to get token back to cookie
   -install redux toolkit https://redux-toolkit.js.org/introduction/getting-started
   =>configureStore=>Provider=>createSlice=>add reducer to store
   -add redux dev tool
   -login and see if data is comming properly
   -navbar updates as user logged in.