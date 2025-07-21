import axios from "axios";

export const getDashboardData = async (authorization) => {
  try {
    const response = await axios.get(
      `https://flyora-backend.onrender.com/api/v1/owner/dashboard/products/top-sales`,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    throw error;
  }
};
