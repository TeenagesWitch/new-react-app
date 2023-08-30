import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { fetchCartItems } from './cartService';
import { setCart, selectCart } from './cartSlice';

function CartPage() {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch cart items and update the Redux store
    async function loadCartItems() {
      try {
        const items = await fetchCartItems();
        console.log("Items from API:", items); // Log the items here
        dispatch(setCart(items));
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    }  
  
    loadCartItems();
  }, [dispatch]);

  return (
    <Box p="4">
      <Heading mb="4">Your Cart</Heading>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <List spacing={3}>
          {cart.map(item => (
            <ListItem key={item.id}>
              <Text>{item.name} - ${item.price}</Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default CartPage;