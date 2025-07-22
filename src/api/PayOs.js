import axios from "axios";
const BASE = "https://flyora-backend.onrender.com/api";

export const createPayOSLink = async (orderId) => {
  const res = await axios.post(`${BASE}/payos/create-link/${orderId}`);
  return res.data;
};
