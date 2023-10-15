import { useNavigate } from "react-router-dom";
import { GiCancel } from "react-icons/gi";

function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <main className="h-[85vh] flex justify-center items-center">
      <div className="w-[300px] bg-white rounded-lg flex flex-col items-center">
        <h1 className="w-full text-center text-2xl text-error py-2">
          Payment Failed
        </h1>
        <div className="my-10">
          <GiCancel className="text-4xl mx-auto text-error" />
          <h1 className="text-center text-2xl mt-1">something went wrong!</h1>
          <p className="w-[60%] mx-auto text-center mt-2 text-xl">
            please try again later
          </p>
        </div>
        <button
          type="submit"
          className={`btn btn-sm bg-error mt-3 px-6 text-white my-3`}
          onClick={() => navigate(`/courses`)}
        >
          Go to Course
        </button>
      </div>
    </main>
  );
}

export default PaymentFailure;
