const catchAsync = require("../controllers/catchAsync");
const logger = require("./logger");
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);
module.exports=catchAsync(async(req,res)=>{
    const cartProducts=req.body.cart.products;
    logger.info("creating stripe session for cart:",req.body);
    const line_items=cartProducts.map((item)=>{
        return {
            price_data:{
                currency:"egp",
            product_data:{
                name:item.name,
                images:[item.image],
            },
            unit_amount:item.price*100
            },
            quantity:item.quantity
        }
    });
    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:line_items,
        mode:"payment",
        metadata:{
            checkoutId:String(req.body.checkoutId),
        },
        success_url:`${process.env.CLIENT_URL}/order-confirmation/${req.body.checkoutId}`,
        cancel_url:`${process.env.CLIENT_URL}/`
    });

    res.json({url:session.url})
})