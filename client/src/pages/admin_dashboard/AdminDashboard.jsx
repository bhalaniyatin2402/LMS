import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Loader from "../../components/ui/Loader";
import {
  useCourseSellByUserQuery,
  useCoursesSellByCourseQuery,
} from "../../redux/services/lmsAdminApi";
import ByUsers from "./ByUsers";
import ByCourses from "./ByCourses";
import "../../styles/pages/AdminDashboard.scss";

function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState("user");
  const { t } =  useTranslation()

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useCourseSellByUserQuery();
  const {
    data: courseData,
    isLoading: courseLoading,
    error: courseError,
  } = useCoursesSellByCourseQuery();

  if (userLoading || courseLoading) {
    return <Loader />;
  }

  let revenue = 0;
  courseData?.course?.map((c) => {
    revenue += c?.price * c?.purchasedCourseByUser;
  }); 

  return (
    <main className="admin">
      <div className="add-course-btn w-[100%] flex justify-end px-9">
        <button 
          className="btn btn-sm btn-success font-bold text-lg"
          onClick={() => navigate('/course/create')}
        >
          {t('Course')} ++
        </button>
      </div>
      <div className="info">
        <div className="register-user">
          {t('Registered Users')}:
          <span>{userData?.totalUsers}</span>
        </div>
        <div className="total-course">
          {t('Total Courses')}:
          <span>{courseData?.totalCourses}</span>
        </div>
        <div className="revenue">
          {t('Total Revenue')}:
          <span>{revenue}₹</span>
        </div>
      </div>

      <div className="selling-info">
        <h1>{t('Courses Sell By')} </h1>
        <div className="course-sell">
          <div className="tabs tabs-boxed bg-[#e5e6e6]">
            <a
              className={`tab text-xl font-semibold ${
                tab === "user" && "tab-active"
              }`}
              onClick={() => setTab("user")}
            >
              {t('Users')}
            </a>
            <a
              className={`tab text-xl font-semibold ${
                tab === "course" && "tab-active"
              }`}
              onClick={() => setTab("course")}
            >
              {t('Courses')}
            </a>
          </div>
        </div>
      </div>

      {tab === "user" && (
        <div className="by-info w-[96%] sm:w-[80%] lg:w-[60%]">
          <ByUsers data={userData?.userCourses} />
        </div>
      )}

      {tab === "course" && (
        <div className="by-info w-[96%] sm:w-[80%] lg:w-[60%]">
          <ByCourses data={courseData} />
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;
