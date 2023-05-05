import {AlertDialog, Box, Button, Divider, Modal} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';
// import {symptoms, conditions} from '../constants/data';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
const AddSymptomScreen = ({navigation}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [tripData, setTripData] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastRideId, setLastRideId] = useState('');

  const [User, setUser] = useState(null);
  const [RideByMe, setRideByMe] = useState(null);
  const [Requests, setRequests] = useState(null);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const logout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };
  // const {name, age} = route.params;
  const [symptom, setSymptom] = useState('');
  const [symps, setSymps] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [condition, setCondition] = useState(null);
  const [selectedConditionScores, setSelectedConditionScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCondtions, setSelectedConditions] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [bookedRides, setBookedRides] = useState([]);
  const [sugs, setSugs] = useState([]);
  useEffect(() => {
    // fetch symptoms from API
    axios
      .get('https://symptoms3.onrender.com/symptoms')
      .then(response => {
        // console.log(response.data, 'response being given');
        setSugs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const getRidebyMe = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token, 'token');
    const decodedtoken = jwt_decode(token);
    console.log(decodedtoken.id, 'yepa ride');
    axios
      .get(`https://giftride.onrender.com/offer-ride/rideby/${decodedtoken.id}`)
      .then(function (response) {
        setRideByMe(response.data);
        const arr = [];
        response.data.forEach(item => {
          if (item.passengers.length > 0) {
            arr.push(item);
          }
        });
        setRequests(arr);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  console.log(Requests, 'requests');
  console.log(RideByMe, 'ride by me');
  console.log(User, 'user');
  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token, 'token');
    const decodedtoken = jwt_decode(token);
    console.log(
      `https://giftride.onrender.com/user/${decodedtoken.id},kkkkkkkk`,
    );
    axios
      .get(`https://giftride.onrender.com/user/${decodedtoken.id}`)
      .then(function (response) {
        setUser(response.data);
        /*  getPassengers(response.data._id);
        setLastRideId(response.data._id);
        setTripData(response.data);

        setFrom(response.data.pickup_point);
        setTo(response.data.drop_off_location);
        setPassengers(response.data.passengers); */
        // handle success
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const getbookedRides = async () => {
    let decodedtoken = await AsyncStorage.getItem('token');
    let id = decodedtoken.id;
    axios
      .get(`https://giftride.onrender.com/booked-ride/${id}`)
      .then(function (response) {
        console.log(response.data);
        setBookedRides(response.data);
        // handle success
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const isVisible = useIsFocused();
  useEffect(() => {
    if (isVisible) {
      console.log('called when screen open or when back on screen ');
      getUserInfo();
      getRidebyMe();
    }
  }, []);
  const AcceptRide = async (rideid, pass, status) => {
    setAcceptLoading(true);

    let id = await AsyncStorage.getItem('id');
    axios
      .post('https://giftride.onrender.com/offer-ride/accept-ride', {
        userId: id,
        id: rideid,
        passengerid: pass,
        status: status,
      })
      .then(function (response) {
        setAcceptLoading(false);
        setUser(response.data);
        Alert.alert('Ride Accepted');
      })
      .catch(function (error) {
        // handle error
        setAcceptLoading(false);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  useEffect(() => {
    // get conditions from api
    axios
      .get('https://symptoms3.onrender.com/conditions')
      .then(response => {
        // console.log(response.data, 'response being given by conditions');
        setConditions(response.data.conditions);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(selectedSymptoms, 'suggestions');

  const handleSuggestionClick = suggestion => {
    setSelectedSymptoms([...selectedSymptoms, suggestion]);
    setSymptom('');
    setSuggestions([]);
  };

  const handleClearSymptoms = () => {
    setSelectedSymptoms([]);
  };

  const symptomLabels = selectedSymptoms.map(symptom => symptom.label);

  console.log(selectedConditionScores, 'selectedSymptoms');

  const handleSubmit = () => {
    setIsLoading(true);
    const symptomLabels = selectedSymptoms.map(symptom => symptom);

    axios
      .post('https://symptoms3.onrender.com/symptoms', {
        symptoms: selectedSymptoms,
      })
      .then(response => {
        console.log(response.data, 'response being given');
        setSelectedConditions(response.data.matched);
        setSymps(response.data.symptoms);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
        console.log(error, 'pppppppp');
        Alert.alert('Error', 'An error occurred while fetching diagnosis.');
      });
  };
  console.log(selectedCondtions, 'selectedSymptoms');
  const handleConditionClick = conditionName => {
    const condition = conditions.find(c => c.name === conditionName);
    if (condition) {
      Alert.alert(`Treatments for ${conditionName}`, condition.treatment);
    }
  };
  console.log(symps, 'sympsvvvvvvvvvvv');
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          paddingHorizontal: 20,
        }}>
        <Pressable
          style={{
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 15,
            marginRight: 5,
            marginBottom: 5,
            height: 100,
            width: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('OfferRide');
          }}>
          <Icon name="car" size={30} color={colors.white} />
          <Text
            style={{
              color: colors.white,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Offer Ride
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 15,
            marginRight: 5,
            marginBottom: 5,
            height: 100,
            width: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('FindRide');
          }}>
          <Icon name="search" size={30} color={colors.white} />
          <Text
            style={{
              color: colors.white,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Find Ride
          </Text>
        </Pressable>
      </View>
      {/* <Box
        w="90%"
        m="auto"
        my="20px"
        bg="#f0f8ff"
        p="3"
        h="50px"
        style={{
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{fontSize: 20, fontFamily: 'DMSans', color: colors.primary}}>
          Rides Created
        </Text>
        <TouchableOpacity
          onPress={async () => {
            await getUserInfo();
            await getRidebyMe();
          }}>
          <Icon name="refresh" size={20} color="gray" />
        </TouchableOpacity>
      </Box> */}
      {/* <Box w="95%" m="auto" borderRadius="15px" p="10px">
        {RideByMe && RideByMe.length > 0 ? (
          RideByMe.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 10,
                borderRadius: 10,
              }}>
              <Divider my="2" bg={'#BABFC4'} />

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Rubik-Bold',
                      fontSize: 14,
                      marginBottom: 15,
                      color: '#233b',
                    }}>
                    From: {item.pickup_point}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Rubik-Bold',
                      fontSize: 14,
                      color: '#233b',
                      marginBottom: 10,
                    }}>
                    To: {item.drop_off_location}
                  </Text>
                </View>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}></Box>
              </View>

              <Divider my="2" bg={'#BABFC4'} />
            </View>
          ))
        ) : (
          <Text
            style={{
              fontSize: 22,
              color: '#c4c3d0',
              textAlign: 'center',
              fontFamily: 'DMSans',
            }}>
            No Created rides
          </Text>
        )}
     
      </Box> */}
      <Box
        w="90%"
        m="auto"
        my="20px"
        bg="#f0f8ff"
        p="3"
        h="50px"
        style={{
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20, fontFamily: 'DMSans', color: '#005792'}}>
          Rides Booked
        </Text>
        <TouchableOpacity
          onPress={async () => {
            await getUserInfo();
            await getRidebyMe();
          }}>
          <Icon name="refresh" size={20} color="gray" />
        </TouchableOpacity>
      </Box>
      {isLoading ? (
        <Text style={{fontSize: 15, fontFamily: 'DMSans', color: '#005792'}}>
          Loading ...
        </Text>
      ) : (
        <Box w="95%" m="auto" borderRadius="15px" p="10px">
          {User && User.booked_rides?.length > 0 ? (
            User.booked_rides?.map((item, index) => (
              <View
                key={index}
                style={{
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Divider my="2" bg={'#BABFC4'} />

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Rubik-Bold',
                        fontSize: 14,
                        marginBottom: 15,
                        color: '#233b',
                      }}>
                      From: {item.from}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Rubik-Bold',
                        fontSize: 14,
                        color: '#233b',
                        marginBottom: 10,
                      }}>
                      To: {item.to}
                    </Text>
                  </View>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      p={1}
                      my={1}
                      onPress={() =>
                        navigation.navigate('Trip Details', {RideId: item.id})
                      }>
                      <Text style={{fontFamily: 'DMSans', color: 'white'}}>
                        {' '}
                        More Details
                      </Text>
                    </Button>
                  </Box>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {/* <Icon name="alpha-b-circle" size={30} color="gray" /> */}
                  <Text>Status</Text>
                  <Text
                    style={{
                      fontFamily: 'OpenSans',
                      fontSize: 14,
                      color: 'orange',
                      marginBottom: 10,
                    }}>
                    {item.status}
                  </Text>
                </View>

                <Divider my="2" bg={'#BABFC4'} />
              </View>
            ))
          ) : (
            <Text
              style={{
                fontSize: 22,
                color: '#c4c3d0',
                textAlign: 'center',

                fontFamily: 'DMSans',
              }}>
              No Booked rides
            </Text>
          )}
          {/* </ImageBackground> */}
        </Box>
      )}
      <Box
        w="90%"
        m="auto"
        my="20px"
        bg="#f0f8ff"
        p="3"
        h="50px"
        style={{
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20, fontFamily: 'DMSans', color: '#005792'}}>
          Requests
        </Text>
        <TouchableOpacity onPress={() => getUserInfo()}>
          <Icon name="refresh" size={20} color="gray" />
        </TouchableOpacity>
      </Box>
      <Box style={{marginTop: -60}} w="95%" borderRadius="15px" p="10px">
        {Requests && Requests.length > 0 ? (
          Requests.map((item, index) => (
            <View
              key={index}
              style={{
                padding: 10,
                borderRadius: 10,
                // backgroundColor: '#f12',
              }}>
              <Box>
                {' '}
                {item.passengers.map((passenger, i) => {
                  return passenger?.status == 'pending' ? (
                    <Box
                      key={i}
                      style={{
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Rubik-Bold',
                          fontSize: 14,
                          marginBottom: 15,
                          color: '#233b',
                        }}>
                        {passenger?.name} {passenger?.seats} seat/s
                      </Text>

                      <Box
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: 170,
                          }}>
                          <TouchableOpacity
                            style={{
                              color: '#fff',
                              backgroundColor: '#005792',
                              padding: 6,

                              borderRadius: 5,
                            }}
                            onPress={() =>
                              AcceptRide(item._id, passenger.id, 'accept')
                            }>
                            <Text style={{color: '#fff'}}>
                              {acceptLoading ? 'Loading...' : 'Accept'}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              color: '#fff',
                              backgroundColor: '#de1738',
                              padding: 6,

                              borderRadius: 5,
                            }}
                            onPress={() =>
                              AcceptRide(item._id, passenger.id, 'reject')
                            }>
                            <Text style={{color: '#fff'}}>
                              {acceptLoading ? 'Loading...' : 'Reject'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Box>
                    </Box>
                  ) : (
                    <></>
                  );
                })}
              </Box>
            </View>
          ))
        ) : (
          <Text
            style={{
              fontSize: 22,
              color: '#c4c3d0',
              textAlign: 'center',
              fontFamily: 'DMSans',
            }}>
            No Requests
          </Text>
        )}
        {/* </ImageBackground> */}
      </Box>

      {tripData ? (
        <Box w="90%" m="auto" bg="#f0f8ff" borderRadius="15px" p="10px">
          <>
            <Text
              style={{fontFamily: 'DMSans', fontSize: 14, color: '#005792'}}>
              Passengers
            </Text>
            <Text style={{fontFamily: 'DMSans', fontSize: 14}}>
              From: {from}
            </Text>
            <Text
              style={{
                fontFamily: 'DMSans',
                fontSize: 14,

                marginBottom: 10,
              }}>
              To: {to}
            </Text>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                onPress={() => navigation.navigate('Trip Details', {tripData})}>
                More Details
              </Button>
              <Button bg="amber.100" w="40%">
                Cancel
              </Button>
            </Box>
          </>

          {/* </ImageBackground> */}
        </Box>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultConditionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultProbability: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00b894',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,

    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  suggestions: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  suggestionText: {
    fontSize: 16,
    paddingVertical: 5,
  },
  selectedSymptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  selectedSymptom: {
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  conditionContainer: {
    marginBottom: 20,
  },
  conditionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  conditionBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchedSymptom: {
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'red',
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  conditionName: {
    marginRight: 10,
    width: 100,
  },
  conditionBar: {
    height: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  conditionBarFill: {
    height: '100%',
    backgroundColor: '#00b894',
  },
  submitButton: {
    backgroundColor: '#00b894',
    padding: 10,
    borderRadius: 20,
  },

  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddSymptomScreen;
