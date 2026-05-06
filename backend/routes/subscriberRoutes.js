const express=require('express')
const router=express.Router();
const subscriberCtrl=require('../controllers/subscriberCtrl');
const authCtrl = require('../middlewares/authMiddelware');
router.post("/",authCtrl.protected,
    subscriberCtrl.subscribe);
module.exports=router;