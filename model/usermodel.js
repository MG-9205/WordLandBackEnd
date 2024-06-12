const mongoose = require('mongoose');

const UserSignUp = new mongoose.Schema({
    Email:{
        type:String,
        unique:true,
        required:true
    },
    Username:{
        type:String,
        unique:true,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
})

module.exports=mongoose.model("User",UserSignUp);