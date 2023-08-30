import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetchCartItems = async () => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
};

// Function to update cart item quantity in the backend
export const updateCartItem = async (id, quantity) => {
  // First, fetch the current cart item
  const currentItemResponse = await axios.get(`${BASE_URL}/cart/${id}`);
  const currentItem = currentItemResponse.data;
  // Update the quantity of the current item
  currentItem.quantity = quantity;

  // Send the entire updated item back to the backend using PUT
  const response = await axios.put(`${BASE_URL}/cart/${id}`, currentItem);
  return response.data;
};

// Function to remove cart item from the backend based on its id
export const removeCartItem = async (id) => {
  const response = await axios.delete(`${BASE_URL}/cart/${id}`);
  return response.data;
};