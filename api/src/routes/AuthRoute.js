import express from "express";
import { LoginUser, signUp } from "../controller/AuthController.js";

const router = express.Router();

// create user
router.post('/signup', signUp)

// login user
router.post('/login', LoginUser)

export default router;

