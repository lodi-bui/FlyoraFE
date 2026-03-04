import axios from 'axios';

export const LoginAPI = async (username, password) => {

  console.log(username, password);
  const res = await axios.post('https://flyora-backend-v2.onrender.com/api/auth/login', {
    username,
    password
  });

  return res;
};