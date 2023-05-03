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
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
