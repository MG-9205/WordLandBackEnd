
const connect_to_mongo=require('./DB')
connect_to_mongo()
const Book= require('./model/usermodel')
const express = require('express');
const app=express()
const Book_route=require("./Routes/BooksRoute")
const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("helloo wordLand")
}
)
app.get("/home",async(req,res)=>{
    res.send("hello World")
})
 //middleWare
 app.use("/api/Books",Book_route)