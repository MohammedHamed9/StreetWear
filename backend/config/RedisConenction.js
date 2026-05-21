const Redis=require("ioredis");
const redis=new Redis(process.env.NODE_ENV=='production' ? process.env.REDIS : undefined);
redis.on("connect",()=>{

   console.log("Redis connected");
});

redis.on("error",(err)=>{

   console.log(err);
});
module.exports=redis;