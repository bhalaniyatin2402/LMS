import toast from "react-hot-toast";

function Alert() {
  return (
    <>
      {window.addEventListener("load", function () {
        {
          toast.error(
            `payment is in the test mode. fill dummy details and pay`
          );
        }
      })}
    </>
  );
}

export default Alert;
