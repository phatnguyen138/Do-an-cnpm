const bcrypt = require('bcrypt')
const User = require('../models/User');
const { use } = require('../routes/auth');
const jwt = require('jsonwebtoken')

const authController = {
    // Register
    registerUser: async(req,res) =>{
        try{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                role: req.body.role
            });

            const user = await newUser.save();
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    //Create access token
    generateLoginToken: (user) =>{
        return jwt.sign({
            id: user.id,
            role: user.role
        },
        process.env.SECRET_KEY,
        {expiresIn: "1d"}
        );
    },

    //Create refresh token
    generateRefreshToken: (user) =>{
        return jwt.sign({
            id: user.id,
            role: user.role
        },
        process.env.REFRESH_KEY,
        {expiresIn: "30d"}
        );
    },

    // Login
    loginUser: async(req,res) => {
        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(404).json('Username is wrong');
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(!validPassword){
                return res.status(404).json('Passwork is wrong');
            }
            if(user && validPassword){
                const accesToken = authController.generateLoginToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                res.cookie("refreshToken",refreshToken,{
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict"
                })

                return res.status(200).json({
                    accesToken: accesToken,
                    refreshToken: refreshToken,
                    role: user.role,
                });
            }
        
        }
        catch(err){
            return res.status(500).json(err)
        }
    },

    //Refresh token 
    refreshTokenRequest: async(req,res) => {
        try{
            refreshToken = req.cookie.refreshToken;

            jwt.verify(refreshToken,process.env.REFRESH_KEY,(err,user)=>{
                if(err){
                    console.log('Refresh key err')
                }

                const newAccessToken = authController.generateLoginToken(user);
                const newrefreshToken = authController.generateRefreshToken(user);

                res.cookie("refreshToken",newrefreshToken,{
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict"
                })

                res.status(200).json({accesToken: newAccessToken});
            })
        }
        catch(err){
            res.status(404)
        }
    },

    //Log out
    logoutUser: async(req,res) => {
        res.clearCookie("refreshToken");

    }
}

module.exports = authController