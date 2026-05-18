const express=require("express");
const router=express.Router();
const userCtrl=require("../controllers/userCtrl")
const auth=require("../middlewares/authMiddelware");
const adminCtrl = require("../controllers/adminCtrl");
const upload = require("../middlewares/uploadMiddlware");
const resize = require("../middlewares/resizeImagesMiddleware");
const validate = require("../middlewares/validation");
const { loginSchema,
     registerSchema,
     updateMeSchema,
     forgetPasswordSchema,
    resetPasswordSchema,
updatePasswordSchema } = require("../validations/userValidation");
const { createUserSchema, updateUserSchema, updateOrderSchema, idParamSchema: adminIdParamSchema, fieldsQuerySchema } = require("../validations/adminValidation");
const limiter = require("../middlewares/RateLimiter");

router.post("/register",validate(registerSchema),limiter,userCtrl.resgister);
router.post("/login",validate(loginSchema),limiter,userCtrl.login);
router.get("/logout",userCtrl.logout);
router.get("/getProfile",auth.protected ,userCtrl.getMe);
router.patch("/update-me",auth.protected,
upload.single("avatar"),resize(200,200),validate(updateMeSchema),userCtrl.updateMe);
router.get("/forget-password",validate(forgetPasswordSchema),limiter,userCtrl.forgetPassword)
router.post("/reset-password/:token",validate(resetPasswordSchema),limiter,userCtrl.resetPassword);
router.post("/update-password",auth.protected,validate(updatePasswordSchema),userCtrl.updatePassword);


//ADMIN-ROUTES
router.get("/get-users",auth.protected,auth.restrictedTo("Admin"),adminCtrl.getAllUsers);
router.get("/get-user/:id",auth.protected,auth.restrictedTo("Admin"),validate(adminIdParamSchema,"params"),validate(fieldsQuerySchema,"query"),adminCtrl.getUser);
router.post("/create-user",auth.protected,auth.restrictedTo("Admin"),validate(createUserSchema),adminCtrl.createUser);
router.patch("/update-user/:id",auth.protected,auth.restrictedTo("Admin"),validate(adminIdParamSchema,"params"),validate(updateUserSchema),adminCtrl.updateUser);
router.delete("/delete-user/:id",auth.protected,auth.restrictedTo("Admin"),validate(adminIdParamSchema,"params"),adminCtrl.deleteUser);

router.get("/get-orders",auth.protected,auth.restrictedTo("Admin"),adminCtrl.getAllOrders);
router.get("/get-order/:id",auth.protected,auth.restrictedTo("Admin"),validate(adminIdParamSchema,"params"),validate(fieldsQuerySchema,"query"),adminCtrl.getOrder);
router.patch("/update-order/:id",auth.protected,auth.restrictedTo("Admin"),validate(adminIdParamSchema,"params"),validate(updateOrderSchema),adminCtrl.updateOrder);
router.delete("/delete-order/:id",auth.protected,auth.restrictedTo("Admin"),validate(adminIdParamSchema,"params"),adminCtrl.deleteOrder);

module.exports=router