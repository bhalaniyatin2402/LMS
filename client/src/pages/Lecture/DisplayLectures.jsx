import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useGetLecturesMutation } from "../../redux/services/lmsCourseApi";
import Denied from "../Denied";
import Loader from "../../components/ui/Loader";
import Video from "../../components/Video";
import LectureNotes from "../../components/ui/LectureNotes";
import LectureList from "../../components/LectureList";
import "../../styles/pages/lecture/DisplayLecture.scss";

function DisplayLectures() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const role = useOutletContext();
  const [currentLecture, setCurrentLecture] = useState(0);
  const [tab, setTab] = useState("overview");
  const { t } = useTranslation()
  const [getLecture, { isLoading, data, error }] =
    useGetLecturesMutation(courseId);

  useEffect(() => {
    getLecture(courseId);
    const currLect = window.localStorage.getItem(courseId);
    if (!currLect || isNaN(currLect) || currLect > data?.lectures.length) {
      setCurrentLecture(0);
    } else {
      setCurrentLecture(currLect);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Denied />;
  }

  if (data?.lectures.length === 0) {
    return (
      <div className="h-[80vh] flex justify-center items-center text-3xl flex-col">
        {t('No Lecture Exist')}
        {role && role === "ADMIN" && (
          <button
            className="btn btn-sm btn-primary mt-3"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/course/lecture/add", { state: courseId });
            }}
          >
            {t('Add Lecture')}
          </button>
        )}
      </div>
    );
  }

  return (
    <main className="lectures">
      <h1 className="title">{data?.title}</h1>
      <div className="container">
        {/* video section of the course */}
        <div className="left">
          <Video
            src={
              data?.lectures &&
              data?.lectures[currentLecture]?.lecture?.secure_url
            }
          />
          <div className="tabs mt-4">
            <a
              onClick={() => setTab("overview")}
              className={`tab tab-bordered ${
                tab === "overview" && "tab-active"
              }`}
            >
              {t('overview')}
            </a>
            {role !== "ADMIN" && (
              <a
                onClick={() => setTab("notes")}
                className={`tab tab-bordered ${
                  tab === "notes" && "tab-active"
                }`}
              >
                {t('Notes')}
              </a>
            )}
          </div>
          <div className="content relative">
            {tab === "overview" && (
              <div className="overview">
                <h2>{data?.lectures[currentLecture]?.name}</h2>
                <p>{data?.lectures[currentLecture]?.description}</p>
              </div>
            )}
            {tab === "notes" && (
              <div className="notes">
                <LectureNotes
                  lectures={data?.lectures}
                  courseId={courseId}
                  currentLecture={currentLecture}
                />
              </div>
            )}
          </div>
        </div>
        {/* lecture list of the course */}
        <div className="right">
          <div className="header">
            <h2>{t('Lecture List')}</h2>
            {role && role === "ADMIN" && (
              <button
                className="btn btn-sm btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/course/lecture/add", { state: courseId });
                }}
              >
                + {t('add')}
              </button>
            )}
          </div>
          <div className="lecture-list-container overflow-auto">
            <LectureList
              currentLecture={currentLecture}
              setCurrentLecture={setCurrentLecture}
              lectures={data?.lectures}
              role={role}
              getLecture={getLecture}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default DisplayLectures;
