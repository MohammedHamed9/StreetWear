const slugify=require("slugify")
const Category=require("../models/CategoryModel");
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");
const categoryCtrl={
    createCategory: catchAsync(async (req,res,next)=>{
            const {name,type}=req.body;
            const admin_created_id=req.user.id;
            const slug=slugify(name);
            const category=await Category.create({name,slug,type,admin_created_id});
            await deleteCache("all-categories:*");
            return res.status(201).json({
                message:"the category is created successfully✅",
                category
            });
    }),
    updateCategory: catchAsync(async (req,res,next)=>{
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
            await deleteCache("all-categories:*");
            return res.status(200).json({
                message:"the category is updated successfully✅",
                category
            });
    }),
    getCategory: catchAsync(async (req,res,next)=>{
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
    }),
     getAllCategories: catchAsync(async (req,res,next)=>{
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
            const response = {
             data:categories,
             paginate:{
                    page,
                    totalCategories,
                    hasPrev,
                    hasNext,
                }
            };
             return res.status(200).json(response)
    }),
    deleteCtegory: catchAsync(async(req,res,next)=>{
            const filter=req.body.filter;
            await Category.deleteMany({_id: {$in:filter }})
            await deleteCache("all-categories:*");
            res.status(204).json({
                message:"done"});
    })
}
module.exports=categoryCtrl;