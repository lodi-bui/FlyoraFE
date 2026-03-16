import axios from "axios";

export const changePassword = async (token, currentPassword, newPassword) => {
  const response = await axios.put(
    "https://flyora-backend-v2.onrender.com/api/v1/profile/password",
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
