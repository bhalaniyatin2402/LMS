import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ByCourses({ data }) {
  const navigate = useNavigate();
  const { t } = useTranslation()

  return (
    <div className="">
      <div className="">
        <ul>
          <li className="text-md sm:text-xl md:text-2xl tracking-wider font-semibold py-2 border border-b-black">
            <p className="w-[15%] text-center">{t('Sr. No.')}</p>
            <p className="w-[60%] text-center">{t('Title')}</p>
            <p className="w-[20%] text-center">{t('Total sell')}</p>
          </li>
          {data?.course?.map((course, i) => (
            <label htmlFor="my_modal_7" key={course._id}>
              <li
                className="py-1 sm:py-2 list-item text-lg tracking-wide font-medium cursor-pointer border border-b-white"
                onClick={() => {
                  navigate("/course/description", { state: course });
                }}
              >
                <p className="w-[15%] text-sm sm:text-lg text-center">
                  {i + 1}
                </p>
                <p className="w-[60%] text-sm sm:text-lg text-center">
                  {course.title}
                </p>
                <p className="w-[20%] text-sm sm:text-lg text-center">
                  {course?.purchasedCourseByUser}
                </p>
              </li>
            </label>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ByCourses;
