import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

//gid://shopify/Collection/324936171669
//gid://shopify/Collection/324936204437

const ShopByCat = () => {
  const navigation = useNavigation<any>();
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
          <TouchableOpacity
            style={{width: '50%'}}
            onPress={() =>
              navigation.navigate('CollectionDetailsScreen', {
                collectionId: 'gid://shopify/Collection/324936171669',
              })
            }>
            <View style={{padding: 10, height: 180}}>
              {' '}
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
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '90%'}}
            onPress={() =>
              navigation.navigate('CollectionDetailsScreen', {
                collectionId: 'gid://shopify/Collection/324936204437',
              })
            }>
            <View
              style={{
                padding: 10,
                paddingLeft: -10,
                height: 180,
                width: '50%',
              }}>
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
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShopByCat;

const styles = StyleSheet.create({});
