import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCartItems as fetchItemsService, updateCartItem as updateItemService, removeCartItem as removeItemService } from './cartService'; // Importing the service functions

// Async thunk action to fetch cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCart', async () => {
  return await fetchItemsService();
});

// Async thunk action to remove a cart item
export const removeCartItem = createAsyncThunk('cart/removeItem', async (id) => {
  return await removeItemService(id);
});

// Async thunk action to update cart item quantity
export const updateItemQuantity = createAsyncThunk('cart/updateItem', async ({ id, quantity }) => {
  return await updateItemService(id, quantity);
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
      })
      // Handle updateItemQuantity cases here
      .addCase(updateItemQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedItem = action.payload;
        const existingItem = state.cart.find(item => item.id === updatedItem.id);
        if (existingItem) {
          existingItem.quantity = updatedItem.quantity;
        }
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle removeCartItem cases here
      .addCase(removeCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const itemId = action.payload;
        state.cart = state.cart.filter(item => item.id !== itemId);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setCart } = cartSlice.actions;

export const selectCart = state => state.cart.cart;

export default cartSlice.reducer;