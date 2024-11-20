import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width: screenWidth } = Dimensions.get('window');

const ImageCarousel = () => {
  const slides = [
    { title: 'Slide 1', image: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg' },
    { title: 'Slide 2', image: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg' },
    { title: 'Slide 3', image: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg' },
  ];

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      autoplay={false}
    //   autoplayTimeout={4}
      loop
    >
      {slides.map((slide, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: slide.image }} style={styles.image} />
          {/* <Text style={styles.text}>{slide.title}</Text> */}
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 250,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  image: {
    // width: screenWidth * 0.8,
    width: screenWidth,
    height: 300,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 20,
  },
});

export default ImageCarousel;



