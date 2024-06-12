const mongoose=require("mongoose")

const DB_URI="mongodb://localhost:27017/WordLand"


const connect_Mongo=async()=>{
 await mongoose.connect(DB_URI)
 console.log("Connection Established")
}
module.exports=connect_Mongo