const cloudinary=require("../config/Cloudinary");
const streamifier=require("streamifier")
function uploadToCloudinary(fileBuffer,folder='app'){
    return new Promise((resolve,reject)=>{
        const stream=cloudinary.uploader.upload_stream(
            {folder},
            (error,result)=>{
                if(error) return reject(error)
                    resolve(result)
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    })
}
module.exports=uploadToCloudinary