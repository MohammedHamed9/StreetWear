const slugify=require("slugify")
const appError = require("../utils/appError");
const Checkout = require("../models/CheckoutModel");
const Order=require("../models/OrderModel")
const Cart=require("../models/CartModel")
const checkoutCtrl={
    createCheckout:async (req,res,next)=>{
        try{
            const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body
            if(!checkoutItems ||checkoutItems.length===0)
            return res.status(400).json({
                message:"no items in the checkout!",
            });
            const checkout=await Checkout.create({
               user:req.user._id,
                checkoutItems,
                shippingAddress,
                paymentMethod,
                totalPrice
            })
            return res.status(201).json({
                checkout
            });
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    payCheckout:async (req,res,next)=>{
        try{
        const {paymentDetails,paymentStatus}=req.body
            const checkout=await Checkout.findById(req.params.id);
            if(!checkout)
            return res.status(400).json({
                message:"Checkout Not Found!",
            });
        if(paymentStatus=="paid"){
            checkout.isPaid=true;
            checkout.paymentStatus=paymentStatus
            checkout.paidAt=Date.now();
            checkout.paymentDetails=paymentDetails
            await checkout.save();
            return res.status(200).json({
                checkout
            });
        }    else{
            return res.status(400).json({
                message:"Invalid Payment Status!",
            });
        }
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    //mark it as Finalized and convert it to new order
    finalizeCheckOut:async (req,res,next)=>{
        try{
            const checkout=await Checkout.findById(req.params.id);
            if(!checkout)
            return res.status(404).json({
                message:"Checkout Not Found!",
            });
        if(checkout.isPaid && !checkout.isFinalized){
            const newOrder=await Order.create({
                user:checkout.user,
                orderItems:checkout.checkoutItems,
                shippingAddress:checkout.shippingAddress,
                paymentMethod:checkout.paymentMethod,
                paymentStatus:"paid",
                paymentDetails:checkout.paymentDetails,
                totalPrice:checkout.totalPrice,
                isPaid:true,
                paidAt:checkout.paidAt,
                isDelivered:false,
            });
            checkout.isFinalized=true;
            checkout.finalizedAt=Date.now()
            await checkout.save()

            await Cart.findOneAndDelete({user:req.user._id});
    
            return res.status(200).json({
                newOrder
            });
        }   else if ( checkout.isFinalized){
            return res.status(400).json({
                message:"Checkout is already Finalized!",
            });
        }else{
            return res.status(400).json({
                message:"Checkout is not paid!",
            });
        }
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
}
module.exports=checkoutCtrl;