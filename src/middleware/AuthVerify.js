const jwt = require('jsonwebtoken');


module.exports = (req, res, next)=>{
    const token = req.headers['token'];
    jwt.verify(token, 'sirajul@123',(error,decoded)=>{
        if(error){
            res.status(401).json({status:'unauthorized'})
        }else{
             let email = decoded.data.email
            
              req.headers.email = email
            next();
        }
    })
}

