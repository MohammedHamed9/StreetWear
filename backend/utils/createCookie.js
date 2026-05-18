const createCookie=(token,res)=>{
    const isProduction=process.env.NODE_ENV === 'production';
    const cookieObt={
        httpOnly:true,
        secure:isProduction,
        sameSite:'None',
        expires:new Date(Date.now()+90*24*60*60*1000)
    }
    res.cookie('jwt',token,cookieObt)
}
module.exports=createCookie;