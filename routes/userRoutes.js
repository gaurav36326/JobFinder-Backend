const express = require('express');
const userRouter  = express.Router();
const userController = require('../controllers/userController')



userRouter.post("/signUp",userController.signUp);
userRouter.post("/signIn",userController.signIn);
userRouter.get("/signOut",userController.signOut);


module.exports = userRouter;