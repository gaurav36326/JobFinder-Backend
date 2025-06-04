const jwt = require('jsonwebtoken');
const User = require('../models/user');


const userAuthantication =async (req,res,next)=>{

    console.log(req.cookies);
    

    const token = req?.cookies?.token;

    if(!token){
        return res.status(400).json({
                message: "Invalid Token, Please Login",
                sucess: false
        })
    }

    const decodedValue =await jwt.verify(token,process.env.Secret_Key);

    if(!decodedValue){
        return res.status(400).json({
                message: "Invalid Token, Please Login",
                sucess: false
        })
    }

    const {id} = decodedValue;

    const user =await User.findOne({_id:id});

    if(!user){
        return res.status(400).json({
                message: "User donst exist",
                sucess: false
        })
    }

    req.user = user;

    next();
    
}

module.exports = userAuthantication;