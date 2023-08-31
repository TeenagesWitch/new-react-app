import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Image, Text } from '@chakra-ui/react';
import { fetchCartItems, updateItemQuantity, removeCartItem, selectCart } from './cartSlice'; // Importing the actions from cartSlice

function CartPage() {

  // Step 1: State Maintenance
  const [itemsToBeRemoved, setItemsToBeRemoved] = React.useState([]);

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
    if (newQuantity < 0) {
      return; // Don't allow negative quantities
    }
    
    if (newQuantity === 0) {
      setItemsToBeRemoved(prevState => [...prevState, id]);
    } else if (itemsToBeRemoved.includes(id)) {
      // If the item's quantity is increased from 0, remove it from itemsToBeRemoved
      setItemsToBeRemoved(prevState => prevState.filter(itemId => itemId !== id));
    }
    
    dispatch(updateItemQuantity({ id, quantity: newQuantity }));
  };
  
  // Step 2: Event Listener
  useEffect(() => {
    const handleUnload = () => {
      // Step 3: Check & Dispatch
      itemsToBeRemoved.forEach(itemId => {
        dispatch(removeCartItem(itemId));
      });
    };
    
    window.addEventListener("beforeunload", handleUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [itemsToBeRemoved, dispatch]);

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
                <Td>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </Td>
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