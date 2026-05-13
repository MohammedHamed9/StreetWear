const slugify=require("slugify")
const Subscriber=require("../models/SubscriberModel");
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");

const subscriberCtrl={
    subscribe:catchAsync(async (req,res,next)=>{
            const email=req.user.email;
            email="google.com" // for testing only
            const subscriber=await Subscriber.findOne({email});
            if(subscriber)
            return next(new appError("the email is already subscribed",400));
            
            const newSubscriber=await Subscriber.create({email});
            return res.status(201).json({
                message:"You are subscribed now✅",
            });
    })  
}
module.exports=subscriberCtrl;