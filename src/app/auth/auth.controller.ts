import { RequestHandler } from "express";
import { authService } from "./auth.service";

export const signUpUser: RequestHandler = async (req, res, next) => {
  const user = req.body;

  try {
    const result = await authService.signUpUser(user);

    res.status(201).json({
      status: 201,
      message: "User Sind-up successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
