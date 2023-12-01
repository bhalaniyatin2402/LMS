import { useTranslation } from "react-i18next";

import { useGetMyCourseListQuery } from "../../redux/services/lmsMyCourseApi";
import CourseCard from "../../components/ui/CourseCard";
import Loader from "../../components/ui/Loader";
import Error from "../Error";
import NoResult from "../../assets/no-results.png";
import "../../styles/pages/course/CourseList.scss";

function MyCourses() {
  const { data, isLoading, error } = useGetMyCourseListQuery()
  const { t } = useTranslation()

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    if(error.status === 403) {
      return (
        <div className="h-[85vh] flex justify-center items-center text-xl sm:text-3xl text-center">
          Didn't purchased any course yet!
        </div>
      )
    }
    return <Error />;
  }

  return (
    <>
      <main className="courses-page">
        <h1>{t('My Courses')}</h1>
        <div className="course-list">
          {data?.courseList?.length !== 0 ? (
            data?.courseList?.map((course) => (
              <CourseCard course={course} key={course?._id} myCourse={true} />
            ))
          ) : (
            <div className="">
              {t("you Didn't purchase any course")}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default MyCourses;
