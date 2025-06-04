const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();



const getUser = (req, res) => {
    res.json({ "message": "profile page", "data": req.user });
}

const updateUser =async (req, res) => {

    console.log(req.body);
    
    const allowedEditFeilds = ["fullname", "profile", "profilePhoto", "bio", "skills"];

    Object.keys(req.body).forEach(
        key => {
        if (!allowedEditFeilds.includes(key)) {
            return res.status(400).json({
                message: "Invalid feilds",
                sucess: false
            })
        }
    });

    if(req.body.skills){
        const arr = req.body.skills.split(",");
        req.body.skills=arr;
    }
    


    const id = req.user._id;

    try {
        const updatedUser = await User.findOneAndUpdate({_id : id},req.body,{new : true});
        return res.status(200).json({
                message: "User updation sucessfull",
                updatedUser,
                sucess: true
        })

    } catch (error) {
        return res.status(400).json({
                message: "Error while updating user",
                sucess: false
            })
    }
    
}


module.exports = {
    getUser,
    updateUser
}