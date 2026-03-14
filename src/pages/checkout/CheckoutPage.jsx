import React, { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import ShippingInfo from "./ShippingInfo";
import PaymentMethod from "./PaymentMethod";
import PayOnline from "./PayOnline";
import Header from "../navfoot/Header";
import Footer from "../navfoot/Footer";
import { createOrder } from "../../api/Order";
import { createPayment } from "../../api/Payment";
import { getCart } from "../../api/Cart";
import { ShippingFee } from "../../api/ShippingFee";

const CheckoutPage = () => {
  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    notes: "",
  });

  const handleShipChange = (e) =>
    setShipping({ ...shipping, [e.target.name]: e.target.value });

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const rawCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (rawCart.length === 0) return;

      try {
        const productData = await getCart(rawCart);
        const merged = productData.map((prod) => {
          const match = rawCart.find(
            (c) => c.id === prod.id || c.id === prod.productId,
          );
          return {
            id: prod.id || prod.productId,
            name: prod.name,
            img: prod.imageUrl,
            price: prod.price,
            qty: match ? match.qty : 1,
          };
        });
        setItems(merged);
      } catch (err) {
        console.error("Lỗi khi gọi getCart:", err);
      }
    };
    fetchCart();
  }, []);

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items],
  );

  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    const fetchShippingFee = async () => {
      // const storedUser = JSON.parse(localStorage.getItem("user"));
      // const requesterId = storedUser?.linkedId;
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

      const customerId =
        storedUser?.linkedId ||
        storedUser?.userId ||
        localStorage.getItem("linkedId");
      if (!customerId) {
        alert("Bạn chưa đăng nhập!");
        return;
      }
      const districtId = parseInt(shipping.district);
      const wardCode =
        typeof shipping.ward === "string" ? shipping.ward.trim() : "";

      const weight = items.reduce((sum, item) => sum + item.qty * 300, 0); // ví dụ 300g/sp
      const insurance_value = total;
      const height = 10;
      const length = 30;
      const width = 20;
      const service_id = 53320; // hoặc id hợp lệ bạn có

      // Kiểm tra toàn bộ dữ liệu
      const isValid =
        customerId &&
        districtId > 0 &&
        wardCode &&
        weight > 0 &&
        height > 0 &&
        length > 0 &&
        width > 0 &&
        insurance_value > 0 &&
        service_id > 0;

      if (!isValid) {
        console.warn(" Payload không hợp lệ, không gọi API", {
          customerId,
          districtId,
          wardCode,
          weight,
          height,
          length,
          width,
          insurance_value,
          service_id,
        });
        return;
      }

      const payload = {
        to_district_id: districtId,
        to_ward_code: wardCode,
        weight,
        height,
        length,
        width,
        insurance_value,
        service_id,
      };

      console.log(" Payload tính phí GHN:", payload);

      try {
        const res = await ShippingFee(customerId, payload);
        const fee = res.total || res.fee || 30000;
        setShippingFee(fee);
        console.log("Phí vận chuyển:", fee);
      } catch (err) {
        console.error(" Lỗi khi tính phí vận chuyển:", err);
        if (err.response?.data) {
          console.error(" Phản hồi lỗi từ server:", err.response.data);
        }
        setShippingFee(30000); // fallback
      }
    };

    fetchShippingFee();
  }, [shipping.district, shipping.ward, items, total]);

  const [payment, setPayment] = useState("cod");
  const handlePayChange = (e) => setPayment(e.target.value);

  const [showPayOnline, setShowPayOnline] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [payUrl, setPayUrl] = useState(null);

  const handleSubmit = async () => {
    try {
      const requiredFields = [
        "name",
        "phone",
        "email",
        "address",
        "province",
        "district",
        "ward",
      ];

      const emptyFields = requiredFields.filter(
        (field) => !shipping[field]?.trim(),
      );

      if (emptyFields.length > 0) {
        alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
        return;
      }

      const rawCart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemsToSend = rawCart
        .filter((item) => item.qty && item.qty > 0)
        .map((item) => ({
          productId: item.id,
          quantity: item.qty,
        }));

      if (itemsToSend.length === 0) {
        alert("Giỏ hàng trống!");
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const customerId = storedUser?.linkedId;

      if (!customerId) {
        alert("Bạn chưa đăng nhập!");
        return;
      }

      const orderRes = await createOrder(customerId, itemsToSend);
      const newOrderId = orderRes.orderId;
      setOrderId(newOrderId);

      const paymentMethodId = payment === "payonline" ? 1 : 2;
      const paymentData = {
        orderId: newOrderId,
        customerId,
        paymentMethodId,
        ...(paymentMethodId === 1
          ? { amount: total + shippingFee }
          : {
              to_name: shipping.name,
              to_phone: shipping.phone,
              to_address: shipping.address,
              to_ward_code: shipping.ward,
              to_district_id: parseInt(shipping.district),
            }),
      };

      if (paymentMethodId === 1) {
        const payRes = await createPayment(paymentData);
        // const payUrl = payRes?.paymentUrl || payRes?.payUrl || payRes?.url;
        const payUrl =
          payRes?.paymentUrl ||
          payRes?.payUrl ||
          payRes?.url ||
          payRes?.checkoutUrl ||
          payRes?.data?.checkoutUrl;

        if (!payUrl) throw new Error("Không nhận được link thanh toán từ API.");

        setShowPayOnline(true);
        setOrderId(newOrderId);
        setPayUrl(payUrl);
        localStorage.removeItem("cart");
      } else {
        const payRes = await createPayment(paymentData);
        setSuccess(true);
        localStorage.removeItem("cart");
      }
    } catch (err) {
      console.error("Lỗi đặt hàng:", err);
      if (err.response) {
        console.error("Server trả về:", err.response.data);
      }
      alert("Đặt hàng thất bại. Vui lòng thử lại.");
    }
  };

  if (success) {
    return <Navigate to="/checkout/confirm" replace state={{ orderId }} />;
  }

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto py-12 px-4 lg:px-0">
        {showPayOnline ? (
          <PayOnline payUrl={payUrl} onCancel={() => setShowPayOnline(false)} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-[38px]">
            <div className="space-y-8">
              <ShippingInfo data={shipping} onChange={handleShipChange} />
              <PaymentMethod method={payment} onChange={handlePayChange} />
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

            <div className="space-y-6">
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
                          {it.price.toLocaleString()} VND
                        </p>
                      </div>
                    </div>
                    <div className="border px-3 py-1 rounded">{it.qty}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Tổng tiền hàng</span>
                    <span>{total.toLocaleString()} VND</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>{shippingFee.toLocaleString()} VND</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Tổng thanh toán</span>
                    <span>{(total + shippingFee).toLocaleString()} VND</span>
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
