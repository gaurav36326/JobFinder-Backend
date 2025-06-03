const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ['applicant', 'recruiter'],
            message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
        }
    },
    profile: {
        profilePhoto: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
        },
        skills: [String],

    }
})

const User = new mongoose.model("User",userSchema);

module.exports = User;
