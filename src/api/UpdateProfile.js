// src/api/UpdateProfile.js
import axios from "axios";

export const updateProfile = async (token, data) => {
  const response = await axios.put("https://flyora-backend.onrender.com/api/v1/profile",data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
