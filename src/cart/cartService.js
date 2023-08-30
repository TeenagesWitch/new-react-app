import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchCartItems = async () => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
};