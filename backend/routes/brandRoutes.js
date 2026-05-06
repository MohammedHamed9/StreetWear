const express=require('express')
const router=express.Router();
const brandCtrl=require('../controllers/brandCtrl');
const authCtrl = require('../middlewares/authMiddelware');
router.post("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),brandCtrl.createBrand);
router.patch("/:id",authCtrl.protected,authCtrl.restrictedTo("Admin"),brandCtrl.updateBrand);
router.get("/:id",authCtrl.protected,brandCtrl.getBrand);
router.get("/",authCtrl.protected,brandCtrl.getAllBrands);
router.delete("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),brandCtrl.deleteBrand);
module.exports=router