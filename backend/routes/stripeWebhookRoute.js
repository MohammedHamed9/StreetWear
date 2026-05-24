const express=require("express");
const stripeWebhook=require("../utils/stripeWebhook");
const router=express.Router();
router.post("/webhook",express.raw({ type: 'application/json' }),stripeWebhook);

module.exports=router;