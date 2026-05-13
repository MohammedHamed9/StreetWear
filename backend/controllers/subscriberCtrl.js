const slugify=require("slugify")
const Subscriber=require("../models/SubscriberModel");
const appError = require("../utils/appError");
const subscriberCtrl={
    subscribe:async (req,res,next)=>{
        try{
            const email=req.user.email;
            const subscriber=await Subscriber.findOne({email});
            if(subscriber)
                return res.status(400).json({
                message:"the email is updated subscribed"
            });
            const newSubscriber=await Subscriber.create({email});
            return res.status(201).json({
                message:"You are subscribed now✅",
            });
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    }
}
module.exports=subscriberCtrl;