const { ObjectID } = require("bson");
const { response } = require("../app");
var db = require("./connection");


module.exports={

   getAllUser:()=>{
     return new Promise (async(resolve,reject)=>{
        let users=await db.get().collection('details').find().toArray()
        
        resolve(users)
     })
   },

   deleteUser:(id)=>{
      return new Promise ((resolve,reject)=>{
         db.get().collection('details').deleteOne({_id:ObjectID(id)}).then((response)=>{
            resolve(response)
         })
      })
   },
   
   getUserDetails:(id)=>{
      return new Promise ((resolve,reject)=>{
         db.get().collection('details').findOne({_id:ObjectID(id)}).then((data)=>{
            resolve(data)
         })
      })
   },


   updateUser:(id,userDetail)=>{
      return new Promise((resolve, reject) => {
         db.get().collection('details').updateOne({_id:ObjectID(id)},{
            $set:{
               firstName:userDetail.firstName,
               lastName:userDetail.lastName,
               email:userDetail.email
            }
         }).then((response)=>{
          
            resolve()
         })
      })
   }




}