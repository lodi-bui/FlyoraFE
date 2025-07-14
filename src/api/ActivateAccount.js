import axios from "axios";

export const activateAccount = async (accountId, requesterId) => {
  try {
    const response = await axios.put(
      `https://flyora-backend.onrender.com/api/v1/admin/accounts/${accountId}/activate?requesterId=${requesterId}`,
      {},
      {
        headers: {
          accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error activating account:", error);
    throw error;
  }
};
