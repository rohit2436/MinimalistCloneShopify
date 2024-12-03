import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Account = () => {
  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.avatarcontainer}>
              <Text style={styles.avatarText}>US</Text>
            </View>
            <View style={{paddingLeft: 10}}>
              <Text style={{fontSize: 20, fontWeight: 500}}> Hello, User</Text>
              <Text> usertest@gmail.com</Text>
            </View>
          </View>

          <View style={{paddingTop: 20}} />
          <View style={styles.box}>
            <View style={styles.firstImage}>
              <Image
                source={require('./assets/user.png')}
                style={styles.userIcon}
              />
            </View>
            <View style={styles.middleText}>
              <Text style={styles.firstText}>Address Book</Text>
              <Text style={styles.secondText}>Manage your saved addresses</Text>
            </View>
            <View style={styles.rightArrow}>
              <Image
                source={require('./assets/right-arrow.png')}
                style={styles.rightIcon}
              />
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.firstImage}>
              <Image
                source={require('./assets/history.png')}
                style={styles.userIcon}
              />
            </View>
            <View style={styles.middleText}>
              <Text style={styles.firstText}>Order History</Text>
              <Text style={styles.secondText}>View your past orders</Text>
            </View>
            <View style={styles.rightArrow}>
              <Image
                source={require('./assets/right-arrow.png')}
                style={styles.rightIcon}
              />
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.firstImage}>
              <Image
                source={require('./assets/badge.png')}
                style={styles.userIcon}
              />
            </View>
            <View style={styles.middleText}>
              <Text style={styles.firstText}>Rewards</Text>
              <Text style={styles.secondText}>Your rewards and badges</Text>
            </View>
            <View style={styles.rightArrow}>
              <Image
                source={require('./assets/right-arrow.png')}
                style={styles.rightIcon}
              />
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.firstImage}>
              <Image
                source={require('./assets/lock.png')}
                style={styles.userIcon}
              />
            </View>
            <View style={styles.middleText}>
              <Text style={styles.firstText}>Change Password</Text>
              <Text style={styles.secondText}>Edit your password</Text>
            </View>
            <View style={styles.rightArrow}>
              <Image
                source={require('./assets/right-arrow.png')}
                style={styles.rightIcon}
              />
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.firstImage}>
              <Image
                source={require('./assets/headphone.png')}
                style={styles.userIcon}
              />
            </View>
            <View style={styles.middleText}>
              <Text style={styles.firstText}>Get help</Text>
              <Text style={styles.secondText}>
                Talk to our customer support
              </Text>
            </View>
            <View style={styles.rightArrow}>
              <Image
                source={require('./assets/right-arrow.png')}
                style={styles.rightIcon}
              />
            </View>
          </View>
          <Text style={styles.bottomText}>Contact Us</Text>
          <Text style={styles.bottomText}>Return & refund policy</Text>
          <Text style={styles.bottomText}>Privacy Policy</Text>
          <Text style={styles.bottomText}>Track your order</Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: 'brown',
              height: 50,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop:25,
              marginBottom:40
            }}
          >
          <Text style={{fontWeight:500, fontSize:18, color:"brown"}}>Log Out</Text>
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  avatarcontainer: {
    backgroundColor: 'black',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userIcon: {
    width: 30,
    height: 30,
  },
  rightIcon: {
    width: 16,
    height: 16,
  },
  box: {
    flexDirection: 'row',
    backgroundColor: '#E5E4E2',
    height: 80,
    width: '99.99%',
    overflow: 'hidden',
    marginBottom: 20,
  },
  firstImage: {padding: 20, alignItems: 'center', justifyContent: 'center'},
  middleText: {alignItems: 'flex-start', justifyContent: 'center', width: 195},
  firstText: {fontWeight: 400, fontSize: 17, paddingBottom: 5},
  secondText: {color: 'grey'},
  rightArrow: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 86,
  },
  bottomText: {
    fontSize: 17,
    fontWeight: 500,
    padding: 15,
    borderBottomWidth: 0.6,
    marginTop: 10,
  },
});
