const mongoose = require('mongoose')
const Bookschema=new mongoose.Schema({
    Genre : String,
    Book_name : String,
    Price: String,
    Author_name: String,    
});
module.exports=mongoose.model('Book',Bookschema);