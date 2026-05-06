const mongoose=require("mongoose");
const categorySchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    },
    type:{
        type:String,
        enum: ['Top', 'Bottom', 'Accessories'],
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    category_image:{
        type:String,
        default:"",
        trim:true
    },
    admin_created_id:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    admin_update_id:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true});
module.exports=mongoose.model("categories",categorySchema);
