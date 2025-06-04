const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {


    const { fullname, email, number, password, role } = req.body;

    if (!fullname || !email || !number || !password || !role) {
        return res.status(400).json({
            message: "All feilds are mandatory",
            sucess: false
        })
    }

    let user = await User.findOne({ email });

    if (user) {
        return res.status(409).json({
            message: "User already exist with this email",
            sucess: false
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    user = await new User({ fullname, email, number, password: hashPassword, role });

    try {
        await user.save();
        const token = jwt.sign({
            id: user._id,
        }, process.env.Secret_Key,
            {
                expiresIn: '1d'
            });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.json({ message: "User created successfully", success: true });
    } catch (err) {
        return res.status(400).json({ message: "Error while creating user", error: err, success: false });
    }
}

const signIn = async (req, res) => {
    console.log(req.body);

    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({
            message: "All feilds are mandatory",
            sucess: false
        })
    }

    let user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User dosn't exist",
            sucess: false
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Password doesn't match",
            sucess: false
        })
    }

    if (user.role != role) {
        return res.status(401).json({
            message: "No such account exist with this role",
            sucess: false
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.Secret_Key,
        {
            expiresIn: '1d'
        });

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        message: `Welcome back ${user.fullname}`,
        sucess: true
    })


}

const signOut = (req, res) => {

    res.cookie("token", null, { maxAge: 0 });
    return res.status(200).json({
        message: `Sign out sucessfull`,
        sucess: true
    })
}


module.exports = {
    signUp,
    signIn,
    signOut
}