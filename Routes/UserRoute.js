const { Router}=require('express');
const {SignUp,UserLogin,HandleLibrary,sendUserLibrary}=require('../controler/UserControler');

const router=Router();

router.route("/signup").post(SignUp);

router.route("/login").post(UserLogin)

router.route("/library").post(HandleLibrary)

router.route("/library").get(sendUserLibrary)

module.exports=router

