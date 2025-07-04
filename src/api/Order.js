import axios from "axios";

/**
 * Tạo đơn hàng mới
 * @param {number} customerId
 * @param {Array} items - [{ productId, quantity }]
 * @returns { orderId, status }
 */
export const createOrder = async (customerId, items) => {
  const res = await axios.post("https://flyora-backend.onrender.com/api/v1/orders", {
    customerId,
    items,
  });

  return res.data;
};