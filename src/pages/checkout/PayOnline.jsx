// src/pages/checkout/PayOnline.jsx
import React, { useEffect } from "react";
import { createPayOSLink } from "../../api/PayOs";
import { createPayment } from "../../api/Payment";

const PayOnline = ({ total, orderId, onCancel }) => {
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        // Gọi API tạo thanh toán (tạo payment trên backend)
        await createPayment({
          orderId,
          customerId: JSON.parse(localStorage.getItem("user"))?.linkedId,
          paymentMethodId: 1,
          amount: total,
        });

        // Gọi API lấy link thanh toán
        const data = await createPayOSLink(orderId);
        const payUrl =
          typeof data === "string" ? data : data?.payUrl || data?.url;

        if (payUrl) {
          console.log("Link thanh toán:", payUrl);
          window.location.href = payUrl;
        } else {
          console.warn("Không tìm thấy link thanh toán:", data);
          alert("Không tìm thấy link thanh toán.");
        }
      } catch (err) {
        console.error("Lỗi khi tạo thanh toán hoặc lấy link PayOS:", err);
        alert("Không thể tạo link thanh toán.");
      }
    };

    handleRedirect();
  }, [orderId, total]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
      {/* Left: Thông tin đơn hàng */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Thông tin đơn hàng</h3>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Số tiền thanh toán</p>
          <p className="text-red-500 font-bold text-2xl mb-4">
            {total.toLocaleString()}₫
          </p>
          <p className="text-gray-600">Mã đơn hàng</p>
          <p className="font-semibold">{orderId}</p>
        </div>
      </div>

      {/* Right: Trạng thái */}
      <div className="text-center flex flex-col justify-center items-center">
        <h3 className="text-lg font-medium mb-4">
          Đang chuyển hướng đến PayOS...
        </h3>
        <p className="text-gray-500 mb-4">Vui lòng đợi trong giây lát</p>
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Hủy thanh toán
        </button>
      </div>
    </div>
  );
};

export default PayOnline;
