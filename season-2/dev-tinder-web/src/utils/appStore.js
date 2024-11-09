
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
// I have created the store and it need to be provided to our application
//in root of the application app.js
//store consists of many slices
const appStore=configureStore({
reducer:{
    //adding user slice to the appStore
    user:userReducer,
    feed:feedReducer


},

})


export default appStore;
