
const express = require('express');
const Book_route=require("./Routes/BooksRoute")
const User_route=require("./Routes/UserRoute")

const app=express()

const connect_to_mongo=require('./DB')
connect_to_mongo()

app.use(express.json())

const PORT=process.env.PORT || 3000

app.get("/home",async(req,res)=>{
    res.send("hello World")
})
 //middleWare
 app.use("/api/Books",Book_route);

 app.use("/user",User_route);
 
 app.listen(PORT,()=>{
    console.log("helloo wordLand")
}
)