const express=require('express')
const router=express.Router();
const brandCtrl=require('../controllers/brandCtrl');
const authCtrl = require('../middlewares/authMiddelware');
const validate=require("../middlewares/validation");
const { createBrandSchema, updateBrandSchema, deleteBrandsSchema, idParamSchema, getBrandsQuerySchema } = require("../validations/brandValidation");

router.post("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),
validate(createBrandSchema),brandCtrl.createBrand);
router.patch("/:id",authCtrl.protected,authCtrl.restrictedTo("Admin"),validate(idParamSchema,"params"),validate(updateBrandSchema),brandCtrl.updateBrand);
router.get("/:id",authCtrl.protected,validate(idParamSchema,"params"),brandCtrl.getBrand);
router.get("/",authCtrl.protected,validate(getBrandsQuerySchema,"query"),brandCtrl.getAllBrands);
router.delete("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),validate(deleteBrandsSchema),brandCtrl.deleteBrand);
module.exports=router