var db = require("./connection");
const bcrypt = require("bcrypt");



module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.get()
        .collection('details')
        .insertOne(userData)
        .then((data) => {
          resolve(data);
        });
    });
  },
  

   doLogin: (userData) => {
  
    return new Promise (async (resolve, reject) =>{
      let loginstatus =false;
      let response ={};
      let user = await db. get(). collection('details').findOne({email: userData.email});
      if(user){
        bcrypt.compare(userData.password, user.password).then((status) =>{
          if(status) {
            console.log('login success');
            
            resolve({status: true, admin: user?.admin || false, user});
            
          }else{
            console.log('login failed');
            resolve({status : false})
          }
        });
      }else {
          console.log('login-failed');
            resolve({status : false})
      }
    })
   }





};

