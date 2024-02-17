const book= require('../model/usermodel')
const GetAllBook=async(req,res)=>{
    const req_object={};
    const{Book_name,Author_name,Genre}=req.query;
    console.log(req.query);
    if(Book_name){
        req_object.Book_name={$regex:Book_name,$options:"i"};
    }
    if(Author_name){
        req_object.Author_name={$regex:Author_name,$options:"i"};
    }
    if(Genre){
        req_object.Genre={$regex:Genre,$options:"i"};
    }

    const Books=await book.find(req_object)
    res.status(200).json({Books})
}
/*const GetTestData=async(req,res)=>{
    res.status(200).json({msg:"Test data"})
}*/
module.exports={GetAllBook}