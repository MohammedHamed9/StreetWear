const slugify=require("slugify")
const Brand=require("../models/BrandModel");
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");
const brandCtrl={
    createBrand: catchAsync(async (req,res,next)=>{
            const {name}=req.body;
            const admin_created_id=req.user.id;
            const slug=slugify(name);
            const brand=await Brand.create({name,slug,admin_created_id});
            await deleteCache("all-brands:*");
            return res.status(201).json({
                message:"the category is brand successfully✅",
                brand
            });
    }),
    updateBrand: catchAsync(async (req,res,next)=>{
             const b = await Brand.findById(req.params.id);
            const admin_update_id=req.user._id;
            req.body.admin_update_id=admin_update_id;
            req.body.slug=slugify(req.body.name);
            const brand=await Brand.findByIdAndUpdate({_id:req.params.id},req.body,{
                new:true,
                runValidators:true
            });            await deleteCache("all-brands:*");            return res.status(200).json({
                message:"the Brand is updated successfully✅",
                brand
            });
    }),
    getBrand: catchAsync(async (req,res,next)=>{
            let fields="-__v"
            if(req.query.fields)
                fields=req.query.fields.split(",").join(" ")
            const brand=await Brand.findById({_id:req.params.id}).select(fields);
            if(!brand){
            return next(new appError('this brand is not exist!',404));
            }
            return res.status(200).json({
                brand
            });
    }),
     getAllBrands: catchAsync(async (req,res,next)=>{
            const page=parseInt(req.query.page,10)||1
            const limit=parseInt(req.query.limit,10)||10
            const skip=(page-1)*limit
            let sortBy="createdAt"
            if(req.query.sort)
               sortBy=req.query.sort
            let fields="-__v"
            if(req.query.fields)
                fields=req.query.fields.split(",").join(" ");
            const brands=await Brand.find()
            .select(fields)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            const totalCategories=await Brand.countDocuments(brands);
            const hasPrev=page>1;
            const hasNext=page*limit<totalCategories
            const response = {
                data:brands,
                paginate:{
                    page,
                    totalCategories,
                    hasPrev,
                    hasNext,
                }
            };
             return res.status(200).json(response)
    }),
    deleteBrand: catchAsync(async(req,res,next)=>{
            const filter=req.body.filter;
            await Brand.deleteMany({_id: {$in:filter }})
            await deleteCache("all-brands:*");
            res.status(204).json({
                message:"done"});
    })
}
module.exports=brandCtrl;