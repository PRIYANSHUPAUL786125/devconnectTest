const express=require('express');
const router=express.Router();
const authentication=require('../controllers/authentication')
router.get('/signup',authentication.signup);
router.get('/login',authentication.login);
module.exports=router;