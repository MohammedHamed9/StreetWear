const express=require("express");
const router=express.Router();
const userCtrl=require("../controllers/userCtrl")
const auth=require("../middlewares/authMiddelware");
const adminCtrl = require("../controllers/adminCtrl");
const upload = require("../middlewares/uploadMiddlware");
const resize = require("../middlewares/resizeImagesMiddleware");

router.post("/register",userCtrl.resgister);
router.post("/login",userCtrl.login);
router.get("/getProfile",auth.protected,auth.restrictedTo("Customer"),userCtrl.getMe);
router.patch("/update-me",auth.protected,auth.restrictedTo("Customer"),
upload.single("avatar"),resize(200,200),userCtrl.updateMe);
router.get("/forget-password",userCtrl.forgetPassword)
router.post("/reset-password/:token",userCtrl.resetPassword);
router.post("/update-password",auth.protected,userCtrl.updatePassword);


//ADMIN-ROUTES
router.get("/get-users",auth.protected,auth.restrictedTo("Admin"),adminCtrl.getAllUsers);
router.get("/get-user/:id",auth.protected,auth.restrictedTo("Admin"),adminCtrl.getAllUsers);
router.post("/create-user",auth.protected,auth.restrictedTo("Admin"),adminCtrl.createUser);
router.patch("/update-user/:id",auth.protected,auth.restrictedTo("Admin"),adminCtrl.updateUser);
router.delete("/delete-user/:id",auth.protected,auth.restrictedTo("Admin"),adminCtrl.deleteUser);

router.get("/get-orders",auth.protected,auth.restrictedTo("Admin")
,adminCtrl.getAllOrders);
router.get("/get-order/:id",auth.protected,auth.restrictedTo("Admin"),
adminCtrl.getOrder);
router.patch("/update-order/:id",auth.protected,auth.restrictedTo("Admin"),
adminCtrl.updateOrder);
router.delete("/delete-order/:id",auth.protected,auth.restrictedTo("Admin"),
adminCtrl.deleteOrder);

module.exports=router