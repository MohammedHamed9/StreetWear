const slugify=require("slugify")
const Brand=require("../models/BrandModel");
const appError = require("../utils/appError");
const brandCtrl={
    createBrand:async (req,res,next)=>{
        try{
            const {name}=req.body;
            const admin_created_id=req.user.id;
            const slug=slugify(name);
            const brand=await Brand.create({name,slug,admin_created_id});
            return res.status(201).json({
                message:"the category is brand successfully✅",
                brand
            });
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    updateBrand:async (req,res,next)=>{
        try{
             const b = await Brand.findById(req.params.id);
            const admin_update_id=req.user._id;
            req.body.admin_update_id=admin_update_id;
            req.body.slug=slugify(req.body.name);

            const brand=await Brand.findByIdAndUpdate({_id:req.params.id},req.body,{
                new:true,
                runValidators:true
            });
            return res.status(200).json({
                message:"the Brand is updated successfully✅",
                brand
            });
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
    getBrand:async (req,res,next)=>{
        try{
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
        }catch(error){
            console.log(error);
            next(new appError(error));
        }
    },
     getAllBrands:async (req,res,next)=>{
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

            const brands=await Brand.find()
            .select(fields)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)

            const totalCategories=await Brand.countDocuments(brands);
            const hasPrev=page>1;
            const hasNext=page*limit<totalCategories

             return res.status(200).json({
                data:brands,
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
    deleteBrand:async(req,res,next)=>{
        try{
            const filter=req.body.filter;
            await Brand.deleteMany({_id: {$in:filter }})

            res.status(204).json({
                message:"done"});
        }
        catch(error){
            console.log(error);
            next(new appError('somthing went wrong!',500));
        }
    }
}
module.exports=brandCtrl;