// src/api/Register.js
import axios from "axios";

export const RegisterAPI = async (username, password, email, phone, name) => {
  const res = await axios.post("https://flyora-backend.onrender.com/api/auth/register", {
    username,
    password,
    email,
    phone,
    name, // ✅ thêm trường name
  });

  return res.data;
};
