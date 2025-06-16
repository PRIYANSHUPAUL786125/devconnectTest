const user=require('../models/user');
const bcrypt=require('bcryptjs');
const signup=(req,res)=>{
    res.render('signup');
}
const login=(req,res)=>{
    res.render('login')
}
const signupPost=async (req,res)=>{
    let {username,email,password}=req.body;
    let hashedPass=await bcrypt.hash(password,12)
    const existingUser=await user.findOne({email:email});
    if(existingUser){
       return res.redirect('/login');
    }
    else{
        const data=await user.create({
            username,email,password:hashedPass
        })
        console.log(data)
    }
    res.redirect('/signup');
}
const loginPost=async (req,res)=>{
    const {email,password}=req.body;
    const prevUser=await user.findOne({email});
    if(prevUser){
        let isReal=await bcrypt.compare(password,prevUser.password);
        if(isReal){
            res.redirect('/home');
        }
    }
    else{
        res.redirect('/signup');
    }
}
const home=(req,res)=>{
    res.send('welcome');
}
module.exports={signup,login,signupPost,loginPost,home}