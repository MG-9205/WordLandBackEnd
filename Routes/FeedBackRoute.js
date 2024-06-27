const {FeedBackHandler}=require('../controler/FeedBackController')
const {Router}=require('express')

const route=Router();

route.route('/').post(FeedBackHandler);

module.exports=route;
