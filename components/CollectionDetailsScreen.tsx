import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchCollectionById, addLineItemsToCheckout } from '../shopifyApi/shopifyService'; // Adjust path to your service file

const CollectionDetailsScreen = ({ route, navigation }:any) => {
  const { collectionId } = route.params;
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);

  // Fetch collection details
  useEffect(() => {
    const loadCollection = async () => {
      try {
        setLoading(true);
        const fetchedCollection = await fetchCollectionById(collectionId);
        setCollection(fetchedCollection);
      } catch (err:any) {
        setError(err.message || 'Error fetching collection details.');
      } finally {
        setLoading(false);
      }
    };
    loadCollection();
  }, [collectionId]);

  // Add product to cart
  const handleAddToCart = async (product:any) => {
    try {
      if (product.variants.length === 0) {
        console.error('No variants available for this product.');
        return;
      }

      const variantId = product.variants[0].id;
      const lineItems = [
        {
          variantId,
          quantity: 1, // Adjust quantity as needed
        },
      ];

      const checkout = await addLineItemsToCheckout(lineItems);
      console.log('Product added to cart:', checkout);
      navigation.navigate('Cart', { cartId: checkout.id });
    } catch (err) {
      console.error('Error adding product to cart:', err);
    }
  };

  // Handle loading and error states
  if (loading) return <ActivityIndicator size="large" color="#000" />;
  if (error) return <Text>Error: {error}</Text>;
  console.log("collection details", collection.products[0].variants[0].price.amount)

  return (
    <FlatList
      data={collection.products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={{ height: 500, width: '50%', padding: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetailsScreen', { productId: item.id })}
          >
            <Image
              source={{ uri: item.images[0]?.src }}
              style={{ width: '100%', height: 200, objectFit:"contain" }}
            />
            <View style={{ height: 100 }}>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 18,
                  fontWeight: '500',
                  textAlign: 'left',
                }}
              >
                {item.title}
              </Text>
            </View>
            <Text
              style={{ paddingTop: 10 }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.description}
            </Text>
            <Text
              style={{
                fontSize: 18,
                paddingTop: 10,
                paddingBottom: 20,
                fontWeight: '500',
              }}
            >
              {'\u20B9'} {item?.variants[0].price.amount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={{
              backgroundColor: 'black',
              padding: 10,
              marginTop: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default CollectionDetailsScreen;
