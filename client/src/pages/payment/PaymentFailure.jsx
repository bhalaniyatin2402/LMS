import { useNavigate } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import { useTranslation } from "react-i18next";

function PaymentFailure() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="min-h-[85vh] flex justify-center items-center">
      <div className="w-[300px] my-10 bg-white rounded-lg flex flex-col items-center">
        <h1 className="w-full text-center text-2xl text-error py-2">
          {t("Payment Failed")}
        </h1>
        <div className="my-10">
          <GiCancel className="text-4xl mx-auto text-error" />
          <h1 className="text-center text-2xl mt-1">
            {t("something went wrong")}!
          </h1>
          <p className="w-[60%] mx-auto text-center mt-2 text-xl">
            {t("please try again later")}
          </p>
        </div>
        <button
          type="submit"
          className={`btn btn-sm bg-error mt-3 px-6 text-white my-3`}
          onClick={() => navigate(`/courses`)}
        >
          {t("Go To Course")}
        </button>
      </div>
    </main>
  );
}

export default PaymentFailure;
