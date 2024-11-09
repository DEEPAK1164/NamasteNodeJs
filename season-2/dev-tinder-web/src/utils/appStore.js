
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
// I have created the store and int need to be provided to our application
//in root of the application app.js
//store consists of many slices
const appStore=configureStore({
reducer:{
    //adding user slice to the appStore
    user:userReducer


},

})


export default appStore;