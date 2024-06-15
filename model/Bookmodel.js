const mongoose = require('mongoose')
const Bookschema=new mongoose.Schema({
    Genre : String,
    Book_name : String,
    Star: Number,
    Author_name: String,
    ImageUrl:String,
    Description:String,
    PDFUrl:String    
});
module.exports=mongoose.model('Book',Bookschema);