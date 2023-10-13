import React from "react";
import { useNavigate } from "react-router-dom";

import courseThumbnail from "../../assets/course_thubnail.avif";

function CourseCard({ course }) {
  const navigate = useNavigate();
  return (
    <div
      className="course-card"
      onClick={() => navigate(`/course/description`, { state: course })}
    >
      <img
        src={
          course?.thumbnail?.secure_url
            ? course?.thumbnail?.secure_url
            : courseThumbnail
        }
      />
      <div className="info">
        <h2>{course.title}</h2>
        <p>{course.price}₹</p>
      </div>
    </div>
  );
}

export default CourseCard;
