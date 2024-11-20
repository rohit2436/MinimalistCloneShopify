import { Image, StyleSheet, Text, View, Button, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';

const BestSellers = () => {
  return (
    <View>
      {/* <Text style={{ textAlign: "left", fontWeight: 500, fontSize: 20, paddingLeft: 20 }}>Our Best Sellers</Text> */}
        <View style={{ flexDirection: "row" }}>


          <View style={{ height: 500, width: "50%", padding: 10 }}>
            <Image style={{ width: "100%", height: 200 }} source={{ uri: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/29_1600x.png?v=1723184721" }} />
            <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: 500, textAlign: "left" }}>Hypochlorous Acid Skin Relief Spray 150 ppm</Text>
            <Text style={{ paddingTop: 10 }}>Acne, Breakouts & Oiliness</Text>
            <View style={{ alignItems: "flex-start", paddingTop: 15 }}>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={3}
                isDisabled={true}
              />
            </View>
            <Text style={{ fontSize: 15, paddingTop: 20, paddingBottom: 20 }}>{'\u20B9'} 275</Text>
            <Button color={"black"} title='Add To Cart' />
          </View>

          <View style={{ height: 500, width: "50%", padding: 10 }}>
            <Image style={{ width: "100%", height: 200 }} source={{ uri: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/29_1600x.png?v=1723184721" }} />
            <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: 500, textAlign: "left" }}>Hypochlorous Acid Skin Relief Spray 150 ppm</Text>
            <Text style={{ paddingTop: 10 }}>Acne, Breakouts & Oiliness</Text>
            <View style={{ alignItems: "flex-start", paddingTop: 15 }}>
              <AirbnbRating
                size={18}
                showRating={false}
                selectedColor='black'
                defaultRating={3}
                isDisabled={true}
              />
            </View>
            <Text style={{ fontSize: 15, paddingTop: 20, paddingBottom: 20 }}>{'\u20B9'} 275</Text>
            <Button color={"black"} title='Add To Cart' />
          </View>


        </View>
    </View>
  )
}

export default BestSellers

const styles = StyleSheet.create({})