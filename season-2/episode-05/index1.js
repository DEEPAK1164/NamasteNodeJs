const express=require('express');
const app=express();


// '/user'-> route, cb(req,res)-> route handler and
// can have multiple route handler

//................................................
//coz 1st request handler does not give any response 
//so it should second route handler but it is not like that

// app.use('/user', (req,res)=>{
//    console.log('Handling the route handler');
//   //  res.send("1st Response!!");
// },

// (req,res)=>{
//   console.log('Handling the route handler');
//   res.send("2nd Response!!");
// }

// )
//...................................

//so, use next
// app.use('/user', (req,res,next)=>{
//   console.log('Handling the route handler');
//    next();
// },

// (req,res)=>{
//  console.log('Handling the route handler');
//  res.send("2nd Response!!");
// }

// )

//..................................................
//Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// app.use('/user', (req,res,next)=>{
//   console.log('Handling the route handler');
//   res.send("1st Response!!");
//    next();
// },

// (req,res)=>{
//  console.log('Handling the route handler');
//  res.send("2nd Response!!");
// }

// )

//...................................
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are 
app.use('/user', (req,res,next)=>{
  console.log('Handling the route handler');
  next();
  res.send("1st Response!!");
  
},

(req,res)=>{
 console.log('Handling the route handler');
 res.send("2nd Response!!");
}

)
//...............................


app.listen(3000,()=>{
console.log("server is running on port 3000...")
});