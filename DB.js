const mongoose=require("mongoose")

const DB_URI=process.env.DATABASE_URL;


const connect_Mongo=async()=>{
 await mongoose.connect(DB_URI)
 console.log("Connection Established")
}
module.exports=connect_Mongo