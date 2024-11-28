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
} from 'react-native';
import client from '../shopifyApi/shopifyClient';


const CollectionListScreen = ({navigation}: any) => {
  const [collections, setCollections] = useState<any>([]);
  const [loadingbar, setLoading] = useState<any>(true);


  useEffect(() => {
    // Fetch collections with products
    client.collection
      .fetchAllWithProducts()
      .then(collections => {
        setCollections(collections);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching collections:', error);
        setLoading(false);
      });
  }, []);


  const renderCollection: any = ({item}: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CollectionDetailsScreen', {collectionId: item.id})
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
      <View style={{marginBottom: 20}}>
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
                    width: 'auto',
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
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
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
  },
  rowContainer: {
    marginBottom: 16,
  },
  collectionContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginLeft: 33,
    marginBottom: 16,
    flex: 1,
    maxWidth: '33%',
  },
});


export default CollectionListScreen;