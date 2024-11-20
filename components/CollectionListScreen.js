// CollectionListScreen.js
import React, { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(first: 20) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;




const CollectionListScreen = ({ navigation }) => {

    const [collectionid, setCollectionid] = useState();

  const { loading, error, data } = useQuery(GET_COLLECTIONS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{marginBottom:20}}>
    <View>
      <TouchableOpacity activeOpacity={.7} onPress={()=>navigation.navigate("ProductList")}>
        <View style={{backgroundColor:"grey", height:120,width:"auto",margin:20,marginBottom:10,alignItems:"center", justifyContent:"center"}}>
          <Text style={{fontWeight:"500", fontSize:18,color:"white"}}>All Product</Text>
        </View>
      </TouchableOpacity>
    </View>
    <FlatList
      data={data.collections.edges}
      keyExtractor={(item) => item.node.id}
      numColumns={3}
      contentContainerStyle={{
        flexWrap:"wrap",
        flexDirection:"row",
        justifyContent:"space-around"
      }}
      renderItem={({ item }) => (
        console.log(item.node.id),
        <TouchableOpacity
          onPress={() =>
            // navigation.navigate('CollectionDetails', { collectionId: 'gid://shopify/Collection/324935843989' })
            navigation.navigate('CollectionDetailsScreen', { collectionId: item.node.id })
          }
        >
          <View style={{ padding: 10, borderColor: '#ccc' ,height:110,width:110,borderWidth:1,justifyContent:"center",alignItems:"center", margin:10,backgroundColor:"grey"}}>
            <Text style={{ fontSize: 12,color:"white",fontWeight:"500" }}>{item.node.title}</Text>
          </View>
          
        </TouchableOpacity>
        
      )}
      
    />
    
    </View>
  );
};

export default CollectionListScreen;
