const jwt   = require("jsonwebtoken");
const appError = require("../utils/appError")
const User=require("../models/UserModel")
const authCtrl={
    protected:async (req,res,next)=>{
      try{
          let token;
          if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token=req.headers.authorization.split(" ")[1];
          } else if(req.cookies && req.cookies.jwt){
            token=req.cookies.jwt;
          }

          if(!token || token === 'logout')
            return next(new appError("You are not loged in!",400));

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const currentUser=await User.findById(decoded.id);

        if(!currentUser)
            return next(new appError("this user is no longer exist",400))
        
        if(currentUser.passwordChanedAt){
           let passwordChangedAtTimeStamp= 
           parseInt(currentUser.passwordChanedAt.getTime()/1000,10)
           if(passwordChangedAtTimeStamp>decoded.iat)
            return next(new appError("You have changed your password please login again",400))
        }
        req.user=currentUser;
        next();
      }catch(err){
        console.log(err);
        next(new appError("somthing went wrong!",500))
      }

    },
    restrictedTo:(...roles)=>{
        return (req,res,next)=>{
            if(!roles.includes(req.user.role))
                return next(new appError("SORRY U CANT ACCESS THIS ROUTE !",403))
            next();
        }
    }
}
module.exports=authCtrl