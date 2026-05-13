const slugify=require("slugify")
const User=require("../models/UserModel");
const Order=require("../models/OrderModel");
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");
const adminCtrl={
    createUser: catchAsync(async (req,res,next)=>{
            let {name,email,password,role}=req.body;
            const user=await User.findOne({email});
            if(user)
                return next(new appError("this user is already exists!",400));
            const newUser=await User.create({
                name,
                email,
                password,
                role});

            return res.status(201).json({
                message:"New User is created✅",
                user:newUser
            })}),
    updateUser: catchAsync(async (req,res,next)=>{
            const user=await User.findById(req.params.id);
            if(!user)
                return next(new appError("this user is not exists!",404));
            const updatedUser=await User.findByIdAndUpdate({_id:req.params.id},req.body
                ,{new:true,runValidators:true});
            return res.status(200).json({
                message:"the user is updated",
                updatedUser
            })
    }),
    getUser: catchAsync(async (req,res,next)=>{
            let fields="-__v"
            if(req.query.fields)
                fields=req.query.fields.split(",").join(" ")
            const user=await User.findOne({_id:req.params.id,status:true}).select(fields);
            if(!user){
            return next(new appError('this user is not exist!',404));
            }
            return res.status(200).json({
                user
            });
    }),
     getAllUsers:catchAsync(async (req,res,next)=>{
           const users=await User.find({}).sort({createdAt:-1});
             return res.status(200).json({
                users
            })
    }),
    deleteUser:catchAsync(async(req,res,next)=>{
            await User.findByIdAndDelete({_id: req.params.id})
            res.status(204).json({
                message:"the user is deleted successfully"});
    }),
    getAllOrders: catchAsync(async (req,res,next)=>{
                const orders=await Order.find({}).populate("user","name email role")
                return res.status(200).json({
                    orders
                })
        }),
    getOrder: catchAsync(async (req,res,next)=>{
            let fields="-__v"
            if(req.query.fields)
                fields=req.query.fields.split(",").join(" ")
            const order=await Order.find({_id:req.params.id}).select(fields);
            if(!order){
            return next(new appError('this order is not exist!',404));
            }
            return res.status(200).json({
                order
            });
    }),
    updateOrder: catchAsync(async (req,res,next)=>{
                const order=await Order.findById(req.params.id);
                if(!order)
                return next(new appError("this order is not exists!",404));
                if(req.body.status&&req.body.status=='Delivered'){
                    req.body.isDelivered=true
                    req.body.deliveredAt=Date.now()
                }
                 if(req.body.isDelivered&&req.body.isDelivered=='Delivered'){
                    req.body.deliveredAt=Data.now()
                }
                const updatedOrder=await Order.findByIdAndUpdate({_id:req.params.id},req.body,
                    {new:true,runValidators:true}
                ).populate("user");
                return res.status(201).json({
                    message:"the user is updated successfully ✅",
                    updatedOrder
                });
        }),
    deleteOrder: catchAsync(async(req,res,next)=>{
            const order=await Order.findById(req.params.id);
            if(!order)
                return next(new appError("this order is not exists!",404));
            await Order.findByIdAndDelete({_id: req.params.id})
            res.status(204).json({
                message:"the Order is deleted successfully"});
    }),
}
module.exports=adminCtrl;