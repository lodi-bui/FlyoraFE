import axios from 'axios';

export const LoginAPI = async (username, password) => {
  try {
    const response = await axios.post(
      'https://flyora-backend.onrender.com/api/auth/login',
      {
        username: username,
        password: password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data; // Trả về dữ liệu nếu thành công
  } catch (error) {
    // Xử lý lỗi rõ ràng
    throw error.response?.data || {
      message: 'Có lỗi xảy ra khi đăng nhập',
    };
  }
};
