import {View, Text, Pressable, Alert} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Box, Button, Input} from 'native-base';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const SignIn = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://giftride.onrender.com/user/login',
        {
          email,
          password,
        },
      );

      // Assuming the server responds with a JWT token
      const token = response.data.token;

      // Do something with the token, such as storing it in AsyncStorage
      AsyncStorage.setItem('token', token);

      // Navigate to the main screen

      navigation.navigate('Main');

      setLoading(false);
    } catch (error) {
      console.error(error.response.data.message);
      Alert.alert('Error', error.response.data.message);
    }
  };
  return (
    <View
      style={{
        padding: 20,
      }}>
      <View>
        <Text
          style={{
            marginTop: 40,
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.dark,
          }}>
          Sign in
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: colors.grey,
          }}>
          Provide your email and password to continue
        </Text>
      </View>

      <Box mt={10}>
        <Text
          style={{
            fontSize: 20,
            color: colors.dark,

            marginBottom: 10,
          }}>
          Email
        </Text>
        <Input
          placeholder="Jonh@gmail.com"
          height={16}
          borderRadius={15}
          onChangeText={text => setEmail(text)}
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
            color: colors.dark,

            marginBottom: 10,
          }}>
          Password
        </Text>
        <Input
          height={16}
          borderRadius={15}
          onChangeText={text => setPassword(text)}
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
      <Pressable
        onPress={() => navigation.navigate('SignUp')}
        style={{color: 'black', marginTop: 20}}>
        <Text>Dont have an account? Register</Text>
      </Pressable>
      <Box mt={10}>
        <Button
          onPress={handleLogin}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 15,
            height: 50,
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {loading ? 'Loading...' : 'Login'}
          </Text>
        </Button>
      </Box>
    </View>
  );
};

export default SignIn;
