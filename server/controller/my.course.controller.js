import MyCourse from "../models/my.course.model.js";
import Payment from "../models/payment.model.js";
import asyncHandler from "../middleware/asyncHandler.middleware.js";
import AppError from "../utils/error.utils.js";
import Course from "../models/course.model.js";

/**
 * @GET_MY_COURSE_LIST
 * @ROUTE @GET
 * @ACCESS course purchased user only {{url}}/api/v1/my-courses
 */

export const getMyAllCourses = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const payment = await Payment.findOne({ userId: id });
  const courses = await Course.find().select("-lectures");

  if (!payment) {
    return next(new AppError(`still! you can't purchase any courses`, 403));
  }

  let listOfCourses = [];

  payment.purchasedCourse.map((item) => {
    courses.map((course) => {
      if (course._id.toString() === item.courseId) {
        item.purchaseDetails.map(payment => {
          if(payment.expirationDate > Date.now()) {
            return listOfCourses.push({
              _id: course._id,
              title: course.title,
              thumbnail: course.thumbnail,
            });
          }
        })
      }
    });
  });

  res.status(200).json({
    success: true,
    courseList: listOfCourses,
  });
});

/**
 * @GET_MY_COURSE_LECTURE_PROGRESS
 * @ROUTE @GET
 * @ACCESS course purchased user only {{url}}/api/v1/my-courses/:courseId
 */

export const getMyCourseLectureProgress = asyncHandler(
  async (req, res, next) => {
    const { id } = req.user;
    const { courseId } = req.params;

    const mycourse = await MyCourse.findOne({ userId: id });

    if (!mycourse) {
      return next(new AppError(`you don't have access of this course`, 400));
    }

    const courseIndex = mycourse.myPurchasedCourses.findIndex(
      (item) => item.courseId === courseId
    );

    if (courseIndex === -1) {
      return next(new AppError(`you don't have access of this course`, 400));
    }

    const courseProgress = mycourse.myPurchasedCourses[courseIndex];

    res.status(200).json({
      success: true,
      courseProgress,
    });
  }
);

/**
 * @ADD_NOTE_INTO_LECTURE
 * @ROUTE @POST
 * @ACCESS course purchased user only {{url}}/api/v1/my-courses/:courseId/:lectureId
 */

export const addNote = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { note } = req.body;
  const { courseId } = req.params;
  const { lectureId } = req.query

  const myCourse = await MyCourse.findOne({ userId: id });

  const lectureInfo = {
    lectureId,
    notes: [note],
  };

  const courseIndex = myCourse.myPurchasedCourses.findIndex(
    (item) => item.courseId === courseId
  );

  if (courseIndex === -1) {
    return next(new AppError(`you don't access of this course`, 400));
  }

  const lectureIndex = myCourse.myPurchasedCourses[
    courseIndex
  ].lectureProgress.findIndex((item) => item.lectureId === lectureId);

  if (lectureIndex === -1) {
    myCourse.myPurchasedCourses[courseIndex].lectureProgress.push(lectureInfo);
  } else {
    myCourse.myPurchasedCourses[courseIndex].lectureProgress[
      lectureIndex
    ].notes.push(note);
  }

  await myCourse.save();

  res.status(200).json({
    success: true,
    message: "note added successfully",
  });
});

/**
 * @UPDATE_LECTURE_CHECK_MARK
 * @ROUTE @PUT
 * @ACCESS course purchased user only {{url}}/api/v1/my-courses/:courseId/:lectureId
 */

export const updateLectureMark = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { checked } = req.body;
  const { courseId } = req.params;
  const { lectureId } = req.query

  const myCourse = await MyCourse.findOne({ userId: id });

  const lectureInfo = {
    lectureId,
    marked: checked,
  };

  const courseIndex = myCourse.myPurchasedCourses.findIndex(
    (item) => item.courseId === courseId
  );

  if (courseIndex === -1) {
    return next(new AppError(`you don't access of this course`, 400));
  }

  const lectureIndex = myCourse.myPurchasedCourses[
    courseIndex
  ].lectureProgress.findIndex((item) => item.lectureId === lectureId);

  if (lectureIndex !== -1) {
    myCourse.myPurchasedCourses[courseIndex].lectureProgress[
      lectureIndex
    ].marked = checked;
  } else {
    myCourse.myPurchasedCourses[courseIndex].lectureProgress.push(lectureInfo);
  }

  await myCourse.save();

  res.status(200).json({
    success: true,
    message: `lecture ${checked ? "marked" : "unmarked"}`,
  });
});

/**
 * @DELETE_LECTURE_CHECK_MARK
 * @ROUTE @DELETE
 * @ACCESS course purchased user only {{url}}/api/v1/my-courses/:courseId/:lectureId
 */

export const deleteNote = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { noteIndex } = req.body;
  const { lectureId } = req.query
  const { courseId } = req.params;

  const myCourse = await MyCourse.findOne({ userId: id });

  const courseIndex = myCourse.myPurchasedCourses.findIndex(
    (item) => item.courseId === courseId
  );

  if (courseIndex === -1) {
    return next(new AppError(`you don't have access to this course`, 400));
  }

  const lectureIndex = myCourse.myPurchasedCourses[
    courseIndex
  ].lectureProgress.findIndex((item) => item.lectureId === lectureId);

  if (lectureIndex === -1) {
  }

  if (
    !myCourse.myPurchasedCourses[courseIndex].lectureProgress[lectureIndex]
      .notes[noteIndex]
  ) {
    return next(new AppError(`no note found on this note index`, 400));
  }

  myCourse.myPurchasedCourses[courseIndex].lectureProgress[
    lectureIndex
  ].notes.splice(noteIndex, 1);

  myCourse.save();

  res.status(200).json({
    success: true,
    message: "notes removed from lecture progress",
  });
});
