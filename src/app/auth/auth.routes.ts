import { Router } from "express";
import { signUpUser } from "./auth.controller";

const router = Router();

router.post("/sign-up", signUpUser);

export const authRouter = router;
