const express=require('express')
const router=express.Router()
const Auth=require('../models/user')
const expressJwt=require('express-jwt')//for authorization check
const jwt=require('jsonwebtoken')//to generate signed token


//import controller
const {userSignupValidator}=require('../validator/index')
const {signup,signin,signout,requireSignin}=require('../controllers/auth')
//connect controller to route
router.post('/signup',userSignupValidator,signup)
router.post('/signin',signin)
router.get('/signout',signout)


// router.get('/hello',requireSignin,(req,res)=>{
//     res.send('hello there')
// })

module.exports=router