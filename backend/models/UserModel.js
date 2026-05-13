const mongoose=require("mongoose");
const emailValidator=require("email-validator")
const bcrypt=require("bcryptjs")
const crypto=require("crypto")
const addressSchema=mongoose.Schema({
   alias:{
    type:String,
    tirm:true,
},
  city:{
    type:String,
    tirm:true,
  },
  area: { 
    type: String, 
    trim: true 
  },
  street: { 
    type: String, 
  },
  building: Number,
  floor: Number,
  apartment: Number,
  postalCode: String,
  isDefault: { 
    type: Boolean, 
    default: false 
  }
})
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate:{
            validator:emailValidator.validate,
            message:props=>`${props.value} is not a vaild email!`
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:8
    },
    passwordChanedAt:Date,
    phone:{
        type:String,
        trim:true,
    },
    role:{
    type:String,
    enum:["Customer","Admin"],
    default:"Customer"
    },
    avatar:{
        type:String,
        default:""
    },
    verified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type:String,
        tim:true,
        default:""
    },
    passwordRestToken:String,
    passwordRestExpires:Date,
    addresses:[addressSchema]
},{timestamps:true});

UserSchema.pre("save",async function(next) {
    if(!this.isModified('password'))return 
        const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})
UserSchema.methods.matchPasswords=async(addedPass,truePassword)=>{
    return await bcrypt.compare(addedPass,truePassword);
}
UserSchema.methods.createResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.passwordRestToken=crypto.createHash("sha256").update(resetToken).digest("hex")
    this.passwordRestExpires=Date.now()+10*60*1000
    return resetToken;
}
module.exports=mongoose.model("User",UserSchema);