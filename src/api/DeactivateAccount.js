import axios from "axios";

export const deactivateAccount = async (accountId, requesterId) => {
  try {
    const response = await axios.put(
      `https://flyora-backend.onrender.com/api/v1/admin/accounts/${accountId}/deactivate?requesterId=${requesterId}`,
      {},
      {
        headers: {
          accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deactivating account:", error);
    throw error;
  }
};
