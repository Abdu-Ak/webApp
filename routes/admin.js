const express = require('express');
const router = express.Router();
const adminHelp= require('../config/adminHelp')

router.get('/', (req,res)=> {
    adminHelp.getAllUser().then((users)=>{
        let admin=req.session.admin
       if(admin){
        res.render('admin/adminPanel',{users})

       }else{
        res.render('user/userLogin')

    }
    
    })
})


router.get('/addUser',(req,res)=>{
    let session=req.session
    if(session){
        res.render('admin/addUser')

    }else{
        res.redirect('/admin')
    }
   
})

router.get('/deleteUser',(req,res)=>{
    let id=req.query.id

    adminHelp.deleteUser(id).then((response)=>{
        res.redirect('/admin')
    })
    
})

router.get('/editUser/:id',async(req,res)=>{
    let editId=await adminHelp.getUserDetails(req.params.id)


    res.render('admin/editUser',{editId}) 
})


router.post('/editUser/:id',(req,res)=>{
    console.log(req.params.id);
    adminHelp.updateUser(req.params.id,req.body).then(()=>{
        
        res.redirect('/admin')
    })
})







module.exports=router;