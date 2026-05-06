const mongoose=require("mongoose");
const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"the name is required"],
        trim:true,
        min:[3,'the minimum length is 3 characters']
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
    },
    sku:{ //Stock Keeping Unit كود فريد بيميز كل منتج عن الاخر
        type:String,
        unique:true,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories',
        required:true
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'brands',
        required:true,
    },
    variants:[
       { 
        color:{
            type:String,
            trim:true,
            required:true
        },
        size:{type:String,required:true},
        stock:{type:Number,default:0},
    }
    ],
    collections:{ 
        type:String,
        required:true
    },
    material:{ 
        type:String,
    },
    gender:{
        type:String,
        enum:["Men","Women","Unisex"]
    },
    images:{
        type:[{
            url:String,
            altText:{type:String,default:""},
            _id:false
        }]
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
     isPublished:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:0,
        max:[5,'the rating must be less than or equal to 5']
    },
    numReviews:{
        type:Number,
        default:0
    },
    tags:[String],
    metaTitle:{
        type:String,
        trim:true
    },
    metaDescription:{
        type:String,
        trim:true
    },
    metaKeywords:{
        type:String,
        trim:true
    },
    dimenstions:{
        length:String,
        width:String,
        height:String
    },
    weight:{
        type:String,
        trim:true
    },
    fit:{
        type:String,
        trim:true
    },

    admin_created_id:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    admin_updated_id:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    }

},{timestamps:true,
toJSON: { virtuals: true },
toObject: { virtuals: true }
})
ProductSchema.virtual('sizes').get(function(){
    if(this.variants){
        let sizes=[]
        this.variants.forEach(v=>{
            if(!sizes.includes(v.size))
                return sizes.push(v.size);
        })
        return sizes
    }

    return []
})
ProductSchema.virtual('colors').get(function(){
    if(this.variants){
        let colors=[]
        this.variants.forEach(v=>{
            if(!colors.includes(v.color)){
               return colors.push(v.color);
            }
        })
        return colors
    }
    return []
})
module.exports=mongoose.model('Product',ProductSchema);