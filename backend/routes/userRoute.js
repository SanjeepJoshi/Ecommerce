const router = require('express').Router()
const { register, verifyEmail, resendVerification, signIn, editProfile, getUserById } = require('../controller/userController')
const upload = require('../utils/fileUpload')
const { userRules, validationMethod } = require('../utils/ourValidator')


router.post('/register',userRules, validationMethod, register)
router.get('/verifyuser/:token',verifyEmail)
router.post('/resendverification',resendVerification)
router.post('/login',signIn)
router.get('/getuser/:userid',getUserById)
router.post('/editprofile/:userid',upload.single('profileImage'), editProfile)


module.exports = router