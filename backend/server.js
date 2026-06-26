const express=require("express")
const cors=require("cors");
const morgan=require("morgan")
const cookieParser=require("cookie-parser");
const expressMongoSanitize=require("express-mongo-sanitize");
const helmet=require("helmet");
const hpp=require("hpp");
const dotenv=require("dotenv");
dotenv.config();
const DBconnection=require("./config/DBconnection");
const appError = require("./utils/appError");
const ErrorController = require("./controllers/ErrorController");
const logger=require("./utils/logger");
const DB=process.env.DB
const app=express();
const PORT= process.env.PORT ||3000 ;
const userRoutes=require("./routes/userRoutes");
const categoryRoutes=require('./routes/categoryRoutes');
const brandRoutes=require("./routes/brandRoutes")
const productRoutes=require("./routes/productRoutes")
const cartRoutes=require("./routes/cartRoutes")
const checkoutRoutes=require("./routes/checkoutRoutes")
const orderRoutes=require("./routes/orderRoutes")
const subscriberRoutes=require("./routes/subscriberRoutes")
const stripeRoute=require("./routes/stripeRoute")
const stripeWebhookRoute=require("./routes/stripeWebhookRoute")
app.use(cors({
  origin: ['http://localhost:5173', 'https://street-wear-xji8.vercel.app'], 
  credentials: true
}));
app.use(cookieParser());
app.use(morgan("dev"))
app.use(helmet());
app.use(hpp());
app.use('/streetwear/stripewebhook',stripeWebhookRoute);
app.use(express.json());

app.use("/streetwear/user",userRoutes)
app.use("/streetwear/category",categoryRoutes)
app.use("/streetwear/brand",brandRoutes);
app.use("/streetwear/product",productRoutes);
app.use("/streetwear/cart",cartRoutes);
app.use("/streetwear/checkout",checkoutRoutes);
app.use("/streetwear/order",orderRoutes);
app.use("/streetwear/subscriber",subscriberRoutes);
app.use('/streetwear/stripe',stripeRoute);

app.use((req,res,next)=>{
    next(new appError(`cant find this route: ${req.originalUrl} in this server!`,404));
});

app.use(ErrorController);
DBconnection.connect(DB).then(()=>{
app.listen(PORT,()=>{
    logger.info(`SERVER IS RUNNING ON PROT: ${PORT}...`)
})
}).catch((err)=>{
    console.log(err);
})
