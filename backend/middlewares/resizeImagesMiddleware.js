const sharp=require("sharp");
const { collection } = require("../models/UserModel");
module.exports=(width,hieght)=>{
    return async (req,res,next)=>{
     if(!req.file && !req.files)return next()

     if(req.file){
    req.file.buffer = await sharp(req.file.buffer)
     .resize(width,hieght)
     .toFormat("jpeg")
     .jpeg({quality:90})
     .toBuffer();
     return next();
     }
     if(req.files){
        const resizePromises =req.files.map(async(el,index)=>{
            req.files[index].buffer=await sharp(el.buffer)
            .resize(width,hieght)
            .toFormat("jpeg")
            .jpeg({quality:90})
            .toBuffer();
        })
       await Promise.all(resizePromises);
        return next();
     }
}
}
