import {verifyJWT} from "../middlewares/auth.middlewares.js";
import {loginUser,loggedoutUser,refreshAccesaToken,registerUser} from  "../controllers/user.controllers.js";
import { Router } from "express";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,loggedoutUser)
router.route("/refresh-token").post(refreshAccesaToken)

export default router