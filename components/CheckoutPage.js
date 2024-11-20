import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity, ScrollView, TextInput,StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import client from "../shopifyApi/shopifyClient";

import Icon from 'react-native-vector-icons/FontAwesome';

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

const CheckoutPage = ({ navigation }) => {
    const [checkout, setCheckout] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0); // State for total price
    const [address, setAddress] = useState({}); // For managing address state
  const [isEditing, setIsEditing] = useState(false); // Track if editing address

    useEffect(() => {
        const fetchCheckout = async () => {
            const checkoutData = await getCheckout();
            setCheckout(checkoutData);
            calculateTotalPrice(checkoutData.lineItems); // Calculate total price
            const savedAddress = await AsyncStorage.getItem('address');
      if (savedAddress) {
        setAddress(JSON.parse(savedAddress));
      }
        };

        fetchCheckout();
    }, []);



    const saveAddress = async () => {
        console.log("saved section address")
        await AsyncStorage.setItem('address', JSON.stringify(address));
        setIsEditing(false);
      };
    
      const handleCheckout = async () => {
        
        if (!address.address1 || !address.city || !address.zip || !address.country) {
          console.log("address is not completed")
          return;
        }
    
        const checkoutId = await AsyncStorage.getItem('checkoutId');
    
        try {
          const updatedCheckout = await client.checkout.updateShippingAddress(checkoutId, {
            address1: address.address1,
            address2: address.address2 || null,
            city: address.city,
            province: address.province || null,
            country: address.country,
            firstName: address.firstName,
            lastName:address.lastName,
            zip: address.zip,
            phone: address.phone || null,
            // address1: "123 Main St",
            // address2: "Apt 4B",
            // city: "New York",
            // province: "NY",
            // country: "US",
            // firstName: "Bob",
            // lastName: "Notman",
            // zip: "10001",
            // phone: "+1234567890",
            
          });
        //  console.log("updated checkout", updatedCheckout.shippingAddress)
          navigation.navigate('WebViewScreen', { url: updatedCheckout.webUrl });
        } catch (error) {
          console.error(error);
        }
      };




     // Function to calculate total price
     const calculateTotalPrice = (lineItems) => {
        const total = lineItems.reduce((sum, item) => {
            return sum + item.quantity * parseFloat(item.variant.price.amount);
        }, 0);
        setTotalPrice(total);
    };

    // Update item quantity
    const updateQuantity = async (lineItemId, isIncrease) => {
        const checkoutId = await AsyncStorage.getItem('checkoutId');
        const lineItem = checkout.lineItems.find(item => item.id === lineItemId);
        const newQuantity = isIncrease ? lineItem.quantity + 1 : lineItem.quantity - 1;

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
    const removeItem = async (lineItemId) => {
        const checkoutId = await AsyncStorage.getItem('checkoutId');
        await client.checkout.updateLineItems(checkoutId, [
            {
                id: lineItemId,
                quantity: 0,  // Setting quantity to 0 will remove the item
            },
        ]);
        // Update state after removing the item
        const updatedCheckout = await client.checkout.fetch(checkoutId);
        setCheckout(updatedCheckout);
        calculateTotalPrice(updatedCheckout.lineItems); // Recalculate total price
    };

    if (!checkout) {
        return <Text>Loading checkout...</Text>;
    }

    return (
        <View>
<ScrollView style={{ padding: 15 }}>
<View style={styles.addressSection}>
          {isEditing ? (
            <View>
              <Text style={styles.addressLabel}>Edit Address</Text>
              <TextInput
                placeholder="First Name"
                value={address.firstName || ''}
                onChangeText={(text) => setAddress({ ...address, firstName: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Last Name"
                value={address.lastName || ''}
                onChangeText={(text) => setAddress({ ...address, lastName: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Address Line 1"
                value={address.address1 || ''}
                onChangeText={(text) => setAddress({ ...address, address1: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Address Line 2"
                value={address.address2 || ''}
                onChangeText={(text) => setAddress({ ...address, address2: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="City"
                value={address.city || ''}
                onChangeText={(text) => setAddress({ ...address, city: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="State/Province"
                value={address.province || ''}
                onChangeText={(text) => setAddress({ ...address, province: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Country"
                value={address.country || ''}
                onChangeText={(text) => setAddress({ ...address, country: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Postal Code"
                value={address.zip || ''}
                onChangeText={(text) => setAddress({ ...address, zip: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Phone Number"
                value={address.phone || ''}
                onChangeText={(text) => setAddress({ ...address, phone: text })}
                style={styles.input}
              />
              <Button title="Save Address" color={"black"} onPress={saveAddress} />
            </View>
          ) : (
            <View>
              <Text style={styles.addressLabel}>Shipping Address</Text>
              <Text>First Name: {address.firstName}</Text>
              <Text>Last Name : {address.lastName}</Text>
              <Text>Address1   : {address.address1 || 'No address set'}</Text>
              <Text>Address2   : {address.address2}</Text>
              <Text>City             : {address.city}</Text>
              <Text>Province    : {address.province}</Text>
              <Text>Country      : {address.country}</Text>
              <Text>Zip              : {address.zip}</Text>
              <Text>Phone        : {address.phone}</Text>
              <Button title="Edit Address" color={"grey"} onPress={() => setIsEditing(true)} />
            </View>
          )}
        </View>





        
            <FlatList
                data={checkout.lineItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                        <Image source={{ uri: item.variant.image.src, width: 100, height: 150 }} />
                        <View style={{ marginLeft: 10, width: 270 }}>
                            <Text numberOfLines={2} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: 400 }}>
                                {item.title}
                            </Text>

                            <View style={{ marginTop: 10, width: 200 }}>
                                <Text style={{ fontSize: 15, fontWeight: 500, marginLeft: 10 }}>
                                    Price: {'\u20B9'} {item.variant.price.amount}
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: 500, marginLeft: 10 }}>
                                    Total: {'\u20B9'} {item.variant.price.amount * item.quantity}
                                </Text>
                            </View>

                            <View style={{ marginTop: 30, flexDirection: "row" }}>
                                <View style={{ borderWidth: 0.5, height: 35, width: "50%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <TouchableOpacity onPress={() => updateQuantity(item.id, false)}>
                                        <View style={{ flex: 1, backgroundColor: "rgb(229, 228, 226)", justifyContent: "center", alignItems: "center", width: 50 }}>
                                            <Icon name="minus" size={20} color="black" />
                                        </View>
                                    </TouchableOpacity>

                                    <Text style={{ fontSize: 20, flex: 1, textAlign: "center" }}>{item.quantity}</Text>

                                    <TouchableOpacity onPress={() => updateQuantity(item.id, true)}>
                                        <View style={{ flex: 1, backgroundColor: "rgb(229, 228, 226)", justifyContent: "center", alignItems: "center", width: 50 }}>
                                            <Icon name="plus" size={20} color="black" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => removeItem(item.id)}>
                                    <Text style={{ textDecorationLine: "underline", color: "red", marginLeft: 50, fontSize: 20, fontWeight: 400 }}>
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />

            <View style={{ height: 250, width: "auto", marginBottom: 100, backgroundColor: "#E5E4E2", padding: 20 }}>

                <Text style={{ fontSize: 17, fontWeight: 500, marginBottom: 20 }}>Payment Details</Text>
                <View style={{ flexDirection: "row", width: 340, marginBottom: 10, justifyContent: "space-between" }}>
                    <Text style={styles.greyText}> Subtotal </Text>
                    <Text style={styles.greyText}>₹ {totalPrice.toFixed(2)}</Text>

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
                    <Text style={{ fontSize: 20, fontWeight: 500 }}>₹ {totalPrice.toFixed(2)}</Text>
                </View>
            </View>






           

           
        </ScrollView>

         {/* floating checkout view  */}

      <View style={styles.floatCheckout}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 5 }}>₹ {totalPrice.toFixed(2)} </Text>
          <Text style={{ fontSize: 15, fontWeight: 400 }}>Price inclusive of all taxes</Text>
        </View>
        <View style={{ width: 120 }}><Button title='Checkout' color={"black"}  
        //  onPress={() => navigation.navigate('WebViewScreen', { url: checkout.webUrl })}
         onPress={()=>handleCheckout()}
         
         
         /></View>


      </View>
        </View>
    );
};

export default CheckoutPage;


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
      
 addressSection: { padding: 20, backgroundColor: '#f9f9f9', marginBottom: 20 },
 addressLabel: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
 input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
 floatCheckout: {
   height: 80,
   backgroundColor: 'white',
   position: 'absolute',
   bottom: 0,
   left: 0,
   right: 0,
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: 20,
 },
 item: { flexDirection: 'row', marginBottom: 20 },
})
