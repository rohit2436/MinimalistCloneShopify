import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
import client from '../shopifyApi/shopifyClient';

import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import {useCart} from './CartContext';

// Create a new checkout
const createCheckout = async () => {
  const checkout = await client.checkout.create();
  await AsyncStorage.setItem('checkoutId', checkout.id);
  return checkout;
};

// Retrieve an existing checkout
const getCheckout = async () => {
  console.log('get items');
  const checkoutId: any = await AsyncStorage.getItem('checkoutId');
  if (checkoutId) {
    return await client.checkout.fetch(checkoutId);
  }
  console.log('getCheckout', checkoutId);

  return createCheckout();
};

const CheckoutPage = ({navigation}: any) => {
  const [checkout, setCheckout] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<any>(0); // State for total price
  const [address, setAddress] = useState<any>({}); // For managing address state
  const [isEditing, setIsEditing] = useState<any>(false); // Track if editing address
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(true); // Loading state
  const [contactModal, setContactModal] = useState<any>(false);
  const [addressButton, setaddressButton] = useState<string>("Change");

  const {cartCount, updateCartCount}: any = useCart();
  const hasCartItems = checkout?.lineItems?.length > 0;
  console.log('Has Cart Items:', hasCartItems);





  const [errors, setErrors] = useState<any>({});
const [isAddressValid, setIsAddressValid] = useState<any>(false);

// Address validation function
const validateAddress = () => {
    const newErrors:any = {};

    if (!address.firstName) newErrors.firstName = 'First name is required.';
    if (!address.lastName) newErrors.lastName = 'Last name is required.';
    if (!address.phone || !/^[0-9]+$/.test(address.phone)) newErrors.phone = 'Valid phone number is required.';
    if (!address.address1) newErrors.address1 = 'Address Line 1 is required.';
    if (!address.city) newErrors.city = 'City is required.';
    if (!address.province) newErrors.province = 'State/Province is required.';
    if (!address.country) newErrors.country = 'Country is required.';
    if (!address.zip || !/^\d{5,6}$/.test(address.zip)) newErrors.zip = 'ZIP code must be 5 or 6 digits.';

    setErrors(newErrors);
    setIsAddressValid(Object.keys(newErrors).length === 0);
};


  useEffect(() => {
    const fetchCheckout = async () => {
      console.log('checkout page me aa gye');

      // Update state to reflect the new quantity
      //  const updatedCheckout = await client.checkout.fetch(checkoutId);
      //  setCheckout(updatedCheckout);
      //  calculateTotalPrice(updatedCheckout.lineItems); // Recalculate total price

      setIsLoading(true); // Set loading to true when starting fetch
      const checkoutData = await getCheckout();
      setCheckout(checkoutData);
      calculateTotalPrice(checkoutData.lineItems); // Calculate total price
      console.log('checkout data:', checkout);

      const savedAddress = await AsyncStorage.getItem('address');
      if (savedAddress) {
        setAddress(JSON.parse(savedAddress));
      }
      setIsLoading(false); // Set loading to false once data is loaded
    };

    fetchCheckout();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCheckout = async () => {
        const checkoutData = await getCheckout();
        console.log('Updated checkout:', checkoutData);
        setCheckout(checkoutData);
        calculateTotalPrice(checkoutData.lineItems);
        updateCartCount(checkoutData.lineItems.length); // Update the cart badge count
      };
      fetchCheckout();
      // console.log('Updated checkout:');
    }, [navigation]),
  );

  const saveAddress = async () => {
    validateAddress();

    if (isAddressValid) {
        await AsyncStorage.setItem('address', JSON.stringify(address));
        setIsEditing(false);
        setContactModal(false);
    } else {
        console.log('Address has validation errors:', errors);
    }
};


  const handleCheckout = async () => {
    if (
      !address.address1 ||
      !address.city ||
      !address.zip ||
      !address.country ||
      !address.firstName
    ) {
      console.log('address is not completed');
      setaddressButton("Add");
      setModalVisible(true);

      return;
    }

    const checkoutId: any = await AsyncStorage.getItem('checkoutId');

    try {
      const updatedCheckout: any = await client.checkout.updateShippingAddress(
        checkoutId,
        {
          address1: address.address1,
          address2: address.address2 || null,
          city: address.city,
          province: address.province || null,
          country: address.country,
          firstName: address.firstName,
          lastName: address.lastName,
          zip: address.zip,
          phone: address.phone ||null,
        },
      );
      //  console.log("updated checkout", updatedCheckout.shippingAddress)
      navigation.navigate('WebViewScreen', {url: updatedCheckout.webUrl});
    } catch (error) {
      console.error(error);
    }
  };

  // Function to calculate total price
  const calculateTotalPrice = (lineItems: any) => {
    const total: any = lineItems.reduce((sum: any, item: any): any => {
      return sum + item.quantity * parseFloat(item.variant.price.amount);
    }, 0);
    setTotalPrice(total);
    updateCartCount(lineItems.length);
  };

  // Update item quantity
  const updateQuantity: any = async (lineItemId: any, isIncrease: any) => {
    const checkoutId: any = await AsyncStorage.getItem('checkoutId');
    const lineItem: any = checkout.lineItems.find(
      (item: {id: any}) => item.id === lineItemId,
    );
    const newQuantity = isIncrease
      ? lineItem.quantity + 1
      : lineItem.quantity - 1;

    if (newQuantity > 0) {
      await client.checkout.updateLineItems(checkoutId, [
        {
          id: lineItemId,
          quantity: newQuantity,
        },
      ]);
      // Update state to reflect the new quantity
      const updatedCheckout = await client.checkout.fetch(checkoutId);
      setCheckout(updatedCheckout);
      calculateTotalPrice(updatedCheckout.lineItems); // Recalculate total price
    }
  };

  // Remove item from the checkout
  const removeItem: any = async (lineItemId: any) => {
    const checkoutId: any = await AsyncStorage.getItem('checkoutId');
    await client.checkout.updateLineItems(checkoutId, [
      {
        id: lineItemId,
        quantity: 0, // Setting quantity to 0 will remove the item
      },
    ]);
    // Update state after removing the item
    const updatedCheckout: any = await client.checkout.fetch(checkoutId);
    setCheckout(updatedCheckout);
    calculateTotalPrice(updatedCheckout.lineItems); // Recalculate total price
  };

  if (!checkout) {
    return <Text>Loading checkout...</Text>;
  }

  // Loading state handling
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView style={{padding: 15, backgroundColor: 'white'}}>
        <View style={styles.addressSection}>
          {isEditing ? (
            <Modal
            animationType="slide"
            transparent={false}
            visible={contactModal}
            onRequestClose={() => setContactModal(false)}
          >
            <ScrollView style={{ padding: 15, backgroundColor: 'white' }}>
              <View>
                <Text style={styles.addressLabel}>Contact Information</Text>
                {['firstName', 'lastName', 'phone', 'address1', 'city', 'province', 'country', 'zip'].map((field) => (
                  <View key={field}>
                    <Text style={styles.label}>{field}</Text>
                    <TextInput
                      placeholder={field}
                      value={address[field] || ''}
                      onChangeText={(text) => setAddress({ ...address, [field]: text })}
                      style={styles.input}
                    />
                    {errors[field] && <Text style={styles.error}>{errors[field]}</Text>}
                  </View>
                ))}
                <Button title="Save Address" color="black" onPress={saveAddress} />
              </View>
            </ScrollView>
          </Modal>
          
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: "100%",
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: 600,
                    }}>
                    Deliver to: {address.firstName} {address.lastName} ,{' '}
                    {address.zip}
                  </Text>
                  <Text>
                    {address.address1}, {address.city}, {address.province}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIsEditing(true), setContactModal(true);
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      height: 40,
                      width: 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: 600,
                      }}>
                      {addressButton}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            // <View>
            //   <Text style={styles.addressLabel}>Shipping Address</Text>
            //   <Text>First Name: {address.firstName}</Text>
            //   <Text>Last Name : {address.lastName}</Text>
            //   <Text>Address1   : {address.address1 || 'No address set'}</Text>
            //   <Text>Address2   : {address.address2}</Text>
            //   <Text>City             : {address.city}</Text>
            //   <Text>Province    : {address.province}</Text>
            //   <Text>Country      : {address.country}</Text>
            //   <Text>Zip              : {address.zip}</Text>
            //   <Text>Phone        : {address.phone}</Text>
            //   <Button title="Edit Address" color={"grey"} onPress={() => setIsEditing(true)} />
            // </View>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false); // Handle back button press on Android
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              top: '30%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
                width: 300,
                padding: 20,
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                borderColor: 'black',
                borderWidth: 1,
                elevation: 10,
              }}>
              <Text style={{padding: 20}}>Please fill address</Text>
              <View>
                <Button
                  color={'black'}
                  title="      Close      "
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>

        <FlatList
          data={checkout.lineItems}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <Image style={{objectFit:"contain", width: "30%", height: 150}}
                source={{uri: item.variant.image.src}}
              />
              <View style={{marginLeft: 10, width: "60%"}}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{fontSize: 18, fontWeight: 400}}>
                  {item.title}
                </Text>

                <View style={{marginTop: 10, width: "100%"}}>
                  <Text style={{fontSize: 15, fontWeight: 500, marginLeft: 10}}>
                    Price: {'\u20B9'}{' '}
                    {parseFloat(item.variant.price.amount).toFixed(2)}
                  </Text>
                  <Text style={{fontSize: 15, fontWeight: 500, marginLeft: 10}}>
                    Total: {'\u20B9'}{' '}
                    {(
                      parseFloat(item.variant.price.amount) * item.quantity
                    ).toFixed(2)}
                  </Text>
                </View>

                <View style={{marginTop: 30, flexDirection: 'row'}}>
                  <View
                    style={{
                      borderWidth: 0.5,
                      height: 35,
                      width: '50%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, false)}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: 'rgb(229, 228, 226)',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: "100%",
                          paddingHorizontal:10,
                        }}>
                        <Icon name="minus" size={20} color="black" />
                      </View>
                    </TouchableOpacity>

                    <Text style={{fontSize: 20, flex: 1, textAlign: 'center'}}>
                      {item.quantity}
                    </Text>

                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, true)}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: 'rgb(229, 228, 226)',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: "100%",
                          paddingHorizontal:10,
                        }}>
                        <Icon name="plus" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Text
                      style={{
                        textDecorationLine: 'underline',
                        color: 'red',
                        marginLeft: 50,
                        fontSize: 20,
                        fontWeight: 400,
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

{!hasCartItems? <View style={{flex:1, height:300, width:"100%",justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:15,justifyContent:"center", alignItems:"center"}}>No items for checkout.</Text>
    </View>: null}

        <View
          style={{
            height: 250,
            width: '100%',
            marginBottom: 100,
            backgroundColor: '#E5E4E2',
            padding: 20,
          }}>
          <Text style={{fontSize: 17, fontWeight: 500, marginBottom: 20}}>
            Payment Details
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: "100%",
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.greyText}> Subtotal </Text>
            <Text style={styles.greyText}>₹ {totalPrice.toFixed(2)}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: "100%",
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.greyText}> Discount </Text>
            <Text style={styles.greyText}>₹ 0</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: "100%",
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.greyText}> Shipping </Text>
            <Text style={styles.greyText}>To be calculated at checkout</Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 20,
              borderColor: 'grey',
              borderBottomWidth: 1,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: "100%",
              marginTop: 20,
            }}>
            <Text style={{fontSize: 20, fontWeight: 500}}>Grand Total</Text>
            <Text style={{fontSize: 20, fontWeight: 500}}>
              ₹ {totalPrice.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* floating checkout view  */}



 


      <View style={styles.floatCheckout}>
        <View>
          <Text style={{fontSize: 20, fontWeight: 600, marginBottom: 5}}>
            ₹ {totalPrice.toFixed(2)}{' '}
          </Text>
          <Text style={{fontSize: 15, fontWeight: 400}}>
            Price inclusive of all taxes
          </Text>
        </View>
        <View style={{width: 120}}>
          <Button
            title="Checkout"
            color={'black'}
            disabled={!hasCartItems}
            //  onPress={() => navigation.navigate('WebViewScreen', { url: checkout.webUrl })}
            onPress={() => handleCheckout()}
          />
        </View>
      </View>
    </View>
  );
};

export default CheckoutPage;

const styles = StyleSheet.create({
  loadingContainer: {},
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  emptyCartText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  greyText: {
    fontSize: 15,
    fontWeight: 400,
  },
  floatCheckout: {
    height: 80,
    width: "100%",
    zIndex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    // Left: 0,
    right: 0,
    elevation: 5,
    shadowColor: 'black',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  addressSection: {padding: 20, backgroundColor: '#f9f9f9', marginBottom: 20},
  addressLabel: {fontSize: 18, fontWeight: 400, marginBottom: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flex: 1,
  },
  // floatCheckout: {
  //   height: 80,
  //   backgroundColor: 'white',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   padding: 20,
  //   elevation:5
  // },
  item: {flexDirection: 'row', marginBottom: 20},
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
},
label:{
  fontSize:20
  ,paddingBottom:10
}
});
