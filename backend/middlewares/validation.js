const appError=require("../utils/appError");
const validate=(schema,property = "body")=>{
    return async (req,res,next)=>{
        try{

        const value =await schema.validateAsync(req[property],
            {abortEarly:false,
            stripUnknown:true
            });
        req[property]=value;
        return next();

        }catch(error){
            if(error.details){
            let errors=error.details.map((detail)=>({
                field: detail.path.join('.'),
                message: detail.message
            }));
            console.log(errors)
            return next(new appError("Validation failed",400,errors));
            }
        return next(new appError(error.message,400));
        }
    }
}
module.exports=validate;