import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import { razorpay } from "../server.js";
import crypto from "crypto";
import asyncHandler from "../middleware/asyncHandler.middleware.js";
import AppError from "../utils/error.utils.js";
import { coursePurchasingMail } from "../utils/mail.utils.js";

/**
 * @GET_API_KEY
 * @ROUTR @GET
 * @ACCESS login user only {{url}}/api/v1/getkey?courseId=''
 */

export const getApiKey = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { courseId } = req.query;

  const payment = await Payment.findOne({ userId: id });

  if (!payment) {
    const payment = await Payment.create({
      userId: id,
      purchasedCourses: [],
    });
    await payment.save();
  } else {
    const courseIndex = payment.purchasedCourse.findIndex(
      (item) => item.courseId === courseId
    );

    if (courseIndex !== -1) {
      const isPurchased = payment.purchasedCourse[
        courseIndex
      ].purchaseDetails.find((detail) => detail.expirationDate > Date.now());

      if (isPurchased) {
        return next(
          new AppError("you have already purchased this course", 400)
        );
      }
    }
  }

  res.status(200).json({
    success: true,
    message: "api key",
    key: process.env.RAZORPAY_KEY_ID,
  });
});

/**
 * @CHECKOUT
 * @ROUTR @POST
 * @ACCESS login user only {{url}}/api/v1/checkout
 */

export const checkout = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { amount } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("user not found", 400));
  }

  if (user.role === "ADMIN") {
    return next(new AppError("admin cannot purchase the course", 400));
  }

  if (!amount) {
    return next(new AppError("amount is required to create order", 400));
  }

  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);

  res.status(200).json({
    success: true,
    message: "order created successfuly",
    order,
  });
});

/**
 * @VERIFY
 * @ROUTE @POST
 * @ACCESS login user only {{url}}/api/v1/payment/verify?courseId=''
 */

export const verify = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { courseId } = req.query;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${razorpay_signature}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return next(new AppError("Payment not verified, please try again.", 400));
  }

  const course = await Course.findById(courseId);
  const user = await User.findById(id);

  if (!course || !user) {
    return next(new AppError("user or course does not exist.", 400));
  }

  if (user.role === "ADMIN") {
    return next(new AppError("user cannot purchas the course", 400));
  }

  const payment = await Payment.findOne({ userId: id });

  if (!payment) {
    return next(new AppError("create order before verify the payment", 400));
  }

  const details = {
    purchaseDate: Date.now(),
    expirationDate: Date.now() + course.expiry + 30 * 24 * 60 * 60 * 1000,
    payment: {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    },
  };

  const courseIndex = payment.purchasedCourse.findIndex(
    (item) => item.courseId === courseId
  );

  if (courseIndex === -1) {
    payment.purchasedCourse.push({
      courseId,
      purchaseDetails: details,
    });
  } else {
    const isUserAlreadyPurchased = payment.purchasedCourse[
      courseIndex
    ].purchaseDetails.find((detail) => detail.expirationDate > Date.now());

    if (isUserAlreadyPurchased) {
      return next(new AppError("you have already purchased this course", 400));
    } else {
      payment.purchasedCourse[courseIndex].purchaseDetails.push(details);
    }
  }

  coursePurchasingMail(user.email, {
    courseName: course.title,
    courseExpiry: course.expiry,
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    coursePrice: course.price,
    courseLink: `http://localhost:3000/api/v1/courses/${courseId}`,
  });

  await payment.save();

  res.status(200).json({
    success: true,
    message: `now you can accesss ${course.title} course`,
  });
});
