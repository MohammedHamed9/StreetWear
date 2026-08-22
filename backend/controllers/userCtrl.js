const jwt=require("jsonwebtoken");
const crypto=require("crypto")
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");
const User=require("../models/UserModel");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const sendEmail=require("../utils/sendEmail");
const createCookie = require("../utils/createCookie");
const logger = require("../utils/logger");
const signToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.EXPIRE_DATE
    });
}

const usetCtrl={
    resgister: catchAsync(async(req,res,next)=>{
            const {name,email,password}=req.body;
            const oldUser=await User.findOne({email});
            if(oldUser)
                return next(new appError("User already exists", 400));
            const user=await User.create(req.body);
            const token=signToken(user.id);
            createCookie(token,res);
            logger.info({
                message:`New user registered: ${user.name} `,
                userId:user._id,
                email:user.email
            });
            return res.status(201).json({
                message:`Welcome ${user.name}`,
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    addresses:user.addresses
                },
                token
            });
    }),
    login: catchAsync(async(req,res,next)=>{
            const{email,password}=req.body
            const oldUser=await User.findOne({email})
            if(!oldUser||!await oldUser.matchPasswords(password,oldUser.password)){
                logger.warn({
                    message:`Failed login attempt for email: ${email}`,
                    ip:req.ip,
                    userAgent:req.headers['user-agent']
                });
                return  next(new appError("Invalid Credentails", 400));
            }
            const token=signToken(oldUser.id);
            createCookie(token,res);
            let user={
            id:oldUser._id,
            name:oldUser.name,
            email:oldUser.email,
            role:oldUser.role
            }
            logger.info({
                message:`User logged in: ${oldUser.name} `,
                userId:oldUser._id,
                email:oldUser.email
            });
            return res.status(200).json({
                message:`welcome ${oldUser.name}`,
                user,
                token
            });
    }),
    logout: catchAsync(async(req,res,next)=>{
        res.cookie('jwt','logout',{
        expires:new Date(Date.now()+10*1000),
        httpOnly:true,
        sameSite:
        process.env.NODE_ENV === "production"? "none": "lax"
   });
   res.status(200).json({
    message:'loggedout successfully..'
   });
    }),
    getMe: catchAsync(async(req,res,next)=>{
           const user=await User.findById(req.user.id).select('name email role addresses avatar phone');
        return res.status(200).json({
                message:`welcome ${req.user.name}`,
                user
            });
    }),
    updateMe: catchAsync(async(req,res,next)=>{ 

         if(req.file){
            let result=await uploadToCloudinary(req.file.buffer,"users");
            req.body.avatar=result.url;
        }
        const user=await User.findByIdAndUpdate(req.user.id,req.body,{
            new:true,
            runValidators:true
        });
            return res.status(200).json({
                message:`your data is successfully updated.`,
                user
            });
    }),
    forgetPassword: catchAsync(async(req,res,next)=>{
        const email=req.body.email;
         const user=await User.findOne({email});
        if(!user){
            return res.status(200).json({
            message:'If the account exists, a reset email has been sent'
        })
        }
        let resetToken=user.createResetToken();
        //const restUrl=`${req.get('host')}://streetwear/user/reset-password/${resetToken}`
        await user.save();
        sendEmail({ 
            email,
            subject:"password Reset , Your password reset token (valid for only 10 minutes)",
           html: `Hi <b >${user.name},</b><br>
           Someone is attempting to reset the password on your account.<br><br>
           <b>When:</b> ${new Date().toLocaleString('en-US', { timeZoneName: 'short' })}<br>
           <b>Device:</b> ${req.headers['user-agent'] || 'Unknown Device'}<br>
           <b>Near:</b> Cairo Governorate, Egypt<br><br>
           If this was you, your verification code is:<br><br>
           <span style="font-size: 24px;"><b>${resetToken}</b></span><br><br>
           If you didn't request this, please ignore this email safely.`});
        res.status(200).json({
            message:'If the account exists, a reset email has been sent'
        })
    }),
    checkResetToken: catchAsync(async(req,res,next)=>{
        const hashToken=crypto.createHash("sha256").update(req.body.token).digest('hex');
        const user=await User.findOne({
            passwordRestToken:hashToken,
            passwordRestExpires:{$gte:Date.now()}
        });
        if(!user){
            return next(new appError('Invalid Token or its expired',404));
        }
        res.status(200).json({
            message:'The token is valid, you can reset your password now.'
        });
    }),
    resetPassword: catchAsync(async(req,res,next)=>{
        const hashToken=crypto.createHash("sha256").update(req.params.token).digest('hex');
        const user=await User.findOne({
            passwordRestToken:hashToken,
            passwordRestExpires:{$gte:Date.now()}
        });
        if(!user){
            return next(new appError('Invalid Token or its expired',404));
        }

        user.password=req.body.password;
        user.passwordRestToken=undefined;
        user.passwordRestExpires=undefined;
        await user.save();
        const token =signToken(user._id)
        createCookie(token,res);
        res.status(200).json({
            message:'The password is updated successfully..',
            token
        });
    }),
    updatePassword: catchAsync(async(req,res,next)=>{
        const oldPassword=req.body.password;
        const newPassword=req.body.newPassword;
        
        if(!await req.user.matchPasswords(oldPassword,req.user.password)){
            return next(new appError('Invalid Credentails',400));
        }

        req.user.password=newPassword;
        req.user.passwordChanedAt=Date.now();
        await req.user.save();
        res.status(200).json({
            message:'the password is updated successfully..'
        });
    }),
}
module.exports=usetCtrl;
