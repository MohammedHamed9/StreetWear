module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode ||500;
    err.status=err.status||'fail'
    if(err.name==="CastError"){
        err.message=`INVALID ${err.path}:${err.value} !`
    }
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(el => el.message);
        err.message = `Invalid data: ${messages.join(' & ')}`;
        err.statusCode = 400;
    }
    if(process.env.NODE_ENV==='development')
        return sendDev(err,res);
    else if (process.env.NODE_ENV==='production')
        return sendProd(err,res);
}
const sendDev=(err,res)=>{
    console.log("err.name "+err.name)
    return res.status(err.statusCode).json({
        status:err.status, 
        //Error:err,
        message:err.message,
        stack:err.stack,
    })
}
const sendProd=(err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        message:err.message,

    })
}