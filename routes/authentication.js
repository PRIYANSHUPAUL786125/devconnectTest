const express=require('express');
const router=express.Router();
const authentication=require('../controllers/authentication')
router.get('/signup',authentication.signup);
router.get('/login',authentication.login);
router.post('/signup',authentication.signupPost);
router.post('/login',authentication.loginPost);
router.get('/home',authentication.home)
module.exports=router;