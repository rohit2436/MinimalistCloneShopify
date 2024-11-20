import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const Address = () => {
    
    return (
        <ScrollView>
        <View style={styles.main}>
            <View>
                <Text style={styles.title}>Contact Information</Text>
                <Text style={styles.titleName}>First Name</Text>
                <TextInput placeholder='Enter your first name' style={styles.inputText} />

         
                <Text style={styles.titleName}>Last Name *</Text>
                <TextInput placeholder='Enter your last name' style={styles.inputText} />

                <Text style={styles.titleName}>Phone number *</Text>
                <TextInput placeholder='Enter your phone number' style={styles.inputText} />
            </View>



            <View style={{marginTop:30}}>
                <Text style={styles.title}>Shipping Address</Text>
                <Text style={styles.titleName}>Country *</Text>
                <TextInput placeholder='Enter your first name' style={styles.inputText} />

         
                <Text style={styles.titleName}>PIN code *</Text>
                <TextInput placeholder='Enter your pin code' style={styles.inputText} />

                <Text style={styles.titleName}>City *</Text>
                <TextInput placeholder='Enter PIN code to auto fill city' style={styles.inputText} />

                <Text style={styles.titleName}>State *</Text>
                <TextInput placeholder='Enter PIN code to suto fill province' style={styles.inputText} />

         
                <Text style={styles.titleName}>Address line 1 *</Text>
                <TextInput placeholder='Enter address line 1' style={styles.inputText} />

                <Text style={styles.titleName}>Address line 2</Text>
                <TextInput placeholder='Enter address line 2' style={styles.inputText} />

                <Button title='Save Address' color={"black"}/>
            </View>
        </View>
        </ScrollView>
    )
}

export default Address

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 400,
        marginBottom: 30,
    },
    main: {
        padding: 20
    },
    titleName: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 10
    },
    inputText: {
        height: 50,
        width: "auto",
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        fontSize:18

    }
})