import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className="h-[90vh] relative flex flex-col justify-center items-center bg-base-300">
      <div className="">
        <h2 className="text-8xl font-bold tracking-widest">404</h2>
        <p className="bg-base-100 text-sm px-1 py-[2px] rounded text-center -rotate-12 absolute top-[50%] left-[50%] -translate-x-16 -translate-y-12">
          page not found
        </p>
      </div>
      <div className="">
        <button
          className="btn btn-outline btn-warning mt-7"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
