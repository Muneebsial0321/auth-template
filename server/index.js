require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookie = require("cookie-parser")
const db = require('./db/db')
db()


// decalrations end

// middleware
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin: process.env.FRONT_URL, // Your frontend URL
    credentials: true
}));
// middleware end

// routes  //
app.use('/user',require('./Routes/signin'))
app.use('/login',require('./Routes/login'))
app.use('/pri',require('./Routes/private'))
// routes end //

//server
app.listen(process.env.PORT,()=>{
    console.log("working")
})