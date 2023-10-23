import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FcFilledFilter } from "react-icons/fc";

import {
  useGetAllCorsesMutation,
  useGetCategoryListQuery,
  useGetInstructorListQuery,
} from "../../redux/services/lmsCourseApi";
import CourseCard from "../../components/ui/CourseCard";
import FilterModal from "../../components/layouts/FilterModal";
import Loader from "../../components/ui/Loader";
import PageNotFound from "../PageNotFound";
import Checkbox from "../../components/forms/Checkbox";
import NoResult from "../../assets/no-results.png";
import "../../styles/pages/course/CourseList.scss";

function CourseList() {
  const {
    data: categories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetCategoryListQuery();
  const {
    data: instructors,
    isLoading: instructorLoading,
    error: instructorError,
  } = useGetInstructorListQuery();
  const [getAllCourses, { data, isLoading, error }] = useGetAllCorsesMutation();

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      category: [],
      instructor: [],
    },
    onSubmit: async (values, actions) => {
      let category = values.category;
      let instructor = values.instructor;
      if (category.length === 0) {
        category = categories;
      }
      if (instructor.length === 0) {
        instructor = instructors;
      }
      const res = await getAllCourses({ category, instructor });
    },
  });

  useEffect(() => {
    getAllCourses();
  }, []);

  if (isLoading || categoryLoading || instructorLoading) {
    return <Loader />;
  }

  if (error || categoryError || instructorError) {
    return <PageNotFound />;
  }

  return (
    <>
      <main className="courses-page">
        <h1>Explore Courses</h1>
        <div
          className="filter-icon"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <FcFilledFilter />
          <span>Filter</span>
        </div>
        <div className="course-list">
          {data?.courses.length !== 0 ? (
            data?.courses.map((course) => (
              <CourseCard course={course} key={course._id} />
            ))
          ) : (
            <img
              src={NoResult}
              className="w-[40%] h-[40%] sm:w-[350px] sm:h-[350px] m-auto"
            />
          )}
        </div>
      </main>

      <FilterModal onSubmit={handleSubmit}>
        <Checkbox
          options={categories}
          values={values}
          name="category"
          filterTitle="Filter By Category"
          setFieldValue={setFieldValue}
        />
        <Checkbox
          options={instructors}
          values={values}
          name="instructor"
          filterTitle="Filter By Instructor"
          setFieldValue={setFieldValue}
        />
      </FilterModal>
    </>
  );
}

export default CourseList;
