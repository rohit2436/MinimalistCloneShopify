// CollectionDetailsScreen.js
import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import AddToCartButton from './AddToCartButton';
import client from '../shopifyApi/shopifyClient';
import shopifyClient from '../shopifyApi/shopifyClient';

const GET_COLLECTION_DETAILS = gql`
  query GetCollectionDetails($id: ID!) {
    collection(id: $id) {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
               variants(first: 10) {
            edges {
              node {
                id
               
              }
            }
          }
          }
        }
      }
    }
  }
`;

const CollectionDetailsScreen = ({ route, navigation }:any) => {
  const { collectionId } = route.params;
  // const collectionId = "gid://shopify/Collection/324935876757";
  console.log(collectionId)
  const { loading, error, data } = useQuery(GET_COLLECTION_DETAILS, {
    variables: { id: collectionId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;




   // Function to add product to cart
   const handleAddToCart:any = async (product:any) => {
    try {
      // Get the variant ID for the first variant (you can customize this for more complex cart handling)
      const variantId = product.variants.edges[0].node.id;

      // Create a cart if it doesn't exist
      let cart:any = await shopifyClient.checkout.create();

      // Add the product variant to the cart
      const lineItemsToAdd = [{
        variantId: variantId,
        quantity: 1, // Adjust quantity if needed
      }];
      const checkout:any = await shopifyClient.checkout.addLineItems(cart.id, lineItemsToAdd);

      console.log('Product added to cart:', checkout);
      // You can also navigate to the cart screen after adding the product
      navigation.navigate('CartScreen', { cartId: cart.id });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };


  return (

    <FlatList
      data={data.collection.products.edges}
      keyExtractor={(item) => item.node.id}
      numColumns={2}
      renderItem={({ item }) => (

        <View style={{ height: 500, width: "50%", padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetailsScreen', { productId: item.node.id })}>

            {/* <Text>{item.node.id}</Text>
          <Text>{item.node.variants.edges[0].node.id}</Text> */}
            <Image
              source={{ uri: item.node.images.edges[0].node.src }}
              style={{ width: "100%", height: 200 }}
            />
            <View style={{ height: 100 }}>
              <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: 500, textAlign: "left" }}>{item.node.title}</Text>
            </View>
            <Text
              style={{ paddingTop: 10 }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.node.description}
            </Text>
            <Text
              style={{
                fontSize: 18,
                paddingTop: 10,
                paddingBottom: 20,
                fontWeight: '500',
              }}
            >
              {'\u20B9'} {item.node.priceRange.minVariantPrice.amount}
            </Text>





          </TouchableOpacity>
          {/* <Button color={"black"} title='Add to Cart'
            onPress={() => navigation.navigate('ProductDetailsScreen', { productId: item.node.id })}

          /> */}


          
<AddToCartButton
            product={item.node}
            quantity={1}
            navigation={navigation}
          />


        </View>


      )}
    />

  );

};

export default CollectionDetailsScreen;
