import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './shopifyClient';

// Create a new checkout
export const createCheckout = async () => {
  const checkout = await client.checkout.create();
  await AsyncStorage.setItem('checkoutId', checkout.id);
  console.log("new checkout is created")
  return checkout;
};

// Retrieve an existing checkout
export const getCheckout = async () => {
  const checkoutId = await AsyncStorage.getItem('checkoutId');
  if (checkoutId) {
    return await client.checkout.fetch(checkoutId);
  }
  return createCheckout();
};
