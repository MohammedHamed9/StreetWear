const express=require('express')
const router=express.Router();
const categoryCtrl=require('../controllers/categoryCtrl');
const authCtrl = require('../middlewares/authMiddelware');
const validate=require("../middlewares/validation");
const { createCategorySchema, updateCategorySchema, deleteCategoriesSchema, idParamSchema, getCategoriesQuerySchema } = require("../validations/categoryValidation");

router.post("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),validate(createCategorySchema),categoryCtrl.createCategory);
router.patch("/:id",authCtrl.protected,authCtrl.restrictedTo("Admin"),validate(idParamSchema,"params"),validate(updateCategorySchema),categoryCtrl.updateCategory);
router.get("/:id",authCtrl.protected,validate(idParamSchema,"params"),categoryCtrl.getCategory);
router.get("/",authCtrl.protected,validate(getCategoriesQuerySchema,"query"),categoryCtrl.getAllCategories);
router.delete("/",authCtrl.protected,authCtrl.restrictedTo("Admin"),validate(deleteCategoriesSchema),categoryCtrl.deleteCtegory);
module.exports=router