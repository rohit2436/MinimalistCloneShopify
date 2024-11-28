import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import { GET_PRODUCTS } from '../shopifyApi/queries'
import {useQuery} from '@apollo/client';
import {AirbnbRating} from 'react-native-ratings';
import AddToCartButton from './AddToCartButton';
import {addLineItemsToCheckout, fetchAllProducts} from '../shopifyApi/shopifyService';

const ProductList = ({navigation}: any) => {
  const [product, setProduct] = useState();

  const getAllProducts = async () => {
    try {
      const allProduct = await fetchAllProducts();
      setProduct(allProduct);
      console.log('All products:', allProduct);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // const { loading, error, data } = useQuery(GET_PRODUCTS);
  // console.log("data",data);

  // if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  // if (error) return <Text>Error: {error.message}</Text>;
  // const [like, setLike] = useState(false);

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


  return (
    <ScrollView>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <FlatList
          data={product}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => (
            <View style={{height: 500, width: '50%', padding: 10}}>
              <TouchableOpacity onPress={() =>
                  navigation.navigate('ProductDetailsScreen', {
                    productId: item.id,
                  })
                }>
              <Image
                style={{width: '100%', height: 200}}
                source={{
                  uri: item.images[0]?.src || 'https://via.placeholder.com/150',
                }} // Accessing images
              />
              <View style={{height: 100}}>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 18,
                    fontWeight: 500,
                    textAlign: 'left',
                  }}>
                  {item.title}
                </Text>
              </View>
              <Text
                style={{paddingTop: 10}}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.description}
              </Text>
              <View style={{alignItems: 'flex-start', paddingTop: 15}}>
                {/* <AirbnbRating
          size={18}
          showRating={false}
          selectedColor='black'
          defaultRating={3}
          isDisabled={true}
        /> */}
              </View>
              <Text
                style={{
                  fontSize: 18,
                  paddingTop: 10,
                  paddingBottom: 20,
                  fontWeight: '500',
                }}>
                {'\u20B9'} 275
              </Text>
              </TouchableOpacity>
              {/* <Button
                color={'black'}
                title="See Details"
                onPress={() =>
                  navigation.navigate('ProductDetailsScreen', {
                    productId: item.id,
                  })
                }
              /> */}
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

              {/* <AddToCartButton
            product={item.node}
            quantity={1}
            navigation={navigation}
          /> */}

              <View style={{position: 'absolute', bottom: 300, right: 15}}>
                {/* {like ?
                  <TouchableOpacity onPress={() => setLike(!like)}>


                    <Image style={{ height: 30, width: 30 }} source={require("./assets/heartOutline.png")} />




                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => setLike(!like)}>


                    <Image style={{ height: 30, width: 30 }} source={require("./assets/heartFill.webp")} />




                  </TouchableOpacity>


                } */}
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ProductList;

const styles = StyleSheet.create({});
