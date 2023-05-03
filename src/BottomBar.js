import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import icons from native-base
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './screens/Home';
import SymptomChecker from './screens/SymptomChecker';
import Profile from './screens/Profile';

import {Pressable, View} from 'react-native';
import {Avatar} from 'native-base';
import Symptoms from './screens/Symptoms';
import {useNavigation} from '@react-navigation/native';
import TipsScreen from './screens/Tips';
import HelpScreen from './screens/Help';
import colors from './constants/colors';

const screenOptions = (route, color) => {
  let iconLink;
  let screenName;

  switch (route.name) {
    case 'About':
      iconLink = 'information-circle-sharp';
      screenName = 'About';
      break;
    case 'Help':
      iconLink = 'help-circle';
      screenName = 'Help';
      break;
    case 'Tips':
      iconLink = 'md-bulb';
      screenName = 'Tips';
      break;

    case 'SymptomChecker':
      iconLink = 'ios-search';
      screenName = 'SymptomChecker';
      break;
    default:
      break;
  }

  return <Icon name={iconLink} size={30} color={color} />;
};

const Tab = createBottomTabNavigator();

const Tabs = ({route}) => {
  const {name, age} = route.params;

  const navigation = useNavigation();
  return (
    <Tab.Navigator
      // change the color of the active tab

      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#00b894',
        tabBarInactiveTintColor: '#979db8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        // CHANGE ICON COLOR WHEN ACTIVE

        style: {
          borderTopColor: '#66666666',
          backgroundColor: '#1E2426',
          elevation: 1,
        },
        tabBarIcon: ({color}) => screenOptions(route, color),
      })}>
      <Tab.Screen
        options={{
          headerShown: true,
          headerTitle: `Hello ${name}`,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
          params: {
            name: 'name',
            age: age,
          },
        }}
        name="SymptomChecker"
        component={SymptomChecker}
      />
      <Tab.Screen
        options={{
          headerShown: false,

          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#000',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
        name="Tips"
        component={TipsScreen}
      />

      <Tab.Screen
        options={{headerShown: false}}
        name="Help"
        component={HelpScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,

          params: {
            name: 'name',
            age: age,
          },
        }}
        name="About"
        component={Profile}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
