const mongoose = require('mongoose')

const mongoUrl = 'mongodb://127.0.0.1:27017' || process.env.MONGODB_URI

const dbConnection = async()=>{
    let con = await mongoose.connect(mongoUrl)
    console.log("connection succesful")
   
}

module.exports = dbConnection

