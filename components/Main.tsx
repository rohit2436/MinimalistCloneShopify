import { Image, StyleSheet, Text, View, Button, ScrollView, ImageBackground, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import BestSellers from './BestSellers';
import ShopByCat from './ShopByCat';
import Customer from './Customer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './Footer';
// import { gql, useQuery } from '@apollo/client';
import CollectionListScreen from './CollectionListScreen';
import { useNavigation } from '@react-navigation/native';
import client from '../shopifyApi/shopifyClient';
import { fetchProductById } from "../shopifyApi/shopifyService";


// const GET_COLLECTIONS = gql`
//   query GetCollectionDetails($id: ID!) {
//     collection(id: $id) {
//       products(first: 1) {
//         edges {
//           node {
//             id
//             title
//             description
//             priceRange {
//               minVariantPrice {
//                 amount
//               }
//             }
//             images(first: 1) {
//               edges {
//                 node {
//                   src
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;






const Main:any = () => {
  const navigation = useNavigation<any>();
  const [singleproduct, setSingleProduct] = useState<any>();
 


  const getProductById = async (productId: string) => {
    try {
      const product = await fetchProductById(productId);
      setSingleProduct(product);
      console.log("single prduct name: ", singleproduct)
      console.log("Product details:", product);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
    }
  };


  useEffect(()=>{
    getProductById("gid://shopify/Product/8642470215829");
  },[])


 
 
  useEffect(() => {
    // Fetch collections with products
    client.collection.fetchAllWithProducts().then((collections) => {
      setCollections(collections);
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching collections:', error);
      setLoading(false);
    });
  }, []);
 


  // const { loading, error, data } = useQuery(GET_COLLECTIONS, {
  //   variables: { id: "gid://shopify/Collection/324936204437" },
  // });


  const [collections, setCollections] = useState<any>([]);
  const [loadingbar, setLoading] = useState<any>(true);


  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error: {error.message}</Text>;
  // // const [rating, setRating] = useState(1);
  // console.log(data.collection.products.edges[0].node.images.edges[0].node.src)
  // console.log(data.collection.products.edges[0].node.description)
  // console.log(data.collection.products.edges[0].node.title)




  const renderCollection = ({ item }:any) => (


    <TouchableOpacity
          onPress={() =>
            // navigation.navigate('CollectionDetails', { collectionId: 'gid://shopify/Collection/324935843989' })
            navigation.navigate('CollectionDetailsScreen', { collectionId: item.id })
          }
        >
    <View style={styles.collectionContainer}>
      {/* Circle with Collection Image */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: item.image?.src || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
         <View style={styles.overlay} />
      {/* Collection Name Inside */}
      <Text style={styles.collectionNameInside}>{item.title}</Text>
    </View>
      {/* Collection Name Below */}
      <Text style={styles.collectionName}>{item.title}</Text>
    </View>
    </TouchableOpacity>
  );


  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  // }


 
  return (
    <ScrollView style={{backgroundColor:"white"}}>
      <TouchableOpacity onPress={()=>navigation.navigate("ProductList")}>
      <View style={styles.freecontainer}>
        <Text style={styles.freeText}>Get a FREE GIFT on all your orders.</Text>
      </View>
      </TouchableOpacity>


      <FlatList
      data={collections}
      renderItem={renderCollection}
      keyExtractor={(item) => item.id}
      horizontal
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}
    />


<View style={{width:150,backgroundColor:"black",marginTop:12,}}>
  <Text style={{color:"white", fontSize:15, fontWeight:500,textAlign:"center",padding:3}}>New Launch</Text>
</View>




      <View style={{ alignItems: "center", marginBottom: 20 }}>


        {/* <Text>hello {data.collections.edges.node.id}</Text> */}
        <View style={styles.main}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: singleproduct?.images[0]?.src }} />
          </View>
          <View style={styles.textContainer}>
            {/* <Text style={{ padding: 10, fontSize: 15, textAlign: "center" }}>New Launch</Text> */}
            <Text style={{ padding: 10, fontSize: 30, fontWeight: 500, textAlign: "center" }}>{singleproduct?.title}</Text>
            <Text style={{ textAlign: "center", paddingBottom: 30, }}>{singleproduct?.description}</Text>


            <Button color={"black"} title='   See Details   '
              onPress={() => navigation.navigate('ProductDetailsScreen', { productId: singleproduct.id })}
            />
          </View>


        </View>




        <BestSellers />
        <TouchableOpacity onPress={() => navigation.navigate("ProductList")}>
          <View style={{ borderWidth: 2, borderColor: "black", height: 50, width: "95%", justifyContent: "center" }}>


            <Text style={{ textAlign: "center",paddingHorizontal:80 }}>View All Products</Text>
          </View>
        </TouchableOpacity>


      </View>


      <ShopByCat />
      <TouchableOpacity style={{justifyContent:"center", alignItems:"center",marginTop:20}} onPress={() => navigation.navigate("CollectionListScreen")}>
          <View style={{ borderWidth: 2, borderColor: "black", height: 50, justifyContent: "center" }}>


            <Text style={{ textAlign: "center" ,paddingHorizontal:80}}>View All Collections</Text>
          </View>
        </TouchableOpacity>












      <View style={styles.textContainer}>


        <Text style={{ padding: 10, fontSize: 30, fontWeight: 500, textAlign: "center" }}>The future of premium products</Text>
        <Text style={{ textAlign: "center", paddingBottom: 30, }}>Embrace This Amazing product, where each element is chosen for its scientific merit, offering you authentic, effective product for you.</Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image style={{ height: 100, width: 100 }} source={{ uri: "https://i.pinimg.com/736x/25/b1/b9/25b1b911cb313fa05e57fa20acb1f2cb.jpg" }} />
          <Text style={{ fontWeight: 500, fontSize: 20, textAlign: "center", paddingTop: 20, paddingBottom: 10 }}>Affortable</Text>
          <Text >Best Product, accessible to all</Text>
        </View>
      </View>


      {/* <Customer/> */}








      <Footer />


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
  },
  freecontainer:{
    backgroundColor:"#FFBE46",
    alignItems:"center",
    justifyContent:"center",


  },
  freeText:{
    textAlign:"center",
    textAlignVertical:"center",
    color:"white",
    fontSize:15,
    fontWeight:"bold",
    padding:5
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  collectionContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden', // Ensures the overlay stays within the circle
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent grey
    borderRadius: 40,
  },
  collectionNameInside: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    zIndex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
   
  },
  collectionName: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
