import axios from "axios";

export const getProductOwners = async (authorization) => {
  try {
    const response = await axios.get(
      `https://flyora-backend.onrender.com/api/v1/owner/products`,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
