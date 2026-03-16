import axios from "axios";

export const generateDescriptionAI = async (token, productData) => {
  try {
    const response = await axios.post(
      "https://flyora-backend-v2.onrender.com/api/v2/generate-description",
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Generate description error:", error);
    throw error;
  }
};