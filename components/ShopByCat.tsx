import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';

const ShopByCat = () => {
  return (
    <View>
      <View>
        <Text
          style={{
            padding: 20,
            paddingTop: 40,
            textAlign: 'left',
            justifyContent: 'flex-start',
            fontSize: 20,
            fontWeight: 500,
          }}>
          Shop By Category
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{padding: 10, height: 180, width: "50%"}}>
            {/* <ImageBackground style={{ height: 150, width: 185 }} source={{ uri: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/29_1600x.png?v=1723184721" }} > */}
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(90, 90, 90,0.7)',
                alignSelf: 'stretch',
              }}>
              <Text style={{fontSize: 20, fontWeight: 500, color: 'white'}}>
                {' '}
                Men
              </Text>
            </View>
            {/* </ImageBackground> */}
            {/* <Text style={{textAlign:"center", fontSize:15,paddingTop:10}}>Lip</Text> */}
          </View>

          <View
            style={{padding: 10, paddingLeft: -10, height: 180, width: "50%"}}>
            {/* <ImageBackground style={{ height: 150, width: 185 }} 
            source={{ uri: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/29_1600x.png?v=1723184721"
              
             }} > */}
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(90, 90, 90,0.7)',
                alignSelf: 'stretch',
              }}>
              <Text style={{fontSize: 20, fontWeight: 500, color: 'white'}}>
                {' '}
                Women
              </Text>
            </View>
            {/* </ImageBackground> */}
            {/* <Text style={{textAlign:"center", fontSize:15,paddingTop:10}}>Lip</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShopByCat;

const styles = StyleSheet.create({});
