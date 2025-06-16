const express=require('express');
const app=express();
const authRoute=require('./routes/authentication');
const connectDB=require('./config/db');
connectDB();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(authRoute);
app.listen(3000);