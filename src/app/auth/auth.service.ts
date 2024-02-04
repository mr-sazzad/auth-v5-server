import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import prisma from "../../lib/prisma";
import ApiError from "../errors/apiError";

const signUpUser = async (user: User) => {
  const { email, password } = user;

  const isExist = await prisma.user.findFirst({
    where: { email },
  });

  if (isExist) {
    throw new ApiError(409, "user already exists");
  }

  const hashedPassword = await bcrypt.hash(password as string, 12);

  const newUser = {
    name: user.name,
    email: user.email,
    password: hashedPassword,
  };

  const result = await prisma.user.create({ data: newUser });

  if (!result) {
    throw new ApiError(500, "something went wrong");
  }

  return result;
};

export const authService = { signUpUser };
