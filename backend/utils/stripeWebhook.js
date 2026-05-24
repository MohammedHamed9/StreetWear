const logger = require("./logger");
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);
const processSuccessfulCheckout  = require("../controllers/processSuccessfulCheckout ");
module.exports=async (req,res)=>{
    const sig=req.headers["stripe-signature"];
    const webhookSecret=process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event=stripe.webhooks.constructEvent(req.body,sig,webhookSecret);
    } catch (err) {
        console.error(`Error while verifying webhook signature: ${err}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case "checkout.session.completed":
           const session=event.data.object;
            await processSuccessfulCheckout(session);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};