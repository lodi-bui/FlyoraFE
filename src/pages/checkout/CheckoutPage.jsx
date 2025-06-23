// src/pages/checkout/CheckoutPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import ShippingInfo from "./ShippingInfo";
import PaymentMethod from "./PaymentMethod";
import VnpaySection from "./VnpaySection";
import Header from "../navfoot/Header";
import Footer from "../navfoot/Footer";

const CheckoutPage = () => {
  // 1) Thông tin giao hàng
  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });
  const handleShipChange = (e) =>
    setShipping({ ...shipping, [e.target.name]: e.target.value });

  // 2) Giỏ hàng
  const [items, setItems] = useState([]);
  useEffect(() => {
    // TODO: replace bằng fetch thực từ API /cart
    setItems([
      {
        id: 3,
        name: "Product 3",
        img: "/images/product3.jpg",
        price: 50000,
        qty: 2,
      },
      {
        id: 7,
        name: "Product 7",
        img: "/images/product7.jpg",
        price: 60000,
        qty: 1,
      },
      {
        id: 8,
        name: "Product 8",
        img: "/images/product8.jpg",
        price: 100000,
        qty: 1,
      },
    ]);
  }, []);
  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  // 3) Phương thức thanh toán
  const [payment, setPayment] = useState("cod");
  const handlePayChange = (e) => setPayment(e.target.value);

  // 4) Show màn QR VNPAY
  const [showVnpay, setShowVnpay] = useState(false);

  // 5) Đặt hàng thành công với COD → redirect confirm
  const [success, setSuccess] = useState(false);

  // Mã đơn mô phỏng, về sau lấy từ backend trả về
  const orderId = "SPS12345H527";

  // Khi nhấn Đặt Hàng
  const handleSubmit = () => {
    if (payment === "vnpay") {
      // VNPAY: hiện màn QR
      setShowVnpay(true);
    } else {
      // COD: đặt luôn và redirect
      // TODO: gọi API checkout ở đây
      setSuccess(true);
    }
  };

  // Nếu COD thành công thì chuyển confirm
  if (success) {
    return <Navigate to="/checkout/confirm" replace />;
  }

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto py-12 px-4 lg:px-0">
        {/* Nếu đang ở màn VNPAY, chỉ render VnpaySection */}
        {showVnpay ? (
          <VnpaySection
            total={total}
            orderId={orderId}
            onCancel={() => setShowVnpay(false)}
          />
        ) : (
          // Màn form Checkout bình thường
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-[38px]">
            {/* ─── Cột trái: Shipping, Payment, Notes ─── */}
            <div className="space-y-8">
              <ShippingInfo data={shipping} onChange={handleShipChange} />

              <PaymentMethod method={payment} onChange={handlePayChange} />

              {/* Chỉ hiển thị ghi chú khi không phải VNPAY */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Ghi chú đơn hàng</h2>
                <textarea
                  name="notes"
                  value={shipping.notes}
                  onChange={handleShipChange}
                  placeholder="Ghi chú đơn hàng"
                  rows={4}
                  className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 resize-none"
                />
              </div>
            </div>

            {/* ─── Cột phải: Cart summary & Order summary + nút Đặt ─── */}
            <div className="space-y-6">
              {/* Giỏ hàng */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Giỏ hàng</h2>
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center justify-between mb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={it.img}
                        alt={it.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{it.name}</p>
                        <p className="text-red-500">
                          {it.price.toLocaleString()}₫
                        </p>
                      </div>
                    </div>
                    <div className="border px-3 py-1 rounded">{it.qty}</div>
                  </div>
                ))}
              </div>

              {/* Tóm tắt đơn hàng + nút Đặt Hàng */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Tổng tiền hàng</span>
                    <span>{total.toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>–</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Tổng thanh toán</span>
                    <span>{total.toLocaleString()}₫</span>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="mt-6 w-full py-3 bg-green-500 text-white rounded-lg font-medium"
                >
                  Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CheckoutPage;
