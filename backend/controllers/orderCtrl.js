const slugify=require("slugify")
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");
const Order=require("../models/OrderModel")
const { getCache, setCache, deleteCache } = require("../utils/cache");

const orderCtrl={
    getMyOrders: catchAsync(async (req,res,next)=>{
            const cacheKey = `my-orders:${req.user._id}`;
            const cached = await getCache(cacheKey);
            if(cached){
              return res.status(200).json({orders: cached});
            }
            const orders=await Order.find({user:req.user._id})
            .sort({createdAt:-1});
            
            const response = orders && orders.length > 0
              ? { orders }
              : { message:"You have no orders!", orders: [] };
            await setCache(cacheKey, response);
            return res.status(200).json(response);
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