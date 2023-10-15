import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

import {
  useGetApiKeyQuery,
  useCheckoutMutation,
} from "../../redux/services/lmsPaymentApi";
import Loader from "../../components/ui/Loader";
import toast from "react-hot-toast";
import "../../styles/pages/Checkout.scss";

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data: key, isLoading, error } = useGetApiKeyQuery(state?._id);
  const [checkout, { isLoading: loading }] = useCheckoutMutation();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    if (error?.status === 502 && !isLoading) {
      return <Navigate to={`/course/${state?._id}`} />;
    }
    toast.error(error?.data?.message);
  }

  if (state === null) {
    navigate(`/courses`);
  }

  async function handleCheckout() {
    const res = await checkout({ amount: state?.price });
    if (res?.error) {
      return toast.error(res?.error?.data?.message);
    }
    const { order, user } = res?.data;

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Coursify",
      description: `purchasing ${state?.title} course`,
      image: state?.thumbnail?.secure_url,
      order_id: order.id,
      callback_url: `http://localhost:3000/api/v1/payment/verify?courseId=${state?._id}`,
      prefill: {
        name: `${user.name}`,
        email: `${user.email}`,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3B82F6",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  return (
    <main className="checkout">
      <div className="container">
        <h1>Order Details</h1>
        <div className="course-data">
          <img src={state?.thumbnail?.secure_url} />
          <h2>{state?.title}</h2>
        </div>
        <div className="course-time">
          Access: <span>{state?.expiry} Months</span>
        </div>
        <div className="course-price">
          Price: <span>{state?.price}₹</span>
        </div>
        <button
          type="submit"
          className={`btn btn-sm btn-primary mt-3 px-6 ${
            loading && "btn-disabled"
          }`}
          onClick={handleCheckout}
        >
          {loading && <span className="loading loading-spinner"></span>}
          Process To Checkout
        </button>
      </div>
    </main>
  );
}

export default Checkout;
