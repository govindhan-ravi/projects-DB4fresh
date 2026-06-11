import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailed() {
  const navigate = useNavigate();

  const retryPayment = () => {
    navigate("/payment"); // go back to payment page
  };

  return (
    <div className="max-w-md mx-auto mt-24 text-center p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-3">
        Payment Failed
      </h2>

      <p className="text-gray-600 mb-6">
        Your payment could not be completed.
        <br />
        Don’t worry — no money was deducted.
      </p>

      <button
        onClick={retryPayment}
        className="w-full bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold"
      >
        Retry Payment
      </button>

      <button
        onClick={() => navigate("/cart")}
        className="w-full mt-3 border border-gray-300 py-3 rounded-lg text-gray-700"
      >
        Back to Cart
      </button>
    </div>
  );
}
