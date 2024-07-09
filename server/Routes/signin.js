const express = require('express')
const app = express.Router()
const User = require('../Modals/UserSchema')
const jwt = require('jsonwebtoken');
const cookie = require("cookie-parser")
const setAlert = require('../Modules/alert')

// fetch all users  http://localhost:3000/user/getall
app.get('/getall', async (req, res) => {
    const data = await User.find({})
    res.json(data)
})

// insert a users  http://localhost:3000/user/signin
app.post('/signin', async (req, res) => {

    const { name, email,password } = req.body
    console.log(req.body)
    const User_ = new User(
        {
            name, email,password
        })
    try {

        const response = await User_.save()
        const data = {

            id: email

        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);    
        res.cookie('jwt', authtoken,{ httpOnly: true, secure: false })//for production set to true
        res.cookie('auth',true)
        res.status(201).json(setAlert(true,true,'success',"user was Created successfully"));
    }
    catch (e) {
        console.log("error \n", e)

    }
})


module.exports = app
