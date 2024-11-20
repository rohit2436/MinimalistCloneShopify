import { Button, Modal, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Address from './Address';
import { gql, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import client from "../shopifyApi/shopifyClient"



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
            price {
              amount
            }
          }
        }
      }
    }
  }
`;



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
    console.log("checkout")
    console.log(checkoutId)
    return await client.checkout.fetch(checkoutId);

  }
  return createCheckout();
};






const Cart = () => {
  // const [cart, setCart] = useState([]);
  // const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  //--------form checkout shopify-------
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {

    const fetchCheckout = async () => {
      const checkoutData = await getCheckout();
      setCheckout(checkoutData);
    };

    fetchCheckout();
  }, []);

  if (!checkout) {
    return <Text>Loading checkout..</Text>;
  }
  //------------------------------


  // useEffect(() => {
  //     const loadCart = async () => {
  //         try {
  //             const cartData = await AsyncStorage.getItem('cart');

  //             if (cartData) {
  //                 setCart(JSON.parse(cartData));
  //             }
  //         } catch (error) {
  //             console.error('Error loading cart:', error);
  //         }
  //     };

  //     loadCart();
  // }, [cart]);


  // const saveCartToStorage = async (cart) => {
  //     try {
  //         await AsyncStorage.setItem('cart', JSON.stringify(cart));
  //     } catch (error) {
  //         console.error('Error saving cart to AsyncStorage:', error);
  //     }
  // };


  // Remove specific item from the cart
  // const removeItem = async (title) => {
  //     try {
  //         const updatedCart = cart.filter((item) => item.title !== title);
  //         setCart(updatedCart); // Update state
  //         await saveCartToStorage(updatedCart); // Update AsyncStorage
  //         console.log("Item removed from cart");
  //     } catch (error) {
  //         console.error("Error removing item:", error);
  //     }
  // };



  // const updateQuantity = async (title, increment) => {
  //     try {
  //         const updatedCart = cart.map((item) => {
  //             if (item.title === title) {
  //                 const updatedQuantity = increment
  //                     ? item.quantity + 1
  //                     : Math.max(1, item.quantity - 1); // Ensure quantity doesn't go below 1
  //                 return { ...item, quantity: updatedQuantity };
  //             }
  //             return item;
  //         });
  //         setCart(updatedCart);
  //         await saveCartToStorage(updatedCart);
  //     } catch (error) {
  //         console.error("Error updating quantity:", error);
  //     }
  // };


  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.variant.price.amount * item.quantity, 0);
  };


  const [number, setNumber] = useState(0);



  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    pin: '',
    city: '',
    State: '',
    Address1: '',
    Address2: '',
  });
  const [savedData, setSavedData] = useState(null); // State to display saved data
  const STORAGE_KEY = '@user_form_data';

  // Function to update form data
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to save data to AsyncStorage
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

      loadData(); // Refresh the displayed data after saving
    } catch (error) {
      Alert.alert('Error!', 'Failed to save the input.');
    }
  };

  // Function to load data from AsyncStorage
  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedData) {
        setSavedData(JSON.parse(savedData)); // Parse and set saved data

      } else {
        setSavedData(null); // Clear if no data is found
      }
    } catch (error) {
      Alert.alert('Error!', 'Failed to load the input.');
    }
  };

  // Function to clear data from AsyncStorage
  const clearData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        pin: '',
        city: '',
        State: '',
        Address1: '',
        Address2: '',
      });

      setSavedData(null); // Clear displayed data

    } catch (error) {
      Alert.alert('Error!', 'Failed to clear the input.');
    }
  };

  // Load data when the component mounts
  useEffect(() => {
    loadData();
  }, []);


  return (

    <View>



      <ScrollView>

        <View style={{ padding: 15 }}>
          <View>
            {savedData ? (
              <>
                <Text style={styles.savedText}>
                  <Text style={styles.savedLabel}>First Name:</Text> {savedData.firstName}
                </Text>
                <Text style={styles.savedText}>
                  <Text style={styles.savedLabel}>Last Name:</Text> {savedData.lastName}
                </Text>
                <Text style={styles.savedText}>
                  <Text style={styles.savedLabel}>Phone:</Text> {savedData.phone}
                </Text>
                <Text style={styles.savedText}>
                  <Text style={styles.savedLabel}>Country:</Text> {savedData.country}
                </Text>
                <Text style={styles.savedText}>
                  <Text style={styles.savedLabel}>Pin Code:</Text> {savedData.pin}
                </Text>
                <Text style={styles.savedText}>
                  <Text style={styles.savedLabel}>City :</Text> {savedData.city}
                </Text>
                <Text style={styles.savedText}>
                  <Text style={styles.savedLabel}>State:</Text> {savedData.State}
                </Text>
                <Text style={styles.savedText}>
                  <Text style={styles.savedLabel}>Address1:</Text> {savedData.Address1}
                </Text>
                <Text style={styles.savedText}>
                  <Text style={styles.savedLabel}>Address2:</Text> {savedData.Address2}
                </Text>
                <Button title='Clear' color="grey" onPress={() => clearData()} />
              </>
            ) : (
              <Text style={styles.savedText}>No data saved yet.</Text>
            )}

            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <View style={{ borderWidth: 1, height: 50, width: "auto", justifyContent: "center", alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                <Text style={{ flex: 1, textAlign: "center", textAlignVertical: "center", fontSize: 15, fontWeight: 500 }}>Add New Address</Text>
              </View>
            </TouchableOpacity>

            <Text style={{ fontSize: 20, fontWeight: 500, marginBottom: 30, marginTop: 10 }}>Order Summary</Text>


            {/* Cart items */}


            {
              // cart.length > 0 ?
              <FlatList
                data={checkout.lineItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row", marginBottom: 20 }}>
                    <Image source={{
                      uri: item.image,
                      width: 100, height: 150
                    }} />
                    <View style={{ marginLeft: 10, width: 270 }}>
                      <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: 400 }}>{item.title}</Text>

                      <View style={{ marginTop: 10, width: 200 }}>
                        {/* <Text style={{ textDecorationLine: "line-through", color: "grey", fontSize: 15, fontWeight: 400 }}>₹ 2000</Text> */}
                        <Text style={{ fontSize: 15, fontWeight: 500, marginLeft: 10 }}>Price:{'\u20B9'} {item.variant.price.amount} </Text>
                        <Text style={{ fontSize: 15, fontWeight: 500, marginLeft: 10 }}>Total: {'\u20B9'} {item.variant.price.amount * item.quantity}</Text>
                      </View>

                      <View style={{ marginTop: 30, flexDirection: "row" }}>
                        <View style={{ borderWidth: .5, height: 35, width: "50%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                          <TouchableOpacity onPress={() => updateQuantity(item.title, false)}>
                            <View style={{ flex: 1, backgroundColor: "rgb(229, 228, 226)", justifyContent: "center", alignItems: "center", width: 50 }}><Icon name="minus" size={20} color="black" /></View>
                          </TouchableOpacity>

                          <Text style={{ fontSize: 20, flex: 1, textAlign: "center" }}>{item.quantity}</Text>
                          <TouchableOpacity onPress={() => updateQuantity(item.title, true)}>
                            <View style={{ flex: 1, backgroundColor: "rgb(229, 228, 226)", justifyContent: "center", alignItems: "center", width: 50 }}><Icon name="plus" size={20} color="black" /></View>
                          </TouchableOpacity>


                          {/* <TouchableOpacity onPress={() => number > 0 ? parseFloat(item.quantity) - 1 : null}>
                                                            <View style={{ flex: 1, backgroundColor: "rgb(229, 228, 226)", justifyContent: "center", alignItems: "center", width: 50 }}><Icon name="minus" size={20} color="black" /></View>
                                                        </TouchableOpacity>

                                                        <Text style={{ fontSize: 20, flex: 1, textAlign: "center" }}>{item.quantity}</Text>
                                                        <TouchableOpacity onPress={() => setNumber(number + 1)}>
                                                            <View style={{ flex: 1, backgroundColor: "rgb(229, 228, 226)", justifyContent: "center", alignItems: "center", width: 50 }}><Icon name="plus" size={20} color="black" /></View>
                                                        </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity onPress={() => removeItem(item.title)}>
                          <Text style={{ textDecorationLine: "underline", color: "red", marginLeft: 50, fontSize: 20, fontWeight: 400 }}>Remove</Text>

                        </TouchableOpacity>
                      </View>

                    </View>
                  </View>

                )}
              />


              // :

              // <Text style={{ fontSize: 20, fontWeight: 400, textAlign: "center", textAlignVertical: "center" }}>No any items for Checkout</Text>
            }



            {/* Coupon Code */}




            <View style={{ flexDirection: "row", width: 380, justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: 500 }}>Have a coupon code?</Text>
              <TouchableOpacity>
                <View style={{ borderWidth: 1, height: 50, width: "auto", justifyContent: "center", alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                  <Text style={{ flex: 1, textAlign: "center", textAlignVertical: "center", fontSize: 15, fontWeight: 500, marginHorizontal: 20 }}>View Coupons</Text>
                </View>
              </TouchableOpacity>
            </View>


            {/* Payment Details  */}

            <View style={{ height: 250, width: "auto", marginBottom: 100, backgroundColor: "#E5E4E2", padding: 20 }}>

              <Text style={{ fontSize: 17, fontWeight: 500, marginBottom: 20 }}>Payment Details</Text>
              <View style={{ flexDirection: "row", width: 340, marginBottom: 10, justifyContent: "space-between" }}>
                <Text style={styles.greyText}> Subtotal </Text>
                <Text style={styles.greyText}>₹ {calculateTotalPrice().toFixed(2)}</Text>

              </View>

              <View style={{ flexDirection: "row", width: 340, marginBottom: 10, justifyContent: "space-between" }}>
                <Text style={styles.greyText}> Discount </Text>
                <Text style={styles.greyText}>₹ 0</Text>
              </View>

              <View style={{ flexDirection: "row", width: 340, marginBottom: 10, justifyContent: "space-between" }}>
                <Text style={styles.greyText}> Shipping </Text>
                <Text style={styles.greyText}>To be calculated at checkout</Text>
              </View>

              <View style={{ width: "auto", height: 20, borderColor: "grey", borderBottomWidth: 1 }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between", width: 340, marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 500 }}>Grand Total</Text>
                <Text style={{ fontSize: 20, fontWeight: 500 }}>₹ {calculateTotalPrice().toFixed(2)}</Text>
              </View>
            </View>










          </View>
        </View>

        <Modal
          animationType="slide" visible={isVisible} onRequestClose={() => setIsVisible(false)}>
          <ScrollView>
            <View style={styles.main}>
              <View>
                <View style={{ justifyContent: "space-between", flexDirection: "row", width: 360 }}>
                  <Text style={styles.title}>Contact Information</Text>
                  <TouchableOpacity onPress={() => setIsVisible(false)}><Icon name="close" size={30} color={"black"} /></TouchableOpacity>

                </View>

                <Text style={styles.titleName}>First Name</Text>
                <TextInput value={formData.firstName} onChangeText={(value) => handleChange('firstName', value)} placeholder='Enter your first name' style={styles.inputText} />


                <Text style={styles.titleName}>Last Name *</Text>
                <TextInput value={formData.lastName} onChangeText={(value) => handleChange('lastName', value)} placeholder='Enter your last name' style={styles.inputText} />

                <Text style={styles.titleName}>Phone number *</Text>
                <TextInput keyboardType="number-pad" value={formData.phone} onChangeText={(value) => handleChange('phone', value)} placeholder='Enter your phone number' style={styles.inputText} />
              </View>



              <View style={{ marginTop: 30 }}>
                <Text style={styles.title}>Shipping Address</Text>
                <Text style={styles.titleName}>Country *</Text>
                <TextInput value={formData.country} onChangeText={(value) => handleChange('country', value)} placeholder='Enter your first name' style={styles.inputText} />


                <Text style={styles.titleName}>PIN code *</Text>
                <TextInput value={formData.pin} onChangeText={(value) => handleChange('pin', value)} placeholder='Enter your pin code' style={styles.inputText} />

                <Text style={styles.titleName}>City *</Text>
                <TextInput value={formData.city} onChangeText={(value) => handleChange('city', value)} placeholder='Enter PIN code to auto fill city' style={styles.inputText} />

                <Text style={styles.titleName}>State *</Text>
                <TextInput value={formData.State} onChangeText={(value) => handleChange('State', value)} placeholder='Enter PIN code to suto fill province' style={styles.inputText} />


                <Text style={styles.titleName}>Address line 1 *</Text>
                <TextInput value={formData.Address1} onChangeText={(value) => handleChange('Address1', value)} placeholder='Enter address line 1' style={styles.inputText} />

                <Text style={styles.titleName}>Address line 2</Text>
                <TextInput value={formData.Address2} onChangeText={(value) => handleChange('Address2', value)} placeholder='Enter address line 2' style={styles.inputText} />
                <Button title='Save Address' color={"black"} onPress={() => { saveData(); setIsVisible(false) }} />

              </View>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>

      {/* floating checkout view  */}

      <View style={styles.floatCheckout}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 5 }}>₹ {calculateTotalPrice().toFixed(2)}</Text>
          <Text style={{ fontSize: 15, fontWeight: 400 }}>Price inclusive of all taxes</Text>
        </View>
        <View style={{ width: 120 }}><Button title='Checkout' color={"black"} /></View>


      </View>
    </View>


  )
}

export default Cart

const styles = StyleSheet.create({
  greyText: {
    fontSize: 15, fontWeight: 400,
  },
  floatCheckout: {
    height: 80,
    width: 370,
    zIndex: 1,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    Left: 0,
    right: 0,
    elevation: 5,
    shadowColor: "black",
    padding: 20,
    margin: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"


  },
  title: {
    fontSize: 20,
    fontWeight: 400,
    marginBottom: 30,
  },
  main: {
    padding: 20
  },
  titleName: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 10
  },
  inputText: {
    height: 50,
    width: "auto",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    fontSize: 18

  },
  savedText: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  savedLabel: {
    fontWeight: 'bold',
  },
})