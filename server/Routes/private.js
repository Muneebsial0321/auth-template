const express = require('express')
const app = express.Router()
const User = require('../Modals/UserSchema')
const jwt = require('jsonwebtoken');
const alert = require('../Modules/alert');
const myMiddleware = require('../Middleware/myMiddleware');
const cookieParser = require('cookie-parser');
app.use(cookieParser())



// fetch all users  http://localhost:3000/pri
app.get('/', myMiddleware, async (req, res) => {

    const data = await User.find({email:req.user})
    if(data.length==1){
        res.json({auth:true,id:data[0].email})
    }
    else{
        res.json(alert(false,true,"error","private page requires login"))
    }

    
})




module.exports = app
