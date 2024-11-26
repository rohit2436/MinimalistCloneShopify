// ProductDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Button, Modal } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

import Footer from './Footer';
import Customer from './Customer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import client from "../shopifyApi/shopifyClient"
import AddToCartButton from './AddToCartButton';
import { Rating, AirbnbRating } from 'react-native-ratings';
import * as Progress from 'react-native-progress';

// image carousel
const { width: screenWidth } = Dimensions.get('window');
//-----------

const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      title
      description
      images(first: 5) {
        edges {
          node {
            src
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
          id
          title
            price {
              amount
            }
          }
        }
      }
    }
  }
`;


// const addToCart = async (product) => {
//   try {
//     // Get the existing cart from AsyncStorage
//     const cart = await AsyncStorage.getItem('cart');

//     const parsedCart = cart ? JSON.parse(cart) : [];

//     // Add the new product to the cart
//     parsedCart.push(product);

//     // Save the updated cart back to AsyncStorage
//     await AsyncStorage.setItem('cart', JSON.stringify(parsedCart));

//     console.log('Product added to cart:', product);
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//   }
// };

const ProductDetailsScreen = ({ navigation,route }) => {
  const { productId } = route.params;
  console.log(productId);

  // const productId = "gid://shopify/Product/8642471329941"

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id: productId },
  });

  const [number, setNumber] = useState(1);
  const [review, setReview] = useState(4);
  const [reviewSign, setReviewSign] = useState(false);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const product = data?.product;
  
const price = parseFloat(product.variants.edges[0].node.price.amount);
let finalPrice = price*number;

console.log(product?.variants?.edges[0]?.node?.id)
 const productVariants= product?.variants?.edges[0]?.node?.id;

  return (

<View>
  
    <ScrollView style={{ padding: 10 }}>

      {/*            //image carousel                  */}
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={false}
        //   autoplayTimeout={4}
        loop
      >
        {product.images.edges.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image.node.src }} style={styles.image} />
            {/* <Text style={styles.text}>{slide.title}</Text> */}
          </View>
        ))}
      </Swiper>

      {/* ------------- */}



      {/* <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{product.title}</Text>
      <Text style={{ fontSize: 16, color: '#888', marginVertical: 10 }}>{product.description}</Text>
      <Text style={{ fontSize: 20 }}>Price: {'\u20B9'} {product.variants.edges[0].node.price.amount}</Text>
      
      {product.images.edges.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image.node.src }}
          style={{ width: '100%', height: 300, marginVertical: 10 }}
        />
      ))} */}

      <View style={styles.main}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{'\u20B9'} {product.variants.edges[0].node.price.amount}</Text>
          
        </View>

        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <View style={{ borderWidth: .5, height: 35, width: "50%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TouchableOpacity onPress={() => number > 1 ? setNumber(number - 1) : null}>
              <View style={{ flex: 1, backgroundColor: "rgb(229, 228, 226)", justifyContent: "center", alignItems: "center", width: 50 }}><Icon name="minus" size={20} color="black" /></View>
            </TouchableOpacity>

            <Text style={{ fontSize: 20, flex: 1, textAlign: "center" }}>{number}</Text>
            <TouchableOpacity onPress={() => setNumber(number + 1)}>
              <View style={{ flex: 1, backgroundColor: "rgb(229, 228, 226)", justifyContent: "center", alignItems: "center", width: 50 }}><Icon name="plus" size={20} color="black" /></View>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.bottomBorder}/>

      </View>

      {/* <Text style={styles.title}>You May Also Like</Text> */}
      <Customer/>




        

      <View style={{ padding: 10, alignItems: "center", justifyContent: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: 500, textAlign: "center", marginBottom: 20 }}>Customer Review</Text>
            <View style={{ flexDirection: "row", }}>
              <Text style={{ fontSize: 60, fontWeight: 700, marginRight: 10 }}>{review}</Text>

              <View style={{ justifyContent: "flex-start", alignItems: "flex-start", }}>
                <View style={{ marginTop: 10 }}><AirbnbRating
                  size={18}
                  showRating={false}
                  selectedColor='black'
                  defaultRating={review}
                  isDisabled={true}
                />
                  <Text style={{ fontSize: 15, textAlign: "left", marginTop: 5 }}>Based on 24 Review</Text></View>

              </View>

            </View>


            {/* //making 5star and bar */}
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 500, textAlignVertical: "center" }}>5</Text>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={1}
                isDisabled={true}
                count={1

                }
              />
              <View style={{ alignItems: "center", justifyContent: "center", marginLeft: "20" }}><Progress.Bar progress={0.3} width={170} color='black' /></View>
              <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>17</Text>
            </View>


            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 500, textAlignVertical: "center" }}>4</Text>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={1}
                isDisabled={true}
                count={1

                }
              />
              <View style={{ alignItems: "center", justifyContent: "center", marginLeft: "20" }}><Progress.Bar progress={0.1} width={170} color='black' /></View>
              <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>01</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 500, textAlignVertical: "center" }}>3</Text>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={1}
                isDisabled={true}
                count={1

                }
              />
              <View style={{ alignItems: "center", justifyContent: "center", marginLeft: "20" }}><Progress.Bar progress={0} width={170} color='black' /></View>
              <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>00</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 500, textAlignVertical: "center" }}>2</Text>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={1}
                isDisabled={true}
                count={1

                }
              />
              <View style={{ alignItems: "center", justifyContent: "center", marginLeft: "20" }}><Progress.Bar progress={0.1} width={170} color='black' /></View>
              <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>01</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: 500, textAlignVertical: "center" }}>1</Text>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={1}
                isDisabled={true}
                count={1

                }
              />
              <View style={{ alignItems: "center", justifyContent: "center", marginLeft: "20" }}><Progress.Bar progress={0.2} width={170} color='black' /></View>
              <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>01</Text>
            </View>

            <View style={{ margin: 25, width: 150, }}>
              <Button title='Write A Review' color={"black"} onPress={()=>setReviewSign(true)}/>
            </View>


            {
              <Modal animationType='slide' transparent={true} visible={reviewSign} onRequestClose={() => {
                setModalVisible(false); // Handle back button press on Android
              }}>
                <View style={{ justifyContent: "center", alignItems: "center", top: "30%" }}>
                  <View style={{ justifyContent: "center", alignItems: "center", height: 200, width: 300, padding: 20, margin: 20, backgroundColor: "white", borderRadius: 20, borderColor: "black", borderWidth: 1, elevation: 10 }}>
                    <Text style={{ padding: 20 }}>Please Sign in to write a Review</Text>
                    <View><Button color={"black"} title='      Close      ' onPress={() => setReviewSign(false)} />
                    </View>
                  </View>
                </View>
      
              </Modal>
            }
</View>















      <Footer/>
    </ScrollView>

    <View style={styles.topAddToCart}>
      <Text style={styles.priceTextBottom}>{'\u20B9'}{finalPrice.toFixed(2)}</Text>
      <View style={styles.button}>

      <AddToCartButton
      product={{
        id: productId,
        // id: productVariants,
        title: product.title,
        images: product.images,
        variants: product.variants,
      }}
      quantity={number}
      navigation={navigation}
    />
        {/* <Button title='Add to cart' color={"black"} onPress={()=>{addToCart({
              id: productId,
              title: product.title,
              image: product.images.edges[0].node.src,
              price: product.variants.edges[0].node.price.amount,
              quantity:number
            }),navigation.navigate("Cart",{productId})}}/> */}
       
        </View>
    </View>

    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    height: 350,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  image: {
    // width: screenWidth * 0.8,
    width: screenWidth,
    height: 350,
    borderRadius: 8,
    resizeMode: "contain",

  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    marginTop: 20,
    marginBottom: 20
  },
  main: {
    padding: 15
  },
  description: {
    fontSize: 15,
    fontWeight: 400
  },
  price: {
    fontWeight: 500,
    fontSize: 25
  },
  priceContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  bottomBorder:{
    height:40,
    width:"auto",
    borderBottomWidth:1,
    borderColor:"grey"

  },
  topAddToCart:{
    height:100,
    width:"auto",
    backgroundColor:"white",
    justifyContent:"space-around",
    padding:20,
    flexDirection:"row",
    zIndex:1,
    alignItems:"center",
    position:"absolute",
    bottom:0,
    left:0,
    right:0,


  },
  button:{
    width:200
  },
  priceTextBottom:{
    fontSize:25,
    fontWeight:500
  }
});

export default ProductDetailsScreen;
