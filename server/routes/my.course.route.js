import { Router } from "express";
const router = Router();
import {
  isLoggedIn,
  isPurchasedCourse,
} from "../middleware/auth.middleware.js";
import {
  addNote,
  deleteNote,
  getMyAllLectures,
  getMyCourseLectureProgress,
  updateLectureMark,
} from "../controller/my.course.controller.js";

router.route("/").get(isLoggedIn, getMyAllLectures);

router
  .route("/:courseId")
  .get(isLoggedIn, isPurchasedCourse, getMyCourseLectureProgress);

router
  .route("/:courseId/:lectureId")
  .post(isLoggedIn, isPurchasedCourse, addNote)
  .put(isLoggedIn, isPurchasedCourse, updateLectureMark)
  .delete(isLoggedIn, isPurchasedCourse, deleteNote);

export default router;
