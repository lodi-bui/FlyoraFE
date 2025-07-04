import axios from "axios";

const API_URL = "https://flyora-backend.onrender.com/api/v1/reviews/submit";

export const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(API_URL, {
      customerId: reviewData.customerId,
      productId: reviewData.productId,
      rating: reviewData.rating,
      comment: reviewData.comment
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const getReviewsByProductId = async (productId) => {
  try {
    const response = await axios.get(`https://flyora-backend.onrender.com/api/v1/reviews/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}
