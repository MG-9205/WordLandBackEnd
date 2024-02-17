require("dotenv").config();
const DB_URI=process.env.Mongo_uri

const mongoose=require("mongoose")
const connect_Mongo=async()=>{
 await mongoose.connect(DB_URI)
 console.log("Connection Established")
}
module.exports=connect_Mongo