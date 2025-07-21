import axios from "axios";

export const deleteAccount = async (id, requesterId) => {
  try {
    const response = await axios.delete(
      `https://flyora-backend.onrender.com/api/v1/admin/accounts/${id}?requesterId=${requesterId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete account:", error);
    throw error;
  }
};