var express= require('express');
var router = express.Router();
var userHelp=require('../config/userHelp')
const invalid= 'Invalid username or password !'

router.get('/',(req,res)=>{
    let user= req.session.user
    if(user){
        res.render('user/userHome')
    

    }else{
         res.render('user/userLogin')
    }
    
})

router.get('/signup',(req,res)=>{
    let user= req.session.user
    if(user){
        res.render('user/userHome')
    }else{
    res.render('user/userSign')
    }
})


router.get('/home',(req,res)=>{
    let user= req.session.user
    if(user)
    res.render('user/userHome')
    else{
        res.render('user/userLogin')

    }
})

router.post('/submit',(req,res)=>{
    console.log(req.body)
    userHelp.doSignup(req.body).then((data)=>{
       
        
     res.redirect('/admin')
    }) 
    
})
router.post('/login',(req,res)=>{

    userHelp.doLogin(req.body).then((response)=>{
        
        if(response.status){
          req.session.loggedIn=true
          req.session.admin =response.admin
          response.user.admin=response.admin
          req.session.user=response.user  
               if(response.admin){
                res.redirect('/admin')
                console.log(response)
               }else{
                res.redirect('/')
                console.log('user homepage');

               }
            
        }else{
            res.render('user/userLogin',{invalid})
        }
    })

})
    
router.get('/logout',(req,res)=> {
    req.session.destroy()
    res.redirect('/')
})
    
    
   


module.exports=router;