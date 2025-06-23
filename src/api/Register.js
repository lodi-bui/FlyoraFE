import axios from 'axios';

export const RegisterAPI = async (username, email, password, phone) => {
  const res = await axios.post('https://flyora-backend.onrender.com/api/auth/register', {
    username,
    password,
    email,
    phone,
    roleId: 0
  });

  return res.data;
};
