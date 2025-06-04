const express = require('express');
const userRouter  = express.Router();
const authController = require('../controllers/authController');
const userController = require("../controllers/userController");
const userAuthantication = require("../utils/userAuthantication")

userRouter.post("/signUp",authController.signUp);
userRouter.post("/signIn",authController.signIn);
userRouter.get("/signOut",authController.signOut);


userRouter.get("/user/get",userAuthantication,userController.getUser);
userRouter.patch("/user/update",userAuthantication,userController.updateUser);



module.exports = userRouter;