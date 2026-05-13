const jwt=require("jsonwebtoken");
const crypto=require("crypto")
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");
const User=require("../models/UserModel");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const sendEmail=require("../utils/sendEmail")
const signToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.EXPIRE_DATE
    });
}
const createCooki=(token,res)=>{
    const cookieObt={
        expires:new Date(Date.now()+90*24*60*60*1000),
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production'
    }
    res.cookie('jwt',token,cookieObt)
}
const usetCtrl={
    resgister: catchAsync(async(req,res,next)=>{
            console.log(req.body);
            const {name,email,password}=req.body;
            const oldUser=await User.findOne({email});
            if(oldUser)
                return next(new appError("User already exists", 400));
            const user=await User.create(req.body);
            const token=signToken(user.id);
            return res.status(201).json({
                message:'Welcome to out store',
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
            if(!oldUser||!await oldUser.matchPasswords(password,oldUser.password))
             return  next(new appError("Invalid Credentails", 400));
            const token=signToken(oldUser.id);
            createCooki(token,res);
            let user={
            id:oldUser._id,
            name:oldUser.name,
            email:oldUser.email,
            role:oldUser.role
            }
            return res.status(200).json({
                message:`welcome ${oldUser.name}`,
                user,
                token
            });
    }),
    logout: catchAsync(async(req,res,next)=>{
        res.cookie('jwt','logout',{
        expires:new Date(Date.now()+10*1000),
        httpOnly:true
   });
   res.status(200).json({
    message:'loggedout successfully..'
   });
    }),
    getMe: catchAsync(async(req,res,next)=>{
            return res.status(200).json({
                message:`welcome `,
                User:req.user
            });
    }),
    updateMe: catchAsync(async(req,res,next)=>{ 
            console.log(req.body);
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
            return next(new appError('This user is not found!',404));
        }
        let resetToken=user.createResetToken();
        const restUrl=`${req.get('host')}://streetwear/user/reset-password/${resetToken}`
        await user.save();
        sendEmail({ 
            email,
            subject:"password Reset , Your password reset token (valid for only 10 minutes)",
           html: `<b>Hi ${user.name} ,<br>
        Forgot your password? 
        Submit a PATCH request with your new password to:<br> ${restUrl}<br>
        If you didn't forget your password, please ignore this email!<br>
        thank you.</b>`});
          res.status(200).json({
            message:'the email is sent...'
        })
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
        createCooki(token,res);
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
