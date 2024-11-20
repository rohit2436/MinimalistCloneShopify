
import { Image, StyleSheet, Text, View, Button, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import BestSellers from './BestSellers';
import ShopByCat from './ShopByCat';
import Customer from './Customer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './Footer';
import { gql, useQuery } from '@apollo/client';
import CollectionListScreen from './CollectionListScreen';

const GET_COLLECTIONS = gql`
  query GetCollectionDetails($id: ID!) {
    collection(id: $id) {
      products(first: 1) {
        edges {
          node {
            id
            title
            description
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;



const Main = (props) => {

  const { loading, error, data } = useQuery(GET_COLLECTIONS, {
    variables: { id: "gid://shopify/Collection/324935942293" },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  // const [rating, setRating] = useState(1);
  console.log(data.collection.products.edges[0].node.images.edges[0].node.src)
  console.log(data.collection.products.edges[0].node.description)
  console.log(data.collection.products.edges[0].node.title)

  return (
    <ScrollView>
      
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        
        {/* <Text>hello {data.collections.edges.node.id}</Text> */}
        <View style={styles.main}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: data.collection.products.edges[0].node.images.edges[0].node.src }} />
          </View>
          <View style={styles.textContainer}>
            <Text style={{ padding: 10, fontSize: 15, textAlign: "center" }}>New Launch</Text>
            <Text style={{ padding: 10, fontSize: 30, fontWeight: 500, textAlign: "center" }}>{data.collection.products.edges[0].node.title}</Text>
            <Text style={{ textAlign: "center", paddingBottom: 30, }}>{data.collection.products.edges[0].node.description}</Text>
            <View style={{ width: 120 }}><Button title='Shop Now' color={"black"} onPress={()=>props.navigation.navigate("ShopNow")}/></View>
          </View>

        </View>

        <Text style={{ textAlign: "left", fontWeight: 500, fontSize: 20, paddingLeft: 20 }}>Our Best Sellers</Text>
        <BestSellers />

        <View style={{ borderWidth: 2, borderColor: "black", height: 50, width: "95%", justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }}>View All Products</Text>
        </View>

      </View>

      <ShopByCat />
      
      <ShopByCat />
      <View style={{ padding: 20 }} />

      <Text style={{ textAlign: "left", fontWeight: 500, fontSize: 20, paddingLeft: 20 }}>Our Best Sellers</Text>
      <BestSellers />


      <View style={styles.textContainer}>

        <Text style={{ padding: 10, fontSize: 30, fontWeight: 500, textAlign: "center" }}>The future of personal care is here</Text>
        <Text style={{ textAlign: "center", paddingBottom: 30, }}>Embrace Minimalist, where each element is chosen for its scientific merit, offering you authentic, effective skincare solutions.</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image style={{ height: 100, width: 100 }} source={{ uri: "https://i.pinimg.com/736x/25/b1/b9/25b1b911cb313fa05e57fa20acb1f2cb.jpg" }} />
          <Text style={{ fontWeight: 500, fontSize: 20, textAlign: "center", paddingTop: 20, paddingBottom: 10 }}>Affortable</Text>
          <Text >Skincare, accessible to all</Text>
        </View>
      </View>
      
      <Customer/>




      <View style={{backgroundColor:"grey", height:600, width:390, margin:10,borderWidth:1}}>
      <Image style={{height:400, width:"100%"}} source={{ uri: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/29_1600x.png?v=1723184721" }} />
      <View style={{backgroundColor:"#F2F2ED", height:200, width:"100%",justifyContent:"center",alignItems:"center"}}>
        <Text style={{textAlign:"center", fontSize:30}}>Minimalist Trust Circle</Text>
        <Text style={{textAlign:"center", fontSize:15,padding:15}}>Earn & Redeem MCash on every purchase</Text>
        <View style={{borderWidth:2, borderColor:"black", height:50, width:150, alignItems:"center",justifyContent:"center"}}>
          <Text style={{textAlign:"center",textAlignVertical:"center"}}>Show More</Text>
        </View>
      </View>
      
      </View>



      <Footer/>

    </ScrollView>
  )
}

export default Main

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",


  },
  main: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: 300,
    width: 400,
    backgroundColor: "white",
    alignItems: "center"
  },
  textContainer: {
    padding: 40,
    justifyContent: "center",
    alignItems: "center"
  }
})