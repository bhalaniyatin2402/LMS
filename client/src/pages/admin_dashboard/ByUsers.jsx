import { useState } from "react";
import { useTranslation } from "react-i18next";
import { month } from "../../constants/data";

function ByUsers({ data }) {
  const { t } = useTranslation()
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: "",
    totalCourses: [],
  });

  return (
    <>
      <div className="">
        <ul>
          <li className="text-md sm:text-xl md:text-2xl tracking-wider font-semibold py-2 border border-b-black">
            <p className="w-[15%] text-center">{t('Sr. No.')}</p>
            <p className="w-[40%] text-center">{t('name')}</p>
            <p className="w-[30%] text-center">{t('No of Courses')}</p>
          </li>
          {data?.map((user, i) => (
            <label htmlFor="my_modal_7" key={user.userId}>
              <li
                className="py-1 sm:py-2 list-item text-lg tracking-wide font-medium cursor-pointer border border-b-white"
                onClick={() =>
                  setUserInfo({
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    totalCourses: user.purchasedCourses,
                  })
                }
              >
                <p className="w-[15%] text-sm sm:text-lg text-center">
                  {i + 1}
                </p>
                <p className="w-[40%] text-sm sm:text-lg text-center">
                  {user.name}
                </p>
                <p className="w-[30%] text-sm sm:text-lg text-center">
                  {user?.purchasedCourses.length !== 0
                    ? user?.purchasedCourses.length
                    : "-"}
                </p>
              </li>
            </label>
          ))}
        </ul>
      </div>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white">
          <h3 className="text-lg font-bold">{userInfo.name}</h3>
          <div className="mt-5 flex flex-col justify-center items-center gap-3">
            <img src={userInfo.avatar} className="rounded-full max-w-[200px]" />
            <p className="text-lg font-medium">{userInfo.email}</p>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-xl sm:text-2xl text-center font-semibold">
                {t('Purchased Courses')}
              </h2>
              {userInfo?.totalCourses?.length === 0 && "no course purchased"}
              {userInfo?.totalCourses?.map((item, i) => (
                <div key={i}>
                  <div className="text-md sm:text-lg text-center tracking-wide font-medium text-primary">
                    {item.courseTitle}
                    <p className="text-xs text-black ms-2 text-center">
                      {`(${
                        month[new Date(item.purchaseDate).getMonth()]
                      }/${new Date(item.purchaseDate).getFullYear()}-${
                        month[new Date(item.exiprationDate).getMonth()]
                      }/${new Date(item.exiprationDate).getFullYear()})`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <label className="modal-backdrop" htmlFor="my_modal_7">
          {t('Close')}
        </label>
      </div>
    </>
  );
}

export default ByUsers;
