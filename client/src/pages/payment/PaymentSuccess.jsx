import { useNavigate, useSearchParams } from "react-router-dom";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

function PaymentSuccess() {
  const navigate = useNavigate();
  const courseId = useSearchParams()[0].get("courseId");

  return (
    <main className="h-[85vh] flex justify-center items-center">
      <div className="w-[300px] bg-white rounded-lg flex flex-col items-center">
        <h1 className="w-full text-center text-2xl text-green-900 py-2">
          Payment Success
        </h1>
        <div className="my-10">
          <IoCheckmarkDoneCircle className="text-4xl mx-auto" />
          <h1 className="text-center text-2xl mt-1">payment done</h1>
          <p className="w-[60%] mx-auto text-center mt-2 text-xl">
            Now you can access this course
          </p>
        </div>
        <button
          type="submit"
          className={`btn btn-sm bg-green-900 mt-3 px-6 text-white my-3`}
          onClick={() => navigate(`/course/${courseId}`)}
        >
          Go to Course
        </button>
      </div>
    </main>
  );
}

export default PaymentSuccess;
