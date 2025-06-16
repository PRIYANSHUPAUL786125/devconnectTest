const express=require('express');
const app=express();
const authRoute=require('./routes/authentication');
const connectDB=require('./config/db');
connectDB();
const session=require('express-session');
const MongoStore = require('connect-mongo');
app.use(session({
    secret:'paulSecret',
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
            mongoUrl: 'mongodb://127.0.0.1:27017/devconnectTest',
            collection:'sessions'
    }),
    cookie:{
        maxAge:1000*60*60*24//1day
    }
}))
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(authRoute);
app.listen(3000);