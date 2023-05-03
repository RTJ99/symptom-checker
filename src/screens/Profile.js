import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/bggg.jpeg')}
        style={styles.coverImage}
      />
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/logogg.png')}
          style={styles.profilePic}
        />
        <Text style={styles.name}>Medical Symptom Checker</Text>
        <Text style={styles.location}>V1.0</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>About App</Text>
        <Text style={styles.description}>
          This app is a medical symptom checker that helps you to check your
          symptoms and get the best possible medical advice.
        </Text>
        <Text style={styles.label}>Update</Text>
        <Text style={styles.movies}>
          Download the latest update on playstore to keep your app up to date.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    height: 200,
    width: '100%',
  },
  profileContainer: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  name: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: colors.dark,
  },
  info: {
    marginTop: 160,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: colors.dark,
  },
  movies: {
    fontSize: 16,
  },
});

export default ProfilePage;
