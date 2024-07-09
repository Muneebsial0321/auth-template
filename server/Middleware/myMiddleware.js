
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const alert = require('../Modules/alert');


const myMiddleware =(req,res,next) => {
  
    const string= req.cookies.jwt
    try{

        const data = jwt.verify(string, JWT_SECRET);
        req.user = data.id;
        next()
    }
    catch{
        res.json(alert(false,true,"error","private page requires login"))
   
    }

}

module.exports = myMiddleware