import axios from "axios";

const API_URL = "https://flyora-backend.onrender.com/api/v1/promotions";
//  
/**
 * Lấy danh sách khuyến mãi
 * @returns {Promise<Array>} Danh sách khuyến mãi
 */
export const getPromotions = async (customerId) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        customerId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khuyến mãi:", error);
    throw error;
  }
};
