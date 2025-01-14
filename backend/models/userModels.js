const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    phone:{
        type: String,
        default:"989899898"
    },
    address: {
        type: String,
        trim: true,
    },
    profileImage:{
        type: String,
        default: "pro.jpg",
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},{timestamps:true})


module.exports = mongoose.model("User" , userSchema)