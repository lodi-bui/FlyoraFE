import axios from 'axios';

export const LoginAPI = async (username, password) => {
  const res = await axios.post('https://flyora-backend.onrender.com/api/auth/login', {
    username,
    password
  });

  return res.data;
};
