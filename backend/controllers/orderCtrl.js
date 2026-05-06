const slugify=require("slugify")
const appError = require("../utils/appError");
const Order=require("../models/OrderModel")
const orderCtrl={
    getMyOrders:async (req,res,next)=>{
        try{
            const orders=await Order.find({user:req.user._id})
            .sort({createdAt:-1});
            if(!orders||orders.length==0)
            return res.status(200).json({
                message:"You have no orders!",
            });
            return res.status(200).json({
                orders
            });
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    getOrder:async (req,res,next)=>{
        try{
            const order=await Order.findById(req.params.id)
            .populate("user","name email");
            if(!order)
            return res.status(404).json({
                message:"Not Found Order!",
            });
            return res.status(201).json({
                order
            });
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    }
}
module.exports=orderCtrl;