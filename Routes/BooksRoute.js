const express=require('express')
const router=express.Router();
const {GetAllBook}=require("../controler/BookControoler")

router.route("/").get(GetAllBook);

module.exports=router;