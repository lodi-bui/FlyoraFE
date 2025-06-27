import axios from "axios";

// API lấy lịch sử đơn hàng với body là customerId
export const getOrderHistory = async (customerId) => {
  try {
    const response = await axios.get(
      `https://flyora-backend.onrender.com/api/v1/my-orders?customerId=${customerId}`,
    );
    return response.data;
  } catch (error) {
    console.error("API error:", error.message);
    throw error;
  }
}