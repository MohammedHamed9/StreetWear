const express=require('express')
const router=express.Router();
const cartCtrl=require('../controllers/cartCtrl');
const authCtrl = require('../middlewares/authMiddelware');

router.post("/mergeCarts",authCtrl.protected,cartCtrl.mergeCarts);
router.post("/",cartCtrl.addToCart);
router.patch("/",cartCtrl.updateProductQuantity);
router.delete("/",cartCtrl.RemoveProduct);
router.get("/",cartCtrl.getCart);
/*router.delete("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),
categoryCtrl.deleteCtegory);*/
module.exports=router