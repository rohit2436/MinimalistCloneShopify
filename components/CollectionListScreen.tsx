import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Modal,
} from 'react-native';
import client from '../shopifyApi/shopifyClient';


const CollectionListScreen = ({navigation}: any) => {
  const [collections, setCollections] = useState<any>([]);
  const [loadingbar, setLoading] = useState<any>(true);

//gid://shopify/Collection/324936171669
//gid://shopify/CollectionImage/1622995796117
  useEffect(() => {
    // Fetch collections with products
    client.collection
      .fetchAllWithProducts()
      .then((collections: any) => {
        setCollections(collections);
        setLoading(false);
        console.log(collections);
      })
      .catch((error: any) => {
        console.error('Error fetching collections:', error);
        setLoading(false);
      });
  }, []);


  const renderCollection: any = ({item}: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CollectionDetailsScreen', {collectionId: item.id,  productName: item.title})
      }>
        
      <View style={styles.collectionContainer}>
        {/* Circle with Collection Image */}
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: item.image?.src || 'https://via.placeholder.com/150'}}
            style={styles.avatar}
          />
          <View style={styles.overlay} />
          {/* Collection Name Inside */}
          <Text style={styles.collectionNameInside}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );


  return (
    <ScrollView>
      {
        loadingbar?
      <Modal visible={true}>
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator color="#000" />
        </View>
      </Modal>
      :null
}
      <View >
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ProductList')}>
            <View style={{padding: 12}}>
              <ImageBackground
                height={200}
                width={200}
                source={{
                  uri: 'https://png.pngtree.com/thumb_back/fh260/background/20220929/pngtree-shoes-promotion-banner-background-image_1466238.jpg',
                }}>
                <View
                  style={{
                    padding: 20,
                    height: 120,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}>
                  <Text
                    style={{fontWeight: '500', fontSize: 18, color: 'white'}}>
                    All Product
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

<View style={{justifyContent:"center",alignItems:"center"}}>
        <FlatList
          data={collections}
          renderItem={renderCollection}
          keyExtractor={item => item.id}
          numColumns={3} // Set to display 3 columns
          columnWrapperStyle={styles.rowContainer}
          contentContainerStyle={styles.listContainer}
          showsHorizontalScrollIndicator={false}
        />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 10,
    paddingHorizontal: 8,
  },


  avatarContainer: {
    width: 100,
    height: 100,


    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,


    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  collectionNameInside: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '700',
    zIndex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: {width: 1, height: 1},
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
    // justifyContent:"center",
    // alignItems: "center",
  },
  rowContainer: {
    marginBottom: 16,
  },
  collectionContainer: {
    justifyContent:"center",
    alignItems: 'center',
    marginHorizontal: "2%",
    flex: 1,
    width:"100%",
  },
});


export default CollectionListScreen;