import { Image, StyleSheet, Text, View, Button, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';

const Customer = () => {
  return (
    <View>
      <Text style={{ textAlign: "left", fontWeight: 500, fontSize: 20, paddingLeft: 20 }}>What Our Customer Says</Text>
      <View style={{ alignItems: "center", justifyContent: "center", padding: 20 }}>




        <View style={{ borderWidth: 1, borderRadius: 10, height: 300, width: 399, padding: 20 }}>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 15, fontWeight: 500 }}>Mohit Kumar</Text>
            <Text style={{ fontSize: 15, fontWeight: 300, }}>12/12/24</Text>
          </View>
          <View style={{ alignItems: "flex-start", paddingTop: 15, paddingBottom: 15 }}>
            <AirbnbRating
              size={18}
              showRating={false}
              selectedColor='black'
              defaultRating={5}
              isDisabled={true}
            />
          </View>
          <Text style={{ fontSize: 15, fontWeight: 500 }}> Best Product</Text>
          <Text style={{ fontSize: 15, fontWeight: 300, paddingTop: 20 }}>Very lightweight and very comfortable to wear. Best quality with this price range.</Text>


          <View style={{ flexDirection: "row", marginTop: 70 }}>
            <Image style={{ height: 50, width: 50 }} source={{ uri: "https://png.pngtree.com/thumb_back/fh260/background/20220929/pngtree-shoes-promotion-banner-background-image_1466238.jpg" }} />
            <Text style={{ textAlignVertical: "center", paddingLeft: 20 }}>Stylish footware, feel like a feather</Text>
          </View>
        </View>

        

      </View>
    </View>
  )
}

export default Customer

const styles = StyleSheet.create({})