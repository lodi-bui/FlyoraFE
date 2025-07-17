// src/api/UserActivityLog.js
import axios from "axios";
export const getUserActivityLogs = async (requesterId) => {
  try {
    const response = await axios.get(
      `https://flyora-backend.onrender.com/api/v1/admin/accounts/logs?requesterId=${requesterId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed:", error);
    throw error;
  }
};