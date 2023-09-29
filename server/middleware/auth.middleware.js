import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.middleware.js";
import AppError from "../utils/error.utils.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new AppError("unauthorised user or token is expire. please login", 400)
    );
  }

  const decodeToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decodeToken) {
    return next(
      new AppError("unauthorised user or token is expire. please login", 400)
    );
  }

  req.user = decodeToken;
  next();
});