const slugify=require("slugify")
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");
const Order=require("../models/OrderModel")
const orderCtrl={
    getMyOrders: catchAsync(async (req,res,next)=>{
            const orders=await Order.find({user:req.user._id})
            .sort({createdAt:-1});
            if(!orders||orders.length==0)
            return res.status(200).json({
                message:"You have no orders!",
                orders:[]
            });
            return res.status(200).json({
                orders
            });
    }),
    getOrder: catchAsync(async (req,res,next)=>{
            const order=await Order.findById({
            _id:req.params.id,
            user:req.user._id
            })
            .populate("user","name email");
            if(!order)
            return next(new appError("Order Not Found!",404));
            return res.status(201).json({
                order
            });
    })
}
module.exports=orderCtrl;