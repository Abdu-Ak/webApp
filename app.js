// required modules //
const express = require("express");
const path=require("path");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const exphbs=require('express-handlebars');
const app = express();
const db=require('./config/connection');
const { done } = require("express-hbs/lib/resolver");



//setting view engine//
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));
app.engine('hbs',exphbs.engine({extname:'hbs',defaultLayout: 'layout',layoutsDir:__dirname+'/views/layout',  partialsDir:__dirname+'/views/partials/' }))
 



// session and cookie
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


  
//to prevent cache storing

app.use((req, res, next) => {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next()
})

// parsing the incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


db.connect((err)=>{
    if(err) console.log('connection error'+err)
    else console.log('database conected') 
});


app.use('/',userRouter);


app.use('/admin',adminRouter);

 
//serving public file
app.use(express.static(__dirname));


module.exports=app;
//server creating//
app.listen(3000);