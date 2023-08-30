import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk action to fetch cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get('http://localhost:3001/cart');
  return response.data;
});

const initialState = {
  cart: [],
  status: 'idle', // to handle loading, success, and error states
  error: null
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setCart } = cartSlice.actions;

export const selectCart = state => state.cart.cart;

export default cartSlice.reducer;