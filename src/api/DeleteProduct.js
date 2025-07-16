import axios from "axios";

export const deleteProduct = async (authorization, id) => {
  try {
    const response = await axios.delete(
      `https://flyora-backend.onrender.com/api/v1/owner/products/${id}`,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};