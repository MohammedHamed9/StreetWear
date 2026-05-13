const express=require('express')
const router=express.Router();
const authCtrl = require('../middlewares/authMiddelware');
const productCtrl = require('../controllers/productCtrl');
const upload=require("../middlewares/uploadMiddlware");
const resize=require("../middlewares/resizeImagesMiddleware")
const validate=require("../middlewares/validation")
const {createProductSchema,
    updateProductSchema,
getAllQueryProductsSchema,
ProductIdParams
}=require("../validations/productValidation");
const prepareQuery=require("../middlewares/prepareQuery")
const parseReqBody=require("../middlewares/parseBeforeValidate")

router.post("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),
upload.array("product_images",5),resize(500,500),parseReqBody(["variants"]),
validate(createProductSchema),
productCtrl.createProduct);

router.patch("/:id",authCtrl.protected,authCtrl.restrictedTo("Admin"),
upload.array("images",5),resize(500,500),
parseReqBody(["variants","tags","images"]),validate(updateProductSchema),
productCtrl.updateProduct);
router.get("/similr/:id",validate(ProductIdParams,"params"),productCtrl.getSimilrProducts);
router.get("/best-seller",productCtrl.getBestSellerProduct);
router.get("/new-arrivals",productCtrl.getNewArrivalsProducts);

router.get("/:id",validate(ProductIdParams,"params"),productCtrl.getProduct);
 //there phases 1-validation 2-normlization 3-controller
router.get("/",
    parseReqBody(["size","color"],"query"),
    validate(getAllQueryProductsSchema,"query"),
    prepareQuery,
    productCtrl.getAllProducts);
router.delete("/:id",authCtrl.protected,authCtrl.restrictedTo("Admin"),validate(ProductIdParams,"params"),productCtrl.deleteProduct);
module.exports=router