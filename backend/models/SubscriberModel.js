const mongoose=require("mongoose");
const subscriberSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    subscriberAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true});
module.exports=mongoose.model("subscribers",subscriberSchema);
