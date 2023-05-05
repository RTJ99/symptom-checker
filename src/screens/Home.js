import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, StatusBar} from 'native-base';
import colors from '../constants/colors';

const Home = ({navigation}) => {
  const height = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
      zIndex: 1,
      height: height,
      marginTop: -1,
    },
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        height: height,
        position: 'relative',
      }}>
      <View style={styles.overlay} />
      <Image
        blurRadius={5}
        source={require('../../assets/white.jpg')}
        alt="house"
        resizeMode="cover"
        style={{
          width: '100%',
          height: height,
        }}
      />
      <View
        style={{
          zIndex: 2,
          backgroundColor: '#fff',
        }}>
        <StatusBar translucent backgroundColor="transparent" />

        <View
          style={{
            backgroundColor: '#fff0',
            padding: 20,
            position: 'absolute',
            bottom: 40,
            width: '100%',
          }}>
          <View
            style={{
              width: '100%',

              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Image
              source={require('../../assets/log.png')}
              alt="logo"
              style={{
                width: 250,
                height: 250,
                margin: 'auto',
                marginTop: 20,
                marginBottom: 20,
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 30,
              fontWeight: '900',
              marginTop: 10,
              paddingHorizontal: 40,
              margin: 'auto',
              color: '#00b894',
              textAlign: 'center',
            }}>
            Gift Ride
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: 'light',
              marginTop: 20,
              paddingHorizontal: 45,
              color: '#00b894',
              textAlign: 'center',
            }}>
            Your go to app for ride sharing.
          </Text>

          {/* make a button */}

          <Button
            onPress={() => navigation.navigate('Name')}
            style={{
              marginTop: 30,
              marginHorizontal: 20,
              backgroundColor: '#00b894',
              borderRadius: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Get Started</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Home;
