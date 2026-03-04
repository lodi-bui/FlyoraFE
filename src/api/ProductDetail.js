import axios from "axios";
export const getProductDetail = async (id) => {
  try {
    const response = await axios.get(
      `https://flyora-backend-v2.onrender.com/api/v1/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}