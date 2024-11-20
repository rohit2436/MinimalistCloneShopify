// CollectionDetailsScreen.js
import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_COLLECTION_DETAILS = gql`
  query GetCollectionDetails($id: ID!) {
    collection(id: $id) {
      products(first: 10) {
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

const CollectionDetailsScreen = ({ route,navigation}) => {
  const { collectionId } = route.params;
  // const collectionId = "gid://shopify/Collection/324935876757";
  console.log(collectionId)
  const { loading, error, data } = useQuery(GET_COLLECTION_DETAILS, {
    variables: { id: collectionId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (

    // <FlatList 
    //   data={data.products.edges}
      
    //   keyExtractor={(item) => item.node.id}
    //   numColumns={2}
    //   renderItem={({ item }) => (
    //   <View style={{ height: 500, width: "50%", padding: 10 }}>
    //     <TouchableOpacity onPress={()=>navigation.navigate("ProductDetailsScreen",{productId : item.node.id})}>
    //   <Image style={{ width: "100%", height: 200 }} source={{ uri: item.node.images.edges[0].node.src}} />
    //   <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: 500, textAlign: "left" }}>{item.node.title}</Text>
    //   <Text style={{ paddingTop: 10 }} numberOfLines={2} ellipsizeMode='tail'>{item.node.description}</Text>
    //   <View style={{ alignItems: "flex-start", paddingTop: 15 }}>
    //     {/* <AirbnbRating
    //       size={18}
    //       showRating={false}
    //       selectedColor='black'
    //       defaultRating={3}
    //       isDisabled={true}
    //     /> */}
    //   </View>
    //   <Text style={{ fontSize: 18, paddingTop: 10, paddingBottom: 20,fontWeight:"500" }}>{'\u20B9'} 275</Text>
    //   <Button color={"black"} title='Add To Cart' />

    //   </TouchableOpacity>

    //   <View style={{position:"absolute",bottom:300,right:15}}>
    //   {like?
    //   <TouchableOpacity onPress={()=>setLike(!like)}>
      
    //   <Image style={{height:30, width:30}}source={require("./assets/heartOutline.png")}/>
   
        
    //     </TouchableOpacity>
    //     :
    //     <TouchableOpacity onPress={()=>setLike(!like)}>
      
    //   <Image style={{height:30, width:30}}source={require("./assets/heartFill.webp")}/>
   
        
    //     </TouchableOpacity>
      
    // }
    // </View>
      
    //   </View>
    
      
    
    // )}
    // />


    <FlatList
      data={data.collection.products.edges}
      keyExtractor={(item) => item.node.id}
      numColumns={2}
      renderItem={({ item }) => (
        <View  style={{height: 500, width: "50%", padding: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetailsScreen', { productId: item.node.id })}
          
        >
          <Image
              source={{ uri: item.node.images.edges[0].node.src }}
              style={{ width: "100%", height: 200 }}
            />
            <View style={{height:100}}>
             <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: 500, textAlign: "left" }}>{item.node.title}</Text>
             </View>
             <Text
                style={{ paddingTop: 10 }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.node.description}
              </Text>
              <Text
              style={{
                fontSize: 18,
                paddingTop: 10,
                paddingBottom: 20,
                fontWeight: '500',
              }}
            >
              {'\u20B9'} {item.node.priceRange.minVariantPrice.amount}
            </Text>
         
        </TouchableOpacity>
        <Button color={"black"} title='Add To Cart' />
        
        </View>
        
      )}
    />
    
  );
  
};

export default CollectionDetailsScreen;
