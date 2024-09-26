const express=require('express');
const app=express();
//Note : app.use() method will match all the HTTP method API calls to /test

//1st parameter is route handler 2nd cb fn below is known as request handler

//this route handle every thing that comes after /hello not only /hello
// app.use('/test',(req,res)=>{
// res.send("Hello from the test route");
// })


//this route handle every thing that comes after /xyz not only /xyz
// app.use('/xyz',(req,res)=>{
//     res.send("Hello from the xyz route");
//     })
    
    

//this route handle every thing that comes after / not only / but order is very important
// app.use('/',(req,res)=>{
//         res.send('Hello Hello Hello');
//         })
        

// this will only handle GET call to /user
// app.get('/user',(req,res)=>{
//   res.send({firstName:"Deepak", lastName:"Maurya"})
// })

// // this will only handle POST call to /user
// app.post('/user',(req,res)=>{
//    console.log("Save data to DB");
//    res.send("Data Successfully saved to Database")
//   })

app.get('/ab?c',(req,res)=>{
  res.send("Ha Ha Ha Ha !!!!!!")
})

app.get('/pq+r',(req,res)=>{
  res.send("Ha Ha Ha Ha !!!!!!")
})


app.get('/ab*cd',(req,res)=>{
  res.send("Ha Ha Ha Ha !!!!!!")
})


// if in any path route z comes it will work
app.get(/z/,(req,res)=>{
  res.send("Ha Ha Ha Ha !!!!!!")
})

app.get('/user', (req,res)=>{
  console.log(req.query);
  res.send("Hello User !!!!!!")
})

app.get('/user/:id/:pwd', (req,res)=>{
  console.log(req.params);
  res.send("Hello User !!!!!!")
})



app.listen(3000,()=>{
console.log("server is running on port 3000...")
});