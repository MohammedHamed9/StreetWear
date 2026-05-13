const express=require('express')
const router=express.Router();
const cartCtrl=require('../controllers/cartCtrl');
const authCtrl = require('../middlewares/authMiddelware');
const validate=require("../middlewares/validation");
const { addToCartSchema, updateCartSchema, removeProductSchema, getCartQuerySchema, mergeCartsSchema } = require("../validations/cartValidation");

router.post("/mergeCarts",authCtrl.protected,validate(mergeCartsSchema),cartCtrl.mergeCarts);
router.post("/",validate(addToCartSchema),cartCtrl.addToCart);
router.patch("/",validate(updateCartSchema),cartCtrl.updateProductQuantity);
router.delete("/",validate(removeProductSchema),cartCtrl.RemoveProduct);
router.get("/",validate(getCartQuerySchema,"query"),cartCtrl.getCart);
/*router.delete("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),
categoryCtrl.deleteCtegory);*/
module.exports=router