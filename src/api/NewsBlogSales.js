// sau nay có thể thay thế bằng axios để lấy dữ liệu từ API
import axios from "axios";

const API_URL = "https://flyora-backend.onrender.com/api/v1/news-blog-sales";

const getNewsBlogSalesPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching news/blog sales posts:", error);
    throw error;
  }
};

const createNewsBlogSalesPost = async (postData) => {
  try {
    const response = await axios.post(API_URL, postData);
    return response.data;
  } catch (error) {
    console.error("Error creating news/blog sales post:", error);
    throw error;
  }
};

export { getNewsBlogSalesPosts, createNewsBlogSalesPost };