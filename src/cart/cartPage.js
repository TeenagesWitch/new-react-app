import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Image, Input, Text } from '@chakra-ui/react';
import { fetchCartItems, updateItemQuantity, selectCart } from './cartSlice'; // Importing the actions from cartSlice

function CartPage() {
  
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadCartItems() {
      try {
        dispatch(fetchCartItems()); // Using the action from cartSlice
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    }
    loadCartItems();
  }, [dispatch]);

  const handleQuantityChange = (id, newQuantity) => {
    // Update the quantity in the Redux store and backend
    dispatch(updateItemQuantity({ id, newQuantity: parseInt(newQuantity) })); // Using the action from cartSlice
  };

  return (
    <Box p="4">
      <Heading mb="4">Your Cart</Heading>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map(item => (
              <Tr key={item.id}>
                <Td><Image src={item.image} alt={item.name} boxSize="50px" /></Td>
                <Td>{item.name}</Td>
                <Td>${item.price}</Td>
                <Td><Input type="number" value={item.quantity} onChange={e => handleQuantityChange(item.id, e.target.value)} /></Td>
                <Td>${item.price * item.quantity}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default CartPage;