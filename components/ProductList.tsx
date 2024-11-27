import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { GET_PRODUCTS } from '../shopifyApi/queries'
import { useQuery } from '@apollo/client';
import { AirbnbRating } from 'react-native-ratings';
import AddToCartButton from './AddToCartButton';

const ProductList = ({ navigation }:any) => {

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;
  // const [like, setLike] = useState(false);

  return (

    <ScrollView>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <FlatList
          data={data.products.edges}

          keyExtractor={(item) => item.node.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{ height: 500, width: "50%", padding: 10 }}>
              
                <Image style={{ width: "100%", height: 200 }} source={{ uri: item.node.images.edges[0].node.src }} />
                <View style={{height:100}}>
                <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: 500, textAlign: "left" }}>{item.node.title}</Text>
                </View>
                <Text style={{ paddingTop: 10 }} numberOfLines={2} ellipsizeMode='tail'>{item.node.description}</Text>
                <View style={{ alignItems: "flex-start", paddingTop: 15 }}>
                  {/* <AirbnbRating
          size={18}
          showRating={false}
          selectedColor='black'
          defaultRating={3}
          isDisabled={true}
        /> */}
                </View>
                <Text style={{ fontSize: 18, paddingTop: 10, paddingBottom: 20, fontWeight: "500" }}>{'\u20B9'} 275</Text>
                <Button color={"black"} title='See Details' 
                onPress={() => navigation.navigate("ProductDetailsScreen", { productId: item.node.id })}
                />
                      
{/* <AddToCartButton
            product={item.node}
            quantity={1}
            navigation={navigation}
          /> */}


              <View style={{ position: "absolute", bottom: 300, right: 15 }}>
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

  )
}

export default ProductList

const styles = StyleSheet.create({})