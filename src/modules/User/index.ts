import { Router } from "express";
import * as UserControllers from "./User.controller" ;
const router = Router();

router.post("/signup", UserControllers.SignUp);
router.post("/signin", UserControllers.Signin);

export default router;
