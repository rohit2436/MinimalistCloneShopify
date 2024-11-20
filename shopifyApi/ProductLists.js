// ProductList.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import client from './shopifyClient';

const ProductLists = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [checkout, setCheckout] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await client.product.fetchAll();
                setProducts(products);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to fetch products'); // Show error message
            }
        };

        fetchProducts();
    }, []);



    // Create a new checkout (cart)
    const createCheckout = async () => {
        try {
            const checkout = await client.checkout.create();
            setCheckout(checkout); // Store the checkout in the state
            console.log('Checkout created:', checkout);
        } catch (error) {
            console.log("Falied Checkout")
        }
    };

    const addLineItem = async () => {
        if (!checkout) {
            console.log("NO checkout is created");
            return;
        }
        else {
            console.log("checkout is created proceed to addline item")
            // gid://shopify/Product/8642470871189
            const checkoutId = 'gid://shopify/Checkout/e3bd71f7248c806f33725a53e33931ef?key=47092e448529068d1be52e5051603af8'; // ID of an existing checkout
            const lineItemsToAdd = [
                {
                    variantId: 'gid://shopify/Product/8642470871189',
                    quantity: 5,
                    customAttributes: [{ key: "MyKey", value: "MyValue" }]
                }
            ];

            // Add an item to the checkout
client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
    // Do something with the updated checkout
    console.log(checkout.lineItems); // Array with one additional line item
  });
        }
    }

    return (
        <View>
            <Text>Product List</Text>
            <Button title='Checkout' onPress={() => createCheckout()} />
            <Button title='Add Line Item' onPress={() => addLineItem()} />
            {error && <Text style={{ color: 'red' }}>{error}</Text>} {/* Display error if any */}
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.id}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default ProductLists;
