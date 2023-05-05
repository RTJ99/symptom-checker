import {View, Text} from 'react-native';
import React from 'react';
import {Box, Button, Icon, Input} from 'native-base';
import colors from '../constants/colors';
import axios from 'axios';

const OTP = ({navigation, route}) => {
  const {phone} = route.params;
  const [OTP, setOTP] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8080/user/verify-otp',
        {
          phone: phone,
          otp: OTP, // replace with the OTP entered by the user
        },
      );
      if (response.status === 200) {
        alert(response.data.message);
        setLoading(false);
        // OTP verification successful
        console.log(response.data.message);
        navigation.navigate('Name');
      } else {
        setLoading(false);
        // OTP verification failed
        console.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View
      style={{
        padding: 20,
      }}>
      <Text
        style={{
          marginTop: 40,
          fontSize: 30,
          fontWeight: 'bold',
          color: '#000',
        }}>
        Enter OTP sent to your phone
      </Text>
      <Box mt={10}>
        <Text
          style={{
            fontSize: 20,
            color: colors.black,
            marginBottom: 10,
          }}>
          OTP
        </Text>
        <Input
          placeholder="555555"
          height={16}
          borderRadius={15}
          onChangeText={text => setOTP(text)}
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
      <Button
        onPress={verifyOTP}
        style={{
          marginTop: 20,
          borderRadius: 15,
          backgroundColor: colors.primary,
          padding: 10,
        }}>
        <Text
          style={{
            color: colors.white,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Verify OTP
        </Text>
      </Button>
    </View>
  );
};

export default OTP;
