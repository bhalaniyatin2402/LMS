import toast from "react-hot-toast";

function Alert() {
  return (
    <>
      {window.addEventListener("load", function () {
        {
          toast.error(
            `payment is in the test mode. don't fill correct details`
          );
        }
      })}
    </>
  );
}

export default Alert;
