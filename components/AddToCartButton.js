import React from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from "../shopifyApi/shopifyClient"





 // Create a new checkout
 const createCheckout = async () => {
  const checkout = await client.checkout.create();
  await AsyncStorage.setItem('checkoutId', checkout.id);
  return checkout;
};

// Retrieve an existing checkout
 const getCheckout = async () => {
  const checkoutId = await AsyncStorage.getItem('checkoutId');
  if (checkoutId) {
    return await client.checkout.fetch(checkoutId);
  }
  return createCheckout();
};

const AddToCartButton = ({ product, quantity, navigation }) => {


 
  
 const addToCart = async (product) => {

  try {
    const checkout = await getCheckout();

    // Prepare line item data
    const lineItemsToAdd = [
      {
        variantId: product.id, // Correct variant ID
        quantity,
      },
    ];

    // Add line items to checkout
    const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
    console.log("Line items added successfully:", updatedCheckout.lineItems);

    console.log(checkout.id)
    // Optionally save updated cart details to AsyncStorage
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCheckout.lineItems));


    console.log('Product added to Shopify cart:', product);
  } catch (error) {
    console.error('Error adding to Shopify cart:', error);
  }
};
  const handleAddToCart = () => {
    // Prepare the product details
    const productToAdd = {
      // id: product.id,
      id: product?.variants?.edges[0]?.node?.id,
      title: product.title,
      image: product.images.edges[0].node.src,
      price: product.variants.edges[0].node.price.amount,
      quantity,
    };

    // Call addToCart and navigate to Cart
    addToCart(productToAdd);
    // navigation.navigate('Cart', { productId: product.id });
    navigation.navigate('CheckoutPage');
  };




  return (
    <Button
      title="Add to cart"
      color="black"
      onPress={handleAddToCart}
    />
  );
};

export default AddToCartButton;
