import axios from "axios";

export const getProfile = async (token) => {
  const res = await axios.get("https://flyora-backend-v2.onrender.com/api/v1/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};