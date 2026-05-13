class appError extends Error {
    constructor(message,statusCode,errors=null){
        super(message)
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4')?"fail":"error"
        this.isOpertional=true
        this.errors=errors; // array of {field, message}
        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports=appError;