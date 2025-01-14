const User = require('../models/userModels')
const Token = require('../models/tokenModel')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const sendEmail = require('../utils/emailSender')
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')

const saltRounds = 10


//register
exports.register = async (req, res) => {
    //take input form user
    const { username, email, password, address } = req.body
    console.log(req.body)

    // check if username is available
    let usernameExists = await User.findOne({ username: username })
    if (usernameExists) {
        return res.status(400).json({ error: "username not available" })
    }
    // check if email is already registered
    let emailExixts = await User.findOne({ email })
    if (emailExixts) {
        return res.status(400).json({ error: "email already registered" })
    }
    //encrypt password
    let salt = await bcrypt.genSalt(saltRounds)
    let hashed_password = await bcrypt.hash(password, salt)
    //register user
    let newUser = await User.create({
        username, email, password: hashed_password, address
    })
    if (!newUser) {
        return res.status(400).json({ error: "user not created" })
    }
    // generate verification token

    // send token in email
    let token = await Token.create({
        token: crypto.randomBytes(16).toString('hex'),
        user: newUser._id
    })
    if (!token) {
        return res.status(400).json({ error: "token not created" })
    }

    const URL = `http://localhost:5173/verifyuser/${token.token}`

    sendEmail({
        from: 'noreply@something.com',
        to: email,
        subject: 'Verify your email',
        text: `Click on this link to verify your email ${URL}`,
        html: `<a href = '${URL}'><button> verify Account</button></a>`

    })
    //send mesage to user
    res.send({ newUser, message: "user registered successfully" })
}

//verify User

exports.verifyEmail = async (req, res) => {
    // check if token is valid or not
    let token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "invalid token or token expires" })
    }
    //find user associated with token
    let user = await User.findOne({ _id: token.user })
    if (!user) {
        return res.status(400).json({ error: "user not found" })
    }

    //check if user is alreafy verified
    if (user.isVerified) {
        return res.status(400).json({ error: "user already verified. Login to xontinue" })
    }
    // verify User
    user.isVerified = true
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "user not verified. try anagin later" })
    }

    //send message to user
    res.send({ message: "user verified successfully" })
}


//resend verification
exports.resendVerification = async (req, res) => {
    //check if email is valid or not
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "email not registered" })
    }
    //check if password is correct or not
    if (!bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).json({ error: "password is incorrect" })
    }

    //check if user is already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "user already verified. login to continue" })
    }
    //generate token
    let token = await Token.create({
        user,
        token: crypto.randomBytes(16).toString('hex')
    })
    if (!token) {
        return res.status(400).json({ error: "token not generated" })
    }
    //send token in email
    const URL = `http://localhost:5173/verifyuser/${token.token}`

    sendEmail({
        from: 'noreply@something.com',
        to: req.body.email,
        subject: 'Verify your email',
        text: `Click on this link to verify your email ${URL}`,
        html: `<a href = '${URL}'><button> verify Account</button></a>`

    })
    //send messafe to user
    res.send({ message: "token sent to your email. verify your email to continue" })
}


//login/signup
exports.signIn = async (req, res) => {
    let { email, password } = req.body
    //check email if registered or not
    let user = await User.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ error: "User not found. Please signup first" })
    }
    // check password if correct or not
    let isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ error: "Password is incorrect. please try again" })
    }
    // check if user is verified or not
    if (!user.isVerified) {
        return res.status(400).json({ error: "Your account is not verified. Please check again" })
    }
    // //generate login token
    let token = jwt.sign({
        id: user._id,
        email,
        role: user.role,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: '24hr' })
    //set login data in cookies
    res.cookie('mycookie', token, { expiresIn: 86400 })
    // send tooken to user
    res.send({ message: "login successfully", user: { id: user._id, email, username: user.username, profileImage:user.profileImage }, token })
    // res.send({message: "login successfully",user:{id:user._id,email,username:user.username }})
}


//get user by id
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.userid;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user" });
    }
}

//profileeee
exports.editProfile = async (req, res) => {
     // Extract the file name without the full path (just the file name)
    // const imageName = req.file.filename;  // This will give you just the filename, e.g., "fav-1732968603927.png"

    let user = await User.findByIdAndUpdate(req.params.userid, {
        profileImage: req.file?.filename, //req.file.path
        username: req.body.username,
        phone: req.body.phone,
        address : req.body.address,
    })
    if (!user) {
        return res.status(400).json({ error: "User not found. Please signup first" })
    }
    else {
        return res.status(200).json({ message: "Profile updated successfully" })
    }
}
