import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";
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

export const authorizedRoles = (...roles) =>
  asyncHandler(async (req, res, next) => {
    const currentUserRole = req.user.role;

    if (!roles.includes(currentUserRole)) {
      return next(
        new AppError("you do not have permission to aceess this route", 400)
      );
    }

    next();
  });

export const isPurchasedCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { courseId } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("user not found", 400));
  }

  if (user.role === "ADMIN") {
    return next();
  }

  const payment = await Payment.findOne({ userId: id });

  if (!payment) {
    return next(
      new AppError(`you don't have permission to access this course`, 400)
    );
  }

  const courseIndex = payment.purchasedCourse.findIndex(
    (item) => item.courseId === courseId
  );

  if (courseIndex === -1) {
    return next(
      new AppError(`you don't have permission to access this course`, 400)
    );
  }

  const isPurchased = payment.purchasedCourse[courseIndex].purchaseDetails.find(
    (detail) => detail.expirationDate > Date.now()
  );

  if (isPurchased) {
    next();
  } else {
    return next(
      new AppError(`you don't have permission to access this course`, 400)
    );
  }
});
