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
        });
        req.session.isLoggedIn=true;
        console.log(data)
    }
    res.redirect('/login');
}
const loginPost=async (req,res)=>{
    const {email,password}=req.body;
    const prevUser=await user.findOne({email});
    if(prevUser){
        let isReal=await bcrypt.compare(password,prevUser.password);
        if(isReal){
            req.session.isLoggedIn=true;
            return res.redirect('/home');
        }
    }
    else{
        res.redirect('/signup');
    }
}
const home=(req,res)=>{
    if(req.session.isLoggedIn){
        res.render('home');
    }
    else{
        res.send('first login then enter');
    }
}
module.exports={signup,login,signupPost,loginPost,home}