module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode ||500;
    err.status=err.status||'fail'
    if(err.name==="CastError"){
        err.message=`INVALID ${err.path}:${err.value} !`
    }
    if(process.env.NODE_ENV==='development')
        return sendDev(err,res);
    else if (process.env.NODE_ENV==='production')
        return sendProd(err,res);
}
const sendDev=(err,res)=>{
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors||null,
            stack: err.stack,
        })
}
const sendProd=(err,res)=>{
    console.error('ERROR 💥', err);
if(err.isOperational){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors||null,
        })
    }
    return res.status(err.statusCode).json({
        status:err.status,
        message:'something went wrong !',

    })

}