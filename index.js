/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {CartProvider, useCart} from "./components/CartContext"

// <CartProvider>
//     <App/>
// </CartProvider>




// AppRegistry.registerComponent(appName, () => App);


// Wrap App with CartProvider
const WrappedApp = () => (
    <CartProvider>
      <App />
    </CartProvider>
  );
  
  AppRegistry.registerComponent(appName, () => WrappedApp);
