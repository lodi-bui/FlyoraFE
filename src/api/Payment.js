import axios from "axios";

/**
 * Tạo thanh toán mới (COD hoặc VNPay)
 * @param {Object} paymentData - Gồm: orderId, customerId, paymentMethodId, amount (nếu VNPay)
 * @returns Trả về link thanh toán (vnpay) hoặc paymentId (COD)
 */
// src/api/payments.js
const BASE = "https://flyora-backend.onrender.com/api/v1";

export const createPayment = async (paymentData) => {
  const res = await axios.post(`${BASE}/payments`, paymentData);
  return res.data;
};

