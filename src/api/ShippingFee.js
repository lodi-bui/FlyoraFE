// src/api/ShippingFee.js
import axios from "axios";

const BASE = "https://flyora-backend-v2.onrender.com/api/v1";

export const ShippingFee = async (requesterId, data) => {
  const res = await axios.post(
    `${BASE}/shipping-utils/calculate-fee?requesterId=${requesterId}`,
    data
  );
  return res.data;
};
