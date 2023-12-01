import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PageNotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation()

  return (
    <main className="h-[90vh] relative flex flex-col justify-center items-center bg-[#e5e6e6]">
      <div className="">
        <h2 className="text-8xl font-bold tracking-widest">404</h2>
        <p className="bg-[#FFFFFF] text-sm px-1 py-[2px] rounded text-center -rotate-12 absolute top-[50%] left-[50%] -translate-x-16 -translate-y-12">
          page not found
        </p>
      </div>
      <div className="">
        <button
          className="btn btn-outline btn-warning mt-7"
          onClick={() => navigate(-1)}
        >
          {t('Go Back')}
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
