import 'react-native-gesture-handler';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Main from './components/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
// import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';
import ProductList from './components/ProductList';
import ProductDetailsScreen from './components/ProductDetailsScreen';
import CollectionListScreen from './components/CollectionListScreen';
import CollectionDetailsScreen from './components/CollectionDetailsScreen';
import CheckoutPage from './components/CheckoutPage';
import WebViewScreen from './components/WebViewScreen';
import BestSellers from './components/BestSellers';
import client from './shopifyApi/shopifyClient';
import {CartProvider, useCart} from './components/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Account from './components/Account';
import {Image} from 'react-native';
import LottieView from 'lottie-react-native';
import { HeaderTitle } from '@react-navigation/elements';









const Splash = ({ navigation }:any) => {
  useEffect(() => {
    // Simulate loading or API call
    setTimeout(() => {
      navigation.replace('MainApp'); // Navigate to the main app after 2 seconds
    }, 2000);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <LottieView style={{height:300,width:300}} source={require('./components/shop.json')} autoPlay loop />
    </View>
  );
};
// import { createCheckout } from './shopifyApi/checkoutHelper';

// // Apollo Client setup
// const apolloClient = new ApolloClient({
//   uri: 'https://rohitapitesting.myshopify.com/api/2024-10/graphql.json', // Storefront API endpoint
//   cache: new InMemoryCache(),
//   headers: {
//     'X-Shopify-Storefront-Access-Token': 'a0df56357ac9e8ab29a2ebd7d92b37f5', // Use a valid Storefront API token
//   },
// });

// // Retrieve an existing checkout
// const getCheckout = async () => {
//   console.log("get items")
//   const checkoutId:any = await AsyncStorage.getItem('checkoutId');
//   if (checkoutId) {
//     return await client.checkout.fetch(checkoutId);
//   }
//   console.log("getCheckout", checkoutId)
//   return createCheckout();
// };

const App = () => {
  // useEffect(()=>{
  //   if(Platform.OS="android")
  //   SplashScreen.hide();
  // },[])

  const {cartCount} = useCart();

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();
  const [search, setSearch] = useState(true);

  // useEffect(() => {
  //   const fetchCheckout = async () => {

  //     const checkoutData = await getCheckout();
  //     // setCheckout(checkoutData);
  //     // calculateTotalPrice(checkoutData.lineItems); // Calculate total price
  //     console.log("checkout data:", checkoutData)
  //   };

  //   fetchCheckout();
  // }, []);

  {
    /* <Stack.Screen name="ProductList" component={ProductList}/>
        
        
        
        <Tab.Screen name="Cart" component={Cart}/>
         */
  }

  const HomeStackNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown: true}}
    
    
    >
      <Stack.Screen
        name="CollectionListScreen"
        component={CollectionListScreen} options={{title:"Collections"}}
      />
      <Stack.Screen name="Home" component={Main} 
      
      />
      <Stack.Screen name="ProductList" component={ProductList} options={{title:"Product"}}/>
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        name="CollectionDetailsScreen"
        component={CollectionDetailsScreen}
      />
    </Stack.Navigator>
  );

  const CheckOutPageComponent = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Cart" component={CheckoutPage} options={{headerShown: true}} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  );

  const HomeComponent = () => (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="ProductList" component={ProductList} options={{title:"Product"}}/>
      <Stack.Screen
        name="CollectionListScreen"
        component={CollectionListScreen}
      />
      <Stack.Screen
        name="CollectionDetailsScreen"
        component={CollectionDetailsScreen}
      />
      <Stack.Screen name="BestSellers" component={BestSellers} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
    </Stack.Navigator>
  );




  const MainApp=()=>(
      <Tab.Navigator initialRouteName="Home">
        
        <Tab.Screen
          name="Home"
          component={HomeComponent}
          options={{
            headerShown:false,
            tabBarIcon: () => {
              return <Icon name={'home'} size={22} color={'black'} />;
            },
            // headerRight: ()=>(
            //   <View style={{flexDirection:"row"}}>

            //     {
            //       search?<TouchableOpacity style={{marginRight:20}} onPress={()=>setSearch(false)}>
            //       <Icon name="search" size={25}/>
            //     </TouchableOpacity>
            //     :
            //     <View style={{borderRadius:20,borderWidth:1,width:170,height:40, marginRight:20,flexDirection:"row"}}>
            //       <TextInput placeholder='Search Products' style={{flex:1,paddingLeft:10}}/>
            //       <View style={{marginRight:10,justifyContent:"center"}}><Icon name="search" size={15} color="grey" /></View>
            //       </View>
            //     }

            //   <TouchableOpacity style={{marginRight:20}}>
            //     <Icon name="shopping-cart" size={25}/>
            //   </TouchableOpacity>
            //   </View>

            // )
          }}
        />
        <Tab.Screen
          name="Collection"
          component={HomeStackNavigator}
          options={{
            headerShown:false,
            tabBarIcon: () => {
              return <Icon name={'th-large'} size={22} color={'black'} />;
            },
            // headerRight: ()=>(
            //   <View style={{flexDirection:"row"}}>

            //     {
            //       search?<TouchableOpacity style={{marginRight:20}} onPress={()=>setSearch(false)}>
            //       <Icon name="search" size={25}/>
            //     </TouchableOpacity>
            //     :
            //     <View style={{borderRadius:20,borderWidth:1,width:170,height:40, marginRight:20,flexDirection:"row"}}>
            //       <TextInput placeholder='Search Products' style={{flex:1,paddingLeft:10}}/>
            //       <View style={{marginRight:10,justifyContent:"center"}}><Icon name="search" size={15} color="grey" /></View>
            //       </View>
            //     }

            //   <TouchableOpacity style={{marginRight:20}}>
            //     <Icon name="shopping-cart" size={25}/>
            //   </TouchableOpacity>
            //   </View>

            // )
          }}
        />

        {/* <Tab.Screen name="ShopNow" component={ShopNow} options={{tabBarIcon:() => {
         return<Icon name={"table"} size={22} color={"black"} />;
      },
    }}/> */}
        {/* <Tab.Screen name="Cart" component={Cart}  options={{tabBarIcon:() => {
         return<Icon name={"cart-plus"} size={22} color={"black"} />;
      },
    }} /> */}

        <Tab.Screen
          name="Cart"
          component={CheckOutPageComponent}
         
          options={{
            headerShown:false,
            tabBarBadge: cartCount > 0 ? cartCount : 0, // Show badge only if cartCount > 0
            tabBarBadgeStyle: {
              backgroundColor: 'black',
              color: 'white',
              fontWeight: 800,
              borderColor: 'white',
              borderWidth: 1,
              
            },
            
            tabBarIcon: () => {
              return <Icon name={'cart-plus'} size={22} color={'black'} />;
            },
          }}
        />

        <Tab.Screen
          name="Account"
          component={Account}
          
          options={{
            tabBarBadgeStyle: {
              backgroundColor: 'black',
              color: 'white',
              fontWeight: 800,
              borderColor: 'white',
              borderWidth: 1,
            },

            tabBarIcon: () => {
              return (
                <Image
                  source={require('./components/assets/user.png')}
                  style={{height: 20, width: 20}}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    
  )
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainApp" component={MainApp} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
