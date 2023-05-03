import {View, Text, Pressable} from 'react-native';
import React from 'react';

import {Box, Button, Input} from 'native-base';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignIn = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
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
          Provide Details
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: colors.grey,
          }}>
          Provide your name and age to continue
        </Text>
      </View>

      <Box mt={10}>
        <Text
          style={{
            fontSize: 20,
            color: colors.dark,

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
            color: colors.dark,

            marginBottom: 10,
          }}>
          Age
        </Text>
        <Input
          height={16}
          borderRadius={15}
          onChangeText={text => setAge(text)}
          size={'xl'}
          InputLeftElement={
            <Icon
              name="user"
              size={30}
              style={{marginHorizontal: 10}}
              color={colors.primary}
            />
          }
          type="number"
          borderColor={colors.primary}
          color="black"
        />
      </Box>
      <Box mt={10}>
        <Button
          onPress={() => {
            navigation.navigate('Main', {
              name: name,
              age: age,
            });
          }}
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
            Proceed
          </Text>
        </Button>
      </Box>
    </View>
  );
};

export default SignIn;
