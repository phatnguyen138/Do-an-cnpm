const jwt = require('jsonwebtoken')

const secretkeyController = {
    verifyToken: (req,res,next) => {
        const token = req.headers.token;
        if(token){
            const accesToken = token.split(" ")[1];
            jwt.verify(accesToken, process.env.SECRET_KEY,(err,user)=>{
                if(err){
                    res.status(403).json("Token is not valid")
                }
                req.user = user;
                next();
            });
        }
        else{
            res.status(401).json('Not authentication')
        }
    }
}

module.exports = secretkeyController