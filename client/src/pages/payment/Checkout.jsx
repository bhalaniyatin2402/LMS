import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../../styles/pages/Checkout.scss";

function Checkout() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  if (state === null || !state) {
    return <Navigate to="/courses" />;
  }

  async function handleCheckout() {
    setLoading(true);
    fetch(`${import.meta.env.VITE_APP_COURSIFY_API}/api/v1/payment/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        amount: state?.price,
        title: state?.title,
        courseId: state?._id,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.log(e.error);
      });
    setLoading(false);
  }

  return (
    <main className="checkout">
      <div className="container">
        <h1>{t("Order details")}</h1>
        <div className="course-data">
          <img src={state?.thumbnail?.secure_url} />
          <h2>{state?.title}</h2>
        </div>
        <div className="course-time">
          {t("access")}:{" "}
          <span>
            {state?.expiry} {t("months")}
          </span>
        </div>
        <div className="course-price">
          {t("price")}: <span>{state?.price}₹</span>
        </div>
        <button
          type="submit"
          className={`btn btn-sm btn-primary mt-3 px-6 ${
            loading && "btn-disabled"
          }`}
          onClick={handleCheckout}
        >
          {loading && <span className="loading loading-spinner"></span>}
          {t("process to checkout")}
        </button>
      </div>
    </main>
  );
}

export default Checkout;
