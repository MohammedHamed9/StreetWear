const slugify=require("slugify")
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");
const { deleteCache } = require("../utils/cache");
const Checkout = require("../models/CheckoutModel");
const Order=require("../models/OrderModel")
const Cart=require("../models/CartModel")
const checkoutCtrl={
    createCheckout: catchAsync(async (req,res,next)=>{
            const {checkoutItems,shippingAddress,paymentMethod,totalPrice}=req.body
            if(!checkoutItems ||checkoutItems.length===0)
            return next(new appError("No checkout items provided!",400));
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
    }),
    payCheckout: catchAsync(async (req,res,next)=>{
        const {paymentDetails,paymentStatus}=req.body
            const checkout=await Checkout.findById(req.params.id);
            if(!checkout)
            return next(new appError("Checkout Not Found!",404));
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
    }),
    //mark it as Finalized and convert it to new order
    finalizeCheckOut: catchAsync(async (req,res,next)=>{
            const checkout=await Checkout.findById(req.params.id);
            if(!checkout)
            return next(new appError("Checkout Not Found!",404));
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
            await deleteCache("all-orders");
            await deleteCache(`my-orders:${req.user._id}`);
            return res.status(200).json({
                newOrder
            });
        }   else if ( checkout.isFinalized){
            return next(new appError("Checkout is already Finalized!",400));
        }else{
            return next(new appError("Checkout is not paid yet!",400));
        }
    }),
}
module.exports=checkoutCtrl;