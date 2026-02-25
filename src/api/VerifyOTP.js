import axios from "axios";
export const verifyOTP = async (otp) => {
  const preAuthToken = sessionStorage.getItem("preAuthToken");

  const res = await axios.post(
    "https://flyora-backend.onrender.com/api/v2/email/verify-otp",
    { otp },
    {
      headers: {
        Authorization: `Bearer ${preAuthToken}`,
      },
    }
  );

  return res.data;
};