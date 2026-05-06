const express=require("express");
const authCtrl = require("../middlewares/authMiddelware");
const orderCtrl=require("../controllers/orderCtrl")
const router=express.Router();
router.get("/my-orders",authCtrl.protected,orderCtrl.getMyOrders)
router.get("/:id",authCtrl.protected,orderCtrl.getOrder)
module.exports=router