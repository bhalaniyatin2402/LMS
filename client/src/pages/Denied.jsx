import { t } from "i18next";
import { useNavigate } from "react-router-dom";

function Denied() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-center items-center bg-[#e5e6e6] h-[85vh]">
      <h1 className="relative text-9xl font-bold tracking-widest">
        403
        <p className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 rotate-12 text-sm tracking-wide w-fit mx-auto">
          access denied
        </p>
      </h1>
      <button
        className="btn btn-outline btn-warning mt-4"
        onClick={() => navigate("/")}
      >
        {t('Go Back')}
      </button>
    </main>
  );  
}

export default Denied;
