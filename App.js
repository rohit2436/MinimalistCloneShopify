

import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Main from './components/Main'
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import ShopNow from './components/ShopNow'
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';
import ProductLists from './shopifyApi/ProductLists';
import ProductList from './components/ProductList';
import ProductDetailsScreen from './components/ProductDetailsScreen';
import CollectionListScreen from './components/CollectionListScreen';
import CollectionDetailsScreen from './components/CollectionDetailsScreen';
import Cart from './components/Cart';
import Address from './components/Address';
import { specifiedSDLRules } from 'graphql/validation/specifiedRules';
import CheckoutPage from './components/CheckoutPage';
import WebViewScreen from './components/WebViewScreen';
import BestSellers from './components/BestSellers';
import client from './shopifyApi/shopifyClient';
import {CartProvider, useCart} from "./components/CartContext"




// Apollo Client setup
const apolloClient = new ApolloClient({
  uri: 'https://rohitapitesting.myshopify.com/api/2024-10/graphql.json', // Storefront API endpoint
  cache: new InMemoryCache(),
  headers: {
    'X-Shopify-Storefront-Access-Token': 'a0df56357ac9e8ab29a2ebd7d92b37f5', // Use a valid Storefront API token
  },
});



// Retrieve an existing checkout
const getCheckout = async () => {
  console.log("get items")
  const checkoutId = await AsyncStorage.getItem('checkoutId');
  if (checkoutId) {
    return await client.checkout.fetch(checkoutId);
  }
  console.log("getCheckout", checkoutId)
  return createCheckout();
};


const App = () => {


  const { cartCount } = useCart();

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();
  const [search,setSearch]=useState(true);


  



  
useEffect(() => {
  const fetchCheckout = async () => {
   
    const checkoutData = await getCheckout();
    // setCheckout(checkoutData);
    // calculateTotalPrice(checkoutData.lineItems); // Calculate total price
    console.log("checkout data:", checkoutData)   
  };

  fetchCheckout();
}, []);




  

{/* <Stack.Screen name="ProductList" component={ProductList}/>
        
        
        
        <Tab.Screen name="Cart" component={Cart}/>
         */}


  const HomeStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="CollectionListScreen" component={CollectionListScreen}/>
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen}/>
      <Stack.Screen name="CollectionDetailsScreen" component={CollectionDetailsScreen}/>
      {/* <Stack.Screen name="CheckoutPage" component={CheckoutPage}/> */}
      {/* <Stack.Screen name="WebViewScreen" component={WebViewScreen}/> */}
      <Stack.Screen name="Address" component={Address}/>
      <Stack.Screen name="Cart" component={Cart}/>
    </Stack.Navigator>
  )

  const CheckOutPageComponent=()=>(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CheckoutPage" component={CheckoutPage}/>
      <Stack.Screen name="WebViewScreen" component={WebViewScreen}/>

    </Stack.Navigator>
  )

  const HomeComponent=()=>(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Main}/>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="CollectionListScreen" component={CollectionListScreen}/>
      <Stack.Screen name="CollectionDetailsScreen" component={CollectionDetailsScreen}/>
      {/* <Stack.Screen name="CheckoutPage" component={CheckoutPage}/> */}
      {/* <Stack.Screen name="WebViewScreen" component={WebViewScreen}/> */}
      <Stack.Screen name='BestSellers' component={BestSellers}/>
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen}/>
      <Stack.Screen name="Address" component={Address}/>
      <Stack.Screen name="Cart" component={Cart}/>

    </Stack.Navigator>
  )


  return (

<ApolloProvider client={apolloClient}>






    <NavigationContainer>
     

      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name="Home" component={HomeComponent} 

        options={{
          tabBarIcon:() => {
            return<Icon name={"home"} size={22} color={"black"} />;
         },
          headerRight: ()=>(
            <View style={{flexDirection:"row"}}>

              {
                search?<TouchableOpacity style={{marginRight:20}} onPress={()=>setSearch(false)}>
                <Icon name="search" size={25}/>
              </TouchableOpacity>
              :
              <View style={{borderRadius:20,borderWidth:1,width:170,height:40, marginRight:20,flexDirection:"row"}}>
                <TextInput placeholder='Search Products' style={{flex:1,paddingLeft:10}}/>
                <View style={{marginRight:10,justifyContent:"center"}}><Icon name="search" size={15} color="grey" /></View>
                </View>
              }
            

            <TouchableOpacity style={{marginRight:20}}>
              <Icon name="shopping-cart" size={25}/>
            </TouchableOpacity>
            </View>
            
          )
        }}
        
        />
        <Tab.Screen name="Collection" component={HomeStackNavigator}
        options={{
          tabBarIcon:() => {
            return<Icon name={"th-large"} size={22} color={"black"} />;
         },
          headerRight: ()=>(
            <View style={{flexDirection:"row"}}>

              {
                search?<TouchableOpacity style={{marginRight:20}} onPress={()=>setSearch(false)}>
                <Icon name="search" size={25}/>
              </TouchableOpacity>
              :
              <View style={{borderRadius:20,borderWidth:1,width:170,height:40, marginRight:20,flexDirection:"row"}}>
                <TextInput placeholder='Search Products' style={{flex:1,paddingLeft:10}}/>
                <View style={{marginRight:10,justifyContent:"center"}}><Icon name="search" size={15} color="grey" /></View>
                </View>
              }
            

            <TouchableOpacity style={{marginRight:20}}>
              <Icon name="shopping-cart" size={25}/>
            </TouchableOpacity>
            </View>
            
          )
        }}
        
        />
   
        <Tab.Screen name="ShopNow" component={ShopNow} options={{tabBarIcon:() => {
         return<Icon name={"table"} size={22} color={"black"} />;
      },
    }}/>
        {/* <Tab.Screen name="Cart" component={Cart}  options={{tabBarIcon:() => {
         return<Icon name={"cart-plus"} size={22} color={"black"} />;
      },
    }} /> */}



<Tab.Screen name="CheckoutPage" component={CheckOutPageComponent}  options={{
  tabBarBadge: cartCount > 0 ? cartCount : 0, // Show badge only if cartCount > 0
  tabBarBadgeStyle:{backgroundColor:"black", color:"white",fontWeight:800,borderColor:"white",borderWidth:1},
  
  tabBarIcon:() => {
         return<Icon name={"cart-plus"} size={22} color={"black"} />;
      },
      
    }} 
    
    />

        
      </Tab.Navigator>
    </NavigationContainer>

    </ApolloProvider>
    
    
  )
}

export default App

const styles = StyleSheet.create({})