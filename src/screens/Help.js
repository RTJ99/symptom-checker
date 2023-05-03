import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {Ionicons} from '@expo/vector-icons';
import colors from '../constants/colors';

const HelpScreen = ({navigation}) => {
  const phoneNumber = '1800-123-4567'; // Replace with your toll-free number

  const handleCallPress = () => {
    // Call the toll-free number
    console.log(`Calling ${phoneNumber}...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../../assets/logogg.png')}
        />
        <Text style={styles.title}>Need help?</Text>
        <Text style={styles.subtitle}>
          Call our toll-free numbers for enquiries
        </Text>
        <Text>Youth helpline 393</Text>
        <Text>All emergencies 999</Text>
        <Text>Police 995</Text>
        <Text>child helpline 116</Text>
        <Text>GBV 575 saywhat</Text>
        <Text>Helpline 577</Text>
        <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
          <Text style={styles.callButtonText}>{phoneNumber}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 60,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 16,
  },
  callButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
});

export default HelpScreen;
