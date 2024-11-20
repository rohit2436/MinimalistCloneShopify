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
          <Text style={{ fontSize: 15, fontWeight: 500 }}> Best for only skin</Text>
          <Text style={{ fontSize: 15, fontWeight: 300, paddingTop: 20 }}>It's only light and leave no white marks or heaviness..one of the best for oily acne prone skin</Text>


          <View style={{ flexDirection: "row", marginTop: 70 }}>
            <Image style={{ height: 50, width: 50 }} source={{ uri: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/29_1600x.png?v=1723184721" }} />
            <Text style={{ textAlignVertical: "center", paddingLeft: 20 }}>Hypochlorous Acid Skin Relief Spray 150 ppm</Text>
          </View>
        </View>

        

      </View>
    </View>
  )
}

export default Customer

const styles = StyleSheet.create({})