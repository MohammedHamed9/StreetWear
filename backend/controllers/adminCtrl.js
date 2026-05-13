const slugify=require("slugify")
const User=require("../models/UserModel");
const Order=require("../models/OrderModel");
const appError = require("../utils/appError");
const adminCtrl={
    createUser:async (req,res,next)=>{
        try{
            let {name,email,password,role}=req.body;
            const user=await User.findOne({email});
            if(user)
            return res.status(400).json({
                message:"this user is already exists!",
                user
            });

            const newUser=await User.create({
                name,
                email,
                password,
                role});

            return res.status(201).json({
                message:"New User is created✅",
                user:newUser
            });
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    updateUser:async (req,res,next)=>{
        try{
            const user=await User.findById(req.params.id);
            if(!user)
            return res.status(400).json({
                message:"this user is not exists!",
            });
            const updatedUser=await User.findByIdAndUpdate({_id:req.params.id},req.body
                ,{new:true,runValidators:true});
            return res.status(200).json({
                message:"the user is updated",
                updatedUser
            })
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    getUser:async (req,res,next)=>{
        try{
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
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
     getAllUsers:async (req,res,next)=>{
        try{
           const users=await User.find({}).sort({createdAt:-1});

             return res.status(200).json({
                users
            })
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    deleteUser:async(req,res,next)=>{
        try{
            await User.findByIdAndDelete({_id: req.params.id})

            res.status(204).json({
                message:"the user is deleted successfully"});
        }
        catch(error){
            console.log(error);
            next(new appError('somthing went wrong!',500));
        }
    },

    getAllOrders:async (req,res,next)=>{
            try{
                const orders=await Order.find({}).populate("user","name email role")
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
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    updateOrder:async (req,res,next)=>{
            try{
                const order=await Order.findById(req.params.id);
                if(!order)
                return res.status(404).json({
                    message:"this order is not exists!"
                });
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
            }catch(error){
                console.log(error);
                next(new appError(error));
            }
        },
    deleteOrder:async(req,res,next)=>{
        try{
            const order=await Order.findById(req.params.id);
            if(!order)
                return res.status(404).json({
                message:"the Order is not found!"});
        
            await Order.findByIdAndDelete({_id: req.params.id})

            res.status(204).json({
                message:"the Order is deleted successfully"});
        }
        catch(error){
            console.log(error);
            next(new appError('somthing went wrong!',500));
        }
    },
}
module.exports=adminCtrl;