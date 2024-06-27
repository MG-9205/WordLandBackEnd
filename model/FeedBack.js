const mongoose=require('mongoose')

const FeedBack=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    feedback:{
        type:[String],
        required:true
    }

})
module.exports=mongoose.model('FeedBack',FeedBack)