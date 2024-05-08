import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import {NativeBaseProvider, StatusBar} from 'native-base';
import Houses from './src/screens/SymptomChecker';
import HouseDetails from './src/screens/Details';
import Tabs from './src/BottomBar';
import SymptomChecker from './src/screens/Symptoms';
import SignIn from './src/screens/SignIn';
import Symptoms from './src/screens/Symptoms';
import SignUp from './src/screens/SignUp';
import OTP from './src/screens/OTP';
import OfferRide from './src/screens/OfferRide';
import FindRide from './src/screens/FindRide';
import RideDetails from './src/screens/RideDetails';
import TripDetails from './src/screens/TripDetails';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <NativeBaseProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home">
          <Stack.Screen name="Main" component={Tabs} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="SymptomChecker"
            options={{
              headerShown: false,
              headerTitle: 'Houses',
              headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
            component={Symptoms}
          />
          <Stack.Screen
            name="HouseDetails"
            options={{
              headerShown: true,
              headerTitle: 'House Details',
              headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
            component={HouseDetails}
          />
          <Stack.Screen
            name="Name"
            options={{
              headerShown: true,
              headerTitle: 'Name',
              headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
            component={SignIn}
          />
          <Stack.Screen
            name="SignUp"
            options={{
              headerShown: true,
              headerTitle: 'Sign Up',
              headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
            component={SignUp}
          />
          <Stack.Screen
            name="OTP"
            options={{
              headerShown: true,
              headerTitle: 'OTP',
              headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
            component={OTP}
          />
          <Stack.Screen
            name="OfferRide"
            options={{
              headerShown: true,
              headerTitle: 'Offer Ride',
              headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
            component={OfferRide}
          />
          <Stack.Screen
            name="FindRide"
            options={{
              headerShown: true,
              headerTitle: 'Find Ride',
              headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
            component={FindRide}
          />
          <Stack.Screen
            name="RideDetails"
            options={{
              headerShown: true,
              headerTitle: 'Ride Details',
              headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
            component={RideDetails}
          />
          <Stack.Screen
            name="Trip Details"
            options={{
              headerShown: true,
              headerTitle: 'Trip Details',
              headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
            component={TripDetails}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
