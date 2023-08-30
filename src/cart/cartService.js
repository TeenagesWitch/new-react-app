import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetchCartItems = async () => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
};

// Function to update cart item quantity in the backend
export const updateCartItem = async (id, quantity) => {
  const response = await axios.put(`${BASE_URL}/cart/${id}`, { quantity });
  return response.data;
};