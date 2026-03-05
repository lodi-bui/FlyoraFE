import axios from "axios";
export const UserAccounts = async (requesterId) => {
  try {
    const response = await axios.get(
      `https://flyora-backend-v2.onrender.com/api/v1/admin/accounts`,
      {
        params: {
          requesterId: requesterId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed:", error.response?.data || error);
    throw error;
  }
};