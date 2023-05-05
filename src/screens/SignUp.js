import {View, Text, Pressable} from 'react-native';
import React from 'react';

import {Box, Button, Input} from 'native-base';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  AddIcon,
  MinusIcon,
  ScrollView,
  TextArea,
  useToast,
  Modal,
  Center,
  Fab,
  KeyboardAvoidingView,
} from 'native-base';
import {
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const SignIn = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    axios
      .post('https://giftride.onrender.com/user/register', {
        name,
        email,
        phone,
        password,
        address,
      })
      .then(res => {
        setLoading(false);
        console.log(res.data);
        navigation.navigate('OTP', {
          phone: phone,
        });
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <ScrollView
      style={{
        padding: 20,
      }}>
      <View>
        <Text
          style={{
            marginTop: 40,
            fontSize: 30,
            fontWeight: 'bold',
            color: '#000',
          }}>
          Sign Up
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: colors.grey,
          }}>
          Login to your account using email and password provided during
        </Text>
      </View>
      <Box mt={10}>
        <Text
          style={{
            fontSize: 20,
            color: colors.black,
            marginBottom: 10,
          }}>
          Full Name
        </Text>
        <Input
          placeholder="Jonh Doe"
          height={16}
          borderRadius={15}
          onChangeText={text => setName(text)}
          size={'xl'}
          InputLeftElement={
            <Icon
              name="user"
              size={30}
              style={{marginHorizontal: 10}}
              color={colors.primary}
            />
          }
          type="text"
          borderColor={colors.primary}
          color="black"
        />
      </Box>

      <Box mt={10}>
        <Text
          style={{
            fontSize: 20,
            color: colors.black,

            marginBottom: 10,
          }}>
          Email
        </Text>
        <Input
          placeholder="user@example.com"
          height={16}
          borderRadius={15}
          size={'xl'}
          onChangeText={text => setEmail(text)}
          InputLeftElement={
            <Icon
              name="user"
              size={30}
              style={{marginHorizontal: 10}}
              color={colors.primary}
            />
          }
          type="text"
          borderColor={colors.primary}
          color="black"
        />
      </Box>
      <Box mt={10}>
        <Text
          style={{
            fontSize: 20,
            color: colors.black,

            marginBottom: 10,
          }}>
          Phone Number
        </Text>
        <Input
          placeholder="+26378833333"
          height={16}
          borderRadius={15}
          size={'xl'}
          onChangeText={text => setPhone(text)}
          InputLeftElement={
            <Icon
              name="phone"
              size={30}
              style={{marginHorizontal: 10}}
              color={colors.primary}
            />
          }
          type="text"
          borderColor={colors.primary}
          color="black"
        />
      </Box>
      <Box mt={10}>
        <Text
          style={{
            fontSize: 20,
            color: colors.black,
            marginBottom: 10,
          }}>
          Address
        </Text>
        <Input
          placeholder="Harare"
          height={16}
          borderRadius={15}
          size={'xl'}
          onChangeText={text => setAddress(text)}
          InputLeftElement={
            <Icon
              name="location-arrow"
              size={30}
              style={{marginHorizontal: 10}}
              color={colors.primary}
            />
          }
          type="text"
          borderColor={colors.primary}
          color="black"
        />
      </Box>

      <Box mt={10}>
        <Text
          style={{
            fontSize: 20,
            color: colors.black,

            marginBottom: 10,
          }}>
          Password
        </Text>
        <Input
          height={16}
          borderRadius={15}
          size={'xl'}
          onChangeText={text => setPassword(text)}
          InputLeftElement={
            <Icon
              name="lock"
              size={30}
              style={{marginHorizontal: 10}}
              color={colors.primary}
            />
          }
          type="password"
          borderColor={colors.primary}
          color="black"
        />
      </Box>
      <Box mt={10}>
        <Text
          style={{
            fontSize: 20,
            color: colors.black,

            marginBottom: 10,
          }}>
          Confirm Password
        </Text>
        <Input
          height={16}
          borderRadius={15}
          size={'xl'}
          InputLeftElement={
            <Icon
              name="lock"
              size={30}
              style={{marginHorizontal: 10}}
              color={colors.primary}
            />
          }
          type="password"
          borderColor={colors.primary}
          color="black"
        />
      </Box>
      <Box mt={10}>
        <Button
          onPress={handleRegister}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 15,
            height: 50,
          }}>
          <Text
            style={{
              color: colors.black,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {loading ? 'loading...' : 'Sign Up'}
          </Text>
        </Button>
      </Box>
      <Box
        mt={10}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={
            // open modal
            () => {
              navigation.navigate('SignIn');
            }
          }>
          <Text
            style={{
              fontSize: 15,
              color: colors.primary,
            }}>
            Already have an account?
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          <Text
            style={{
              fontSize: 15,
              color: colors.white,
            }}>
            Sign In
          </Text>
        </Pressable>
      </Box>
    </ScrollView>
  );
};

export default SignIn;
