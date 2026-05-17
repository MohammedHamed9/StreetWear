const Brand= require("../models/BrandModel");
const Category = require("../models/CategoryModel");
const Product=require("../models/ProductModel");
const appError = require("../utils/appError");
const catchAsync = require("./catchAsync");
const uploadToCloudinary=require("../utils/uploadToCloudinary");
const productCtrl={
    createProduct: catchAsync(async(req,res,next)=>{
            let {
                name,
                description,
                price,
                discountPrice,
                category,
                brand,
                variants,
                collections,
                material,
                gender,
                isFeatured,
                isPublished,
                tags,
                dimenstions,
                weight,
                sku,
                fit
        }=req.body
        if (category) {
            const c = await Category.findOne({ name: category });
            if (!c) return next(new appError("Category not found", 404));
            req.body.category = c._id; 
        }
        if (brand) {
            const b = await Brand.findOne({ name: brand });
            if (!b) return next(new appError("Brand not found", 404));
            req.body.brand = b._id;
        }
        let images=[]
        if(req.files){
            const uploadedPromises= req.files.map(async(el)=>
                await uploadToCloudinary(el.buffer,"products"))
                    //علشان ال ماب مش بتستني ال اسينك كود ف 
                    // النتيجه هتطلع فاضيه لو معملتش كدا 
                    const result=await Promise.all(uploadedPromises)
                   const UrlResults=result.map((el)=>({ url: el.secure_url, altText: "" }))
                    images=UrlResults
            //const result=await uploadToCloudinary(req.file.buffer,"users");
        }
        const product=await Product.create({
                name,
                description,
                price,
                discountPrice,
                category:req.body.category,
                brand:req.body.brand,
                variants:req.body.variants,
                collections,
                material,
                gender,
                images:images,
                isFeatured,
                isPublished,
                tags,
                dimenstions,
                weight,
                sku,
                fit,
                admin_created_id:req.user._id
        });
        res.status(201).json({
            message:"The Product is created successfully✅",
            product
        })
    }),
    updateProduct: catchAsync(async (req,res,next)=>{
             const p = await Product.findById(req.params.id);
            if(!p){
                return next(new appError('The Product is not exist!',404));
            }
            req.body.admin_update_id=req.user._id;
        if (req.body.category) {
            const category=JSON.parse(req.body.category).name
            const c = await Category.findOne({ name: category });
            if (!c) return next(new appError("Category not found", 404));
            req.body.category = c._id; 
        }
        if (req.body.brand) {
            const brand =JSON.parse(req.body.brand).name;
            const b = await Brand.findOne({ name: brand });
            if (!b) return next(new appError("Brand not found", 404));
            req.body.brand = b._id;
        }
      if(req.files&&req.files.length>0){
            req.body.images=[];
            const uploadedPromises=req.files.map(async(el)=>
                await uploadToCloudinary(el.buffer,'products'))
                const result=await Promise.all(uploadedPromises);
                console.log(result)
                const UrlResults=result.map((el)=>(
                req.body.images.push( {url:el.secure_url,altText:""})
                ));
        }
            const product=await Product.findByIdAndUpdate({_id:req.params.id},req.body,{
                new:true,
                runValidators:true
            });
            return res.status(200).json({
                message:"The Product is updated successfully✅",
                //product
            });
    }),
    getAllProducts: catchAsync(async(req,res,next)=>{
     let { sortBy,page,limit,skip,fields, collections, gender, minPrice, maxPrice, 
        search, category, brand,material,size,color
        } =req.query;
    let query={}
    if(collections &&collections.toLowerCase()!='all'){
        query.collections=collections 
        }
    if (category) {
        const c = await Category.find({$or:[
                {name:category},
                {type:category}]});
        if (c.length==0) return next (new appError("Category not found", 404));
                if(c.length==1)
                query.category = c[0]._id; 
                else{
                let categories=[]
                categories=c.map((el,index)=>categories[index]=el._id);
                query.category={$in:categories}
                }
            }
        if (brand) {
            brand=brand.includes(",")?brand.split(','):brand
            const b = await Brand.find({ name:{$in: brand }});
            if (b.length==0) return next(new appError("Brand not found", 404));
            if(b.length==1)
                query.brand = b[0]._id;
            else{
                let brands=[]
                brands=b.map((el,index)=> brands[index]=el._id)
                query.brand={$in:brands}
            }
        }
        if(minPrice||maxPrice){
        query.price={}
            if(minPrice) 
                query.price.gte=Number(minPrice);
             if(maxPrice) 
                query.price.lte=Number(maxPrice);
            let queryStr=JSON.stringify(query.price).replace(/\b(gte|gt|lte|lt)\b/g,match=> `$${match}`);
             query.price=JSON.parse(queryStr)
        }
    if(search){
            query.$or=[
                { name:{$regex:search.trim(),$options:'i'}},
                { description:{$regex:search.trim(),$options:'i'}}
            ]
        }
    if(size){
            size=size.includes(",")?size.split(","):size
            query["variants.size"]={$in:size}
        }
    if(color){
                color=color.includes(",")?color.split(","):color
                query["variants.color"]={$in:color}
            }
        const products=await Product.find(query)
            .populate("category","name type")
            .populate("brand","name")
            .select(fields)
            .sort(sortBy)
            .skip(skip)
            .limit(limit);
            const total=await Product.countDocuments(query);
            const hasPrev=page>1;
            const hasNext=(page * limit) <total
            return res.status(200).json({
                products,
                paginate:{
                    page,
                    total,
                    hasPrev,
                    hasNext,
                }
            });
    }),
    getProduct: catchAsync(async(req,res,next)=>{
             const product = await Product.findById(req.params.id)
             .populate("category","name type -_id")
             .populate("brand","name -_id");
            if(!product){
                return next(new appError('The Product is not exist!',404));
            }
            return res.status(200).json({
                product
            });
    }),
    getSimilrProducts: catchAsync(async(req,res,next)=>{
             const product = await Product.findById(req.params.id)
             console.log(req.cookies.jwt);
            if(!product){
                return next(new appError('The Product is not exist!',404));
            }
             similtProducts= await Product.find({
               _id:{$ne:req.params.id},
                category:product.category,
                gender:product.gender
             }).limit(4)
             .populate("category","name type -_id")
             .populate("brand","name -_id");
            return res.status(200).json({
                similtProducts
            });
    }),
    getBestSellerProduct: catchAsync(async(req,res,next)=>{
             const product = await Product.findOne().sort({rating:-1})
             .populate("category","name type -_id")
             .populate("brand","name -_id");
            if(!product){
                return next(new appError('The Product is not exist!',404));
            }
            return res.status(200).json({
                best_seller:product
            });
    }),
    getNewArrivalsProducts: catchAsync(async(req,res,next)=>{
             const product = await Product.find().sort({createdAt:-1}).limit(8)
             .populate("category","name type -_id")
             .populate("brand","name -_id");
            if(!product){
                return next(new appError('The Product is not exist!',404));
            }
            return res.status(200).json({
               newArrivals:product
            });
    }),
    deleteProduct: catchAsync(async(req,res,next)=>{
            const product=await Product.findById(req.params.id);
            if(!product)
             return next(new appError('The Product is not exist!',404));
             await Product.findByIdAndDelete(req.params.id);
            return res.status(203).json({
                message:"The Product is deleted successfully✅",
            });
    }),
}
module.exports=productCtrl