// CollectionListScreen.js
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import client from '../shopifyApi/shopifyClient';

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




const CollectionListScreen = ({ navigation }:any) => {

    const [collectionid, setCollectionid] = useState<any>();
    const [collections, setCollections] = useState<any>([]);
  const [loadingbar, setLoading] = useState<any>(true);


  const { loading, error, data } = useQuery(GET_COLLECTIONS);

  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error: {error.message}</Text>;


  
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

  const renderCollection:any = ({ item }:any) => (

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
      
    </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }
  return (
    <ScrollView>
    <View style={{marginBottom:20}}>
    <View>
      <TouchableOpacity activeOpacity={.7} onPress={()=>navigation.navigate("ProductList")}>
        <View style={{padding:12}}>
        <ImageBackground height={200} width={200} source={{uri:"https://png.pngtree.com/thumb_back/fh260/background/20220929/pngtree-shoes-promotion-banner-background-image_1466238.jpg"}}>
        <View style={{padding:20,height:120,width:"auto",alignItems:"center", justifyContent:"center",backgroundColor:'rgba(0, 0, 0, 0.5)',}}>
          <Text style={{fontWeight:"500", fontSize:18,color:"white"}}>All Product</Text>
        </View>
        </ImageBackground>
        </View>
       
      </TouchableOpacity>
    </View>

    <FlatList
      data={collections}
      renderItem={renderCollection}
      keyExtractor={(item) => item.id}
      numColumns={3} // Set to display 3 columns
      columnWrapperStyle={styles.rowContainer} // Optional: Add spacing between rows
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}
    />

    {/* <FlatList
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
      
    /> */}
    
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  // collectionContainer: {
  //   alignItems: 'center',
  //   // marginHorizontal: 8,
  // },
  avatarContainer: {
    width: 100,
    height: 100,
    // borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden', // Ensures the overlay stays within the circle
  },
  avatar: {
    width: 100,
    height: 100,
    // borderRadius: 40,
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent grey
    // borderRadius: 40,
  },
  collectionNameInside: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    fontWeight:"700",
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
  gridContainer: {
    padding: 8,
  },
  rowContainer: {
    // justifyContent: 'space-between', // Ensures spacing between columns
    marginBottom: 16, // Spacing between rows
  },
  collectionContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginLeft:33,
    marginBottom: 16, // Add spacing between items vertically
    flex: 1, // Ensures equal width for items
    maxWidth: '33%', // Makes sure 3 items fit in one row
  },
})

export default CollectionListScreen;
