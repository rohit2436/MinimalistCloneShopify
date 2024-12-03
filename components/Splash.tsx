import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native';

const Splash = () => {
    const navigation:any = useNavigation();


    useEffect(()=>{
        setTimeout(() => {
            navigation.navigate('Home')
        },3000)
    })
  return (
    <View style={{backgroundColor:"black", flex:1, justifyContent:"center",alignItems:"center",zIndex:100,position:'absolute',height:"100%",width:'100%'}}>
      <Text>Splash</Text>
      <LottieView style={{height:100,width:100}} source={require('./shop.json')} autoPlay loop />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})