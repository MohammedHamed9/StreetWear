const express=require('express')
const router=express.Router();
const checkoutCtrl=require('../controllers/checkoutCtrl');
const authCtrl = require('../middlewares/authMiddelware');
router.post("/",authCtrl.protected,checkoutCtrl.createCheckout);
router.put("/:id/pay",authCtrl.protected,checkoutCtrl.payCheckout);
router.put("/:id/finalize",authCtrl.protected,checkoutCtrl.finalizeCheckOut);

module.exports=router