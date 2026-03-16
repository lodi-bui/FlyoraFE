import axios from "axios";

export const SearchAIAPI = async (name) => {
  try {
    const res = await axios.get(
      "https://flyora-backend-v2.onrender.com/api/v1/products/search",
      {
        params: { name: name }
      }
    );

    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
      return error.response.data;
    } else {
      console.error("Lỗi không phản hồi:", error.message);
      return { error: error.message };
    }
  }
};