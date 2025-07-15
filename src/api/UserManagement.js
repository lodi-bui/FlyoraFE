import axios from "axios";

export const UserAccounts = async (requesterId) => {
  try {
    const response = await axios.get(
      `https://flyora-backend.onrender.com/api/v1/admin/accounts?requesterId=${requesterId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed:", error);
    throw error;
  }
}