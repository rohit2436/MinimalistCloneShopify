import React from 'react';
import { Button } from 'react-native';
import { addLineItemsToCheckout } from "../shopifyApi/shopifyService"; // Reuse utility function


const AddToCartButton = ({ product, quantity, navigation }: any) => {
  const handleAddToCart = async () => {
    try {
      // Use the utility function to add the product to the cart
      await addLineItemsToCheckout([
        {
          variantId: product.id, // Correct variant ID
          quantity,
        },
      ]);


      console.log('Product added to Shopify cart:', product);


      // Navigate to Checkout page
      navigation.navigate('Cart', { key: Date.now() });
    } catch (error) {
      console.error('Error adding to Shopify cart:', error);
    }
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
