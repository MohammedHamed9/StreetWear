const express=require("express");
const authCtrl = require("../middlewares/authMiddelware");
const orderCtrl=require("../controllers/orderCtrl")
const validate=require("../middlewares/validation");
const { idParamSchema } = require("../validations/orderValidation");
const router=express.Router();
router.get("/my-orders",authCtrl.protected,orderCtrl.getMyOrders)
router.get("/:id",authCtrl.protected,validate(idParamSchema,"params"),orderCtrl.getOrder)
module.exports=router