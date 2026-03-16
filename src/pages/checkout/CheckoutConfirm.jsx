import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutConfirm = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const orderCode = location.state?.orderCode || "Không có mã đơn hàng";
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-[420px] bg-white rounded-3xl shadow-2xl p-10 text-center animate-fadeIn">
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full">
            <MdCheckCircle className="text-green-500 text-6xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Đặt hàng thành công
        </h2>

        <p className="text-gray-500 mb-6">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.
        </p>

        {/* Order ID */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl py-4 mb-6">
          <p className="text-gray-500 text-sm">Mã đơn hàng</p>
          <p className="text-lg font-semibold text-gray-800 tracking-wider">
            {orderCode}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              navigate(`/order-details/${orderCode}`, {
                state: { orderCode, orderId },
              })
            }
            className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          >
            Xem đơn hàng
          </button>

          <button
            onClick={() => navigate("/shop")}
            className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirm;
