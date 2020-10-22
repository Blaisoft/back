const express = require('express');
const router = express.Router();
const {requireSignin,isAuth,isAdmin}=require('../Controllers/auth')
const {userById,read,update,purchaseHistory}=require('../Controllers/user')


router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user:req.profile
    })
   // console.log(user)
})


router.get('/user/:userId',requireSignin,isAuth,read)
router.get('/orders/by/user/:userId',requireSignin,isAuth,purchaseHistory)
router.put('/user/:userId',requireSignin,isAuth,update)


router.param('userId',userById)

module.exports = router;
