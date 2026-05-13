const express=require('express')
const router=express.Router();
const checkoutCtrl=require('../controllers/checkoutCtrl');
const authCtrl = require('../middlewares/authMiddelware');
const validate=require("../middlewares/validation");
const { createCheckoutSchema, payCheckoutSchema, idParamSchema } = require("../validations/checkoutValidation");

router.post("/",authCtrl.protected,validate(createCheckoutSchema),checkoutCtrl.createCheckout);
router.put("/:id/pay",authCtrl.protected,validate(idParamSchema,"params"),validate(payCheckoutSchema),checkoutCtrl.payCheckout);
router.put("/:id/finalize",authCtrl.protected,validate(idParamSchema,"params"),checkoutCtrl.finalizeCheckOut);

module.exports=router