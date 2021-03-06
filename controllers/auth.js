const Auth=require('../models/user')
const jwt=require('jsonwebtoken')//to generate signed token
const expressJwt=require('express-jwt')//for authorization check
const {errorHandler}=require('../helpers/dbErrorHandler')



//======================================start signup=============================
exports.signup=(req,res)=> {
    console.log("req.body", req.body)
    const user = new Auth(req.body)

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            })

        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        })
    })
}
//=================================end signup===========start signin===========================
exports.signin = (req, res) => {
    //find the user based on email
    const {email, password} = req.body
    Auth.findOne({email}, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "user with that email does not exist.please signup"
            })
        }
        //if user is found makesure the email and password match
        //create authenticate method in user model
        if (!user.authenticate(password)) {

            return res.status(401).json({
                error: "Email and Password do not match"
            })
        }


        //generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        //persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to frontend client
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, email, name, role}})
    })

}

//=================================end signin=======start signout=======================================

exports.signout =(req,res)=>{
    res.clearCookie('t')
    res.json({message:"Signout sucess"})
}
//==========================================start requiresignin============================================================
require('dotenv').config()
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth"
});

//================================auth control======================================
exports.isAuth=(req,res,next)=>{
    let user=req.profile && req.auth && req.profile._id == req.auth._id

    if(!user){

        return res.status(403).json({
            error:"Access denied auth",
        })

    }
    next()
}


/* check if user is authenticated */
// exports.isAuth = (req, res, next) => {
//     /* id we have user that will send id and is auth */
//     let user = req.profile && req.auth && req.profile._id == req.auth._id;
//
//     // console.log('req.profile:'+req.profile);
//     // console.log('authreq.auth:', req.auth);
//     // console.log('idreq.profile', req.profile);
//     // console.log('user', user);
//     if (!user) {
//         return res.status(403).json({
//             errors: [
//                 {
//                     msg: 'Access Denied',
//                 },
//             ],
//         });
//     }
//     next();
// };

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"Admin ressource!Access denied"
        })
    }
    next()
}

