const appError = require("../utils/appError");
//because joi return strings only so went back arrays and objects
const parseReqBody=(fields=[],property="body")=>{
return (req,res,next)=>{
    try{
        console.log(req[property]);
    for(const field of fields)
    if(req[property][field])
        req[property][field]=JSON.parse(req[property][field])
    next();
    }catch(error){
       return next(new appError('Invalid json format',400))
    }
}
}

module.exports=parseReqBody