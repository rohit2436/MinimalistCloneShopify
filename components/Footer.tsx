
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
    return (
        <View>

            <View style={{ backgroundColor: "black", width: "100%", height: 820, marginBottom: 40, marginTop: 20, padding: 20 }}>

                <Text style={{ color: "white", paddingTop: 40, fontSize: 20, fontWeight: "bold", paddingBottom: 10 }}>About Us</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Our values</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Privacy policy</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Terms & conditions</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Disclaimer</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Corporate Information</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Media Outreach</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Distributor Queries</Text>


                <Text style={{ color: "white", paddingTop: 40, fontSize: 20, fontWeight: "bold", paddingBottom: 10 }}>Quick Links</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Knowledge FAQS</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Return & refund policy</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Track order</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Help</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Center</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Download App</Text>

                <Text style={{ color: "white", paddingTop: 40, fontSize: 20, fontWeight: "bold", paddingBottom: 10 }}>Contact Us</Text>
                <Text style={{ fontSize: 16, color: "white", paddingBottom: 10 }}>Need help fast? Fill out our form or email help@beminimalist.co</Text>




                <View style={{ flexDirection: "row", paddingTop: 20, paddingBottom: 20 }}>
                    <View style={{ paddingRight: 10 }}><Icon name="google" size={30} color="white" /></View>
                    <View style={{ paddingRight: 10 }}><Icon name="instagram" size={30} color="white" /></View>
                    <View style={{ paddingRight: 10 }}><Icon name="facebook" size={30} color="white" /></View>
                    <View><Icon name="youtube" size={30} color="white" /></View>

                </View>

                <Text style={{ fontSize: 16, color: "white", paddingBottom: 20, marginBottom: 50 }}>Copywrite © 2024 Minimalist.</Text>



            </View>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({})

