import { useEffect } from "react";
import { useFormik } from "formik";
import { FcFilledFilter } from "react-icons/fc";
import { useTranslation } from "react-i18next";

import {
  useGetAllCorsesMutation,
  useGetFilterListQuery,
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
    data: filters,
    isLoading: filtersLoading,
    error: filtersError,
  } = useGetFilterListQuery();
  const [getAllCourses, { data, isLoading, error }] = useGetAllCorsesMutation();
  const { t } = useTranslation();

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      category: [],
      instructor: [],
    },
    onSubmit: async (values, actions) => {
      let category = values.category;
      let instructor = values.instructor;
      if (category.length === 0) {
        category = filters?.categories;
      }
      if (instructor.length === 0) {
        instructor = filters?.instructors;
      }
      await getAllCourses({ category, instructor });
    },
  });

  useEffect(() => {
    getAllCourses();
  }, []);

  if (isLoading || filtersLoading) {
    return <Loader />;
  }

  if (error || filtersError) {
    return <PageNotFound />;
  }

  return (
    <>
      <main className="courses-page">
        <h1>{t("Explore Courses")}</h1>
        <div
          className="filter-icon"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <FcFilledFilter />
          <span>{t("Filter")}</span>
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
          options={filters?.categories}
          values={values}
          name="category"
          filterTitle="Filter By Category"
          setFieldValue={setFieldValue}
        />
        <Checkbox
          options={filters?.instructors}
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
