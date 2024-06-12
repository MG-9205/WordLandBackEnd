const { Router}=require('express');
const {SignUp,UserLogin}=require('../controler/UserControler');

const router=Router();

router.route("/signup").post(SignUp);

router.route("/login",).post(UserLogin)

module.exports=router

