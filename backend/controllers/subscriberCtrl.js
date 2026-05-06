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
    },
    updateCategory:async (req,res,next)=>{
        try{
             const c = await Category.findById(req.params.id);
            if(!c){
                return next(new appError('the category is not exist!',404));
            }

            const admin_update_id=req.user._id;
            req.body.admin_update_id=admin_update_id;
            if(req.body.name)
            req.body.slug=slugify(req.body.name);

            const category=await Category.findByIdAndUpdate({_id:req.params.id},req.body,{
                new:true,
                runValidators:true
            });
            return res.status(200).json({
                message:"the category is updated successfully✅",
                category
            });
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    getCategory:async (req,res,next)=>{
        try{
            let fields="-__v"
            if(req.query.fields)
                fields=req.query.fields.split(",").join(" ")
            const category=await Category.find({_id:req.params.id,status:true}).select(fields);
            if(!category){
            return next(new appError('this category is not exist!',404));
            }
            
            return res.status(200).json({
                category
            });
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
     getAllCategories:async (req,res,next)=>{
        try{
            const page=parseInt(req.query.page,10)||1
            const limit=parseInt(req.query.limit,10)||10
            const skip=(page-1)*limit
             let sortBy="createdAt"
            if(req.query.sort)
               sortBy=req.query.sort
             let fields="-__v"
            if(req.query.fields)
                fields=req.query.fields.split(",").join(" ");

            const categories=await Category.find({status:true})
            .select(fields)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)

            const totalCategories=await Category.countDocuments(categories);
            const hasPrev=page>1;
            const hasNext=page*limit<totalCategories

             return res.status(200).json({
                data:categories,
                paginate:{
                    page,
                    totalCategories,
                    hasPrev,
                    hasNext,
                }
            })
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    deleteCtegory:async(req,res,next)=>{
        try{
            const filter=req.body.filter;
            await Category.deleteMany({_id: {$in:filter }})

            res.status(204).json({
                message:"done"});
        }
        catch(error){
            console.log(error);
            next(new appError('somthing went wrong!',500));
        }
    }
}
module.exports=subscriberCtrl;