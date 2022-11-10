const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendEmail = require("../utils/sendEmail")
const user = require('../models/userModel');
const sendToken = require("../utils/jwtToken");
const bcrypt = require('bcryptjs')
const path =require("path")
//Register User
exports.registerUser = catchAsyncError(async(req,res,next)=>{
    console.log(req.body)
    const {name,email,password,} = req.body
    const users = await user.create({
        name,email,password,
        avatar:{
            public_id:"this is sample id",
            url:"url.com"
        }
    });

    sendToken(users,201,res)
   
})


//Login User

exports.loginUser = catchAsyncError(async (req,res,next)=>{
    const {email,password}=req.body;

    //checking if user has given password and email both 

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Pasword",400))
    }

    const User = await user.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    
    const isPasswordMatched = await User.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password",401))
    }

    sendToken(User,200,res)
})

//LogOut User
exports.logout = catchAsyncError(async (req,res,next)=>{
    
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true 
    })
    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})


//Forgot Password
exports.forgotPassword = catchAsyncError(async (req,res,next)=>{
    const User = await user.findOne({email:req.body.email})
    console.log(User)

    if (!User) {
        return next(new ErrorHandler("User not Found",404))
    }


    //Get ResetPassword Token
    const resetToken = await User.getResetPasswordToken();
    console.log(resetToken)

    await User.save({validateBeforeSave:false})


    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/forgot/reset`

    const message  = `Your  password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it`;

    try {
    
        await sendEmail.sendEmail({
            email:User.email,
            subject:`Ecommerce Password Recovery`,
            message:message
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${User.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;    
        user.resetPasswordExpire = undefined;
       
    await User.save({validateBeforeSave:false})

    next(new ErrorHandler(error.message,500))
    }

})
exports.resetPassword = catchAsyncError(async (req,res,next)=>{
    return res.sendFile(path.join(__dirname+'/abhi.html'));
})
exports.register = catchAsyncError(async (req,res,next)=>{
    return res.sendFile(path.join(__dirname+'/singup.html'));
})
exports.resetPasswords = catchAsyncError(async (req,res,next)=>{
   const password = await bcrypt.hash(req.body.password,10)
   const User = await user.findByIdAndUpdate(req.params.id,{password:password})
   return res.sendFile(path.join(__dirname+'/shek.html'));
})

