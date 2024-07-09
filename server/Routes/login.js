const express = require('express')
const app = express.Router()
const User = require('../Modals/UserSchema')
const jwt = require('jsonwebtoken');
const alert = require('../Modules/alert');



// fetch all users  http://localhost:3000/login
app.post('/', async(req, res) => {

    
    const {email,password} = req.body
    console.log(req.body)
    
    try{

        const data = await User.find({email,password})

        
        const payload = {
              id: email 
          }
          const authtoken = jwt.sign(payload,process.env.JWT_SECRET);
          if(data.length==1){


              res.cookie('jwt',authtoken,{ httpOnly: true, secure: false })
              res.cookie('auth',true)


              res.json(alert(true,true,"success","Loged in"))
            }
            else if(data.length==0){

                res.json(alert(false,true,"error","Invalid Credentials"))
            }
          
    
    }
    
    catch(e){
    
        console.error(e)
    
    }
})




module.exports = app
