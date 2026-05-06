const express=require('express')
const router=express.Router();
const authCtrl = require('../middlewares/authMiddelware');
const productCtrl = require('../controllers/productCtrl');
const upload=require("../middlewares/uploadMiddlware");
const resize=require("../middlewares/resizeImagesMiddleware")

router.post("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),
upload.array("product_images",5),resize(500,500),
productCtrl.createProduct);

router.patch("/:id",authCtrl.protected,authCtrl.restrictedTo("Admin"),
upload.array("images",5),resize(500,500),
productCtrl.updateProduct);
router.get("/similr/:id",productCtrl.getSimilrProducts);
router.get("/best-seller",productCtrl.getBestSellerProduct);
router.get("/new-arrivals",productCtrl.getNewArrivalsProducts);

router.get("/:id",productCtrl.getProduct);
 
router.get("/",productCtrl.getAllProducts);
router.delete("/:id",authCtrl.protected,authCtrl.restrictedTo("Admin"),productCtrl.deleteProduct);
module.exports=router