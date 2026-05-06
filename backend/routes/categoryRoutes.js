const express=require('express')
const router=express.Router();
const categoryCtrl=require('../controllers/categoryCtrl');
const authCtrl = require('../middlewares/authMiddelware');
router.post("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),categoryCtrl.createCategory);
router.patch("/:id",authCtrl.protected,authCtrl.restrictedTo("Admin"),categoryCtrl.updateCategory);
router.get("/:id",authCtrl.protected,categoryCtrl.getCategory);
router.get("/",authCtrl.protected,categoryCtrl.getAllCategories);
router.delete("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),categoryCtrl.deleteCtegory);
module.exports=router