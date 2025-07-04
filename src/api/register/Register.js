import axios from 'axios';

export const RegisterAPI = async (username, email, password, phone,name) => {
  try {
    const res = await axios.post('https://flyora-backend.onrender.com/api/auth/register', {
      name,
      password,
      phone,
      username,
      email

    });

    return res.data;
  } catch (error) {
    // In lỗi chi tiết
    if (error.response) {
      console.error('Lỗi từ API:', error.response.data);
      return error.response.data;
    } else {
      console.error('Lỗi không phản hồi:', error.message);
      return { error: error.message };
    }
  }
};
