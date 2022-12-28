import express from "express";
import * as authController from "./../controller/auth";
import * as authMiddleWare from "./../middleWare/auth";
const router = express.Router();

router.post("/signup", authMiddleWare.authUser, authController.postSignUp);
router.post("/login", authController.postLogin);
router.post("/firebase_auth", authController.postFirebaseLogin);

export default router;
