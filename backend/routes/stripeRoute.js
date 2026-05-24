const express=require("express");
const stripeSessions=require("../utils/stripeSessions");
const stripeWebhook=require("../utils/stripeWebhook");
const router=express.Router();
router.post("/create-checkout-session",stripeSessions);
router.post("/webhook",express.raw({ type: 'application/json' }),stripeWebhook);

module.exports=router;