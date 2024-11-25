import { Image, StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AirbnbRating } from 'react-native-ratings';
import client from "../shopifyApi/shopifyClient";
import { useNavigation } from '@react-navigation/native';

const BestSellers = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const productIds = [
    'gid://shopify/Product/8642469527701', // Product 1
    'gid://shopify/Product/8642470477973', // Product 2
  ];

  useEffect(() => {
    // Fetch products in parallel
    Promise.all(productIds.map((id) => client.product.fetch(id)))
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
        setLoading(false); // Stop loading after fetch
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View>
      <Text style={{ textAlign: "left", fontWeight: "500", fontSize: 20, paddingLeft: 20 }}>
        Our Best Sellers
      </Text>

      <View style={{ flexDirection: "row" }}>
        {/* Check if products are loaded */}
        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>
        ) : (
          products.map((product, index) => (
            <View key={index} style={{ height: 500, width: "50%", padding: 10 }}>
              <Image
                style={{ width: "100%", height: 200 }}
                source={{ uri: product.images[0]?.src || "https://via.placeholder.com/200" }}
              />
              <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: "500", textAlign: "left" }}>
                {product.title}
              </Text>
              <View style={{ alignItems: "flex-start", paddingTop: 15,paddingBottom:20 }}>
                <AirbnbRating
                  size={18}
                  showRating={false}
                  selectedColor='black'
                  defaultRating={5}
                  isDisabled={true}
                />
              </View>
              {/* <Text style={{ fontSize: 15, paddingTop: 20, paddingBottom: 20 }}>
                {'\u20B9'} {product.variants?.edges[0]?.node?.price || product.priceRange|| "N/A"}
              </Text> */}
              
              <Button color={"black"} title='See Details'
         onPress={() => navigation.navigate('ProductDetailsScreen', { productId: product.id })}
        />
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default BestSellers;

const styles = StyleSheet.create({});
