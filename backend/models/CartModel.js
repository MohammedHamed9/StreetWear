const mongoose=require("mongoose");
const cartItemSchema =new mongoose.Schema({
  productId:{
    type:mongoose.Schema.ObjectId,
    ref:"Product",
    required:true
  },
  name:String,
  size:String,
  color:String,
  price:String,
  image:String,
  quantity:{
    type:Number,
    default:1
  },

},{_id:false});
const CartSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
    },
    guestId:{
      type:String
    },
    products:[cartItemSchema],
    totalPrice:{
      type:Number,
      required:true,
      default:0
    },

},{timestamps:true})
module.exports=mongoose.model("carts",CartSchema);
