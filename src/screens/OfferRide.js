import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

import {styles} from './../style/index';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';
import {
  AddIcon,
  Box,
  Input,
  MinusIcon,
  ScrollView,
  TextArea,
  useToast,
  Fab,
  Center,
  Modal,
  Button,
} from 'native-base';

import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import jwt_decode from 'jwt-decode';
import Wizard from 'react-native-wizard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

const OfferRide = () => {
  const height = Dimensions.get('window').height;
  const toast = useToast();
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [mode, setMode] = useState('date');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pickupLocations, setPickupLocations] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [seats, setSeats] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [car, setCar] = useState([]);
  const [summary, setSummary] = useState('');
  const [picture, setPicture] = useState([]);
  const [amount, setAmount] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [pictureFile, setPictureFile] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState('');
  const [serverError, setServerError] = useState(null);
  const [error404, setError404] = useState(false);
  const [badRequestError, setBadRequestError] = useState(false);
  const [wrongDetails, setWrongDetails] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [price, setPrice] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [driverPic, setDriverPic] = useState('');
  const [loading, setLoading] = useState(false);
  const [dropOffCoords, setDropOffCoords] = useState({});
  const [make, setMake] = useState('');
  const [dropOffLat, setDropOffLat] = useState('');
  const [dropOffLng, setDropOffLng] = useState('');
  const [pickupLat, setPickupLat] = useState('');
  const [pickupLng, setPickupLng] = useState('');
  const [sum1, setSum1] = useState('');

  const styles1 = StyleSheet.create({
    page: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    container: {
      height: 520,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },

    bottomSection: {
      // padding: 20,
      color: '#fff',
      height: 200,

      backgroundColor: '#161B1D',
    },
    bottomSectionBox: {
      backgroundColor: '#389D7B',
      width: 100,
      padding: 5,
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    search1: {
      flex: 1,
      width: 300,
      marginTop: 80,
      position: 'absolute',
      top: 20,
      elevation: 9,
    },
    search2: {
      flex: 1,
      width: 300,
      marginTop: 20,
      position: 'absolute',
      top: 20,
      elevation: 3,
    },
  });

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };
  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime(currentTime);
  };

  const timeout = () => {
    setLoading(false);
    toast.show({
      title: 'Server Connectivity Error',
      status: 'error',
      placement: 'top',
      description: 'Failed to communicate with server',
    });
  };

  const handleUpload = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token, 'token');
      const decodedtoken = jwt_decode(token);
      console.log(decodedtoken, 'decodedtoken');

      setIsLoading(true);

      const requestData = {
        pickup_point: pickupLocations,
        drop_off_location: dropOffLocation,
        seats: quantity,
        summary: sum1,
        driver_id: decodedtoken.id,
        driver: decodedtoken.username,
        make: make,
        pickupLat: pickupLat,
        dropOffLat: dropOffLat,
        pickupLng: pickupLng,
        dropOffLng: dropOffLng,
        date: date.toDateString(),
        time: time.toString(),
        amount: price,
        plate: plateNumber,
        capacity: quantity,
      };

      const response = await axios.post(
        'https://giftride.onrender.com/offer-ride',
        requestData,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      console.log(response.data);

      setIsLoading(false);

      toast.show({
        title: 'Operation Successful',
        status: 'success',
        placement: 'top',
        description: 'Ride has been successfully added',
      });
    } catch (error) {
      setIsLoading(false);
      console.error(error);

      toast.show({
        title: 'Operation Failed',
        status: 'error',
        placement: 'top',
        description: 'Ride could not be added. Please try again later.',
      });
    }
  };

  const stepList = [
    {
      content: (
        <View style={styles1.page}>
          <View style={[styles1.search1, {marginTop: 150}]}>
            <GooglePlacesAutocomplete
              placeholder="Pick Up Location"
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setPickupLat(details.geometry.location.lat);
                setPickupLng(details.geometry.location.lng);
                setPickupLocations(data.structured_formatting.main_text);
              }}
              query={{
                key: 'AIzaSyDIx2D7rmZvZ3KbmCHDVPTdHvX3v1QVr5Y',
                language: 'en',
              }}
              textInputProps={{
                placeholderTextColor: '#BABFC4',
              }}
              styles={{
                textInput: {
                  backgroundColor: '#F6F6F6',
                  borderColor: colors.primary,
                  borderRadius: 10,
                  height: 60,
                  borderWidth: 1,
                },
              }}
            />
            {loading && <ActivityIndicator />}
          </View>
          <View style={[styles1.search2, {marginTop: 20}]}>
            <Text
              style={{
                fontSize: 26,
                color: colors.primary,
                fontFamily: 'Rubik-Bold',
                textAlign: 'center',
                fontWeight: 'bold',
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
              Location Details
            </Text>
            <GooglePlacesAutocomplete
              placeholder="Drop Off Location"
              fetchDetails={true}
              onTimeout={timeout}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(details);
                setDropOffLat(details.geometry.location.lat);
                setDropOffLng(details.geometry.location.lng);
                setDropOffLocation(data.structured_formatting.main_text);
              }}
              query={{
                key: 'AIzaSyDIx2D7rmZvZ3KbmCHDVPTdHvX3v1QVr5Y',
                language: 'en',
                components: 'country:zw',
              }}
              textInputProps={{
                placeholderTextColor: '#BABFC4',
              }}
              styles={{
                textInput: {
                  backgroundColor: '#F6F6F6',
                  borderColor: colors.primary,
                  borderRadius: 10,
                  height: 60,
                  borderWidth: 1,
                },
              }}
            />
          </View>
        </View>
      ),
    },
    {
      content: (
        <ScrollView
          w={Dimensions.get('window').width}
          style={{paddingHorizontal: 20, marginBottom: 100}}>
          <Text
            style={{
              fontSize: 26,
              color: colors.primary,
              fontFamily: 'Rubik-Bold',
              textAlign: 'center',
              fontWeight: 'bold',
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            Vehicle Details
          </Text>
          <Box alignItems="center" style={{marginTop: 5}}>
            <Input
              placeholder="Price"
              style={{
                borderColor: colors.primary,
                borderRadius: 10,
                height: 60,
                color: '#000',
              }}
              borderColor={colors.primary}
              borderRadius={10}
              borderWidth={1}
              color="#000"
              onChangeText={price => setPrice(price)}
            />
          </Box>
          <Box
            style={{
              paddingVertical: 10,
            }}>
            <Text style={{textAlign: 'left', color: '#000', marginBottom: 5}}>
              Number of Seats
            </Text>
            <Box
              alignItems="center"
              style={[
                styles.itemsContainer,
                {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  height: 60,
                  paddingVertical: 15,
                  borderColor: colors.primary,
                  backgroundColor: '#F6F6F6',
                  borderWidth: 1,
                },
              ]}>
              {quantity !== 0 ? (
                <MinusIcon
                  onPress={() => setQuantity(quantity - 1)}
                  color="#005792"
                  size="4"
                  style={{marginTop: -5}}
                />
              ) : (
                <MinusIcon color="#005792" size="4" style={{marginTop: -5}} />
              )}
              <Text style={styles.primaryTextColor}>{quantity}</Text>
              <AddIcon
                onPress={() => setQuantity(quantity + 1)}
                color="#005792"
                size="4"
              />
            </Box>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Box
                alignItems="center"
                style={[
                  styles.itemsContainer,
                  {
                    marginRight: 40,
                    borderColor: colors.primary,
                    borderWidth: 1,
                  },
                ]}>
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={() => setShowDate(true)}>
                  <Text style={styles.secondaryTextColor}>
                    {' '}
                    Date: {date.toLocaleDateString('en-GB')}
                  </Text>
                </TouchableOpacity>
              </Box>
              <Box
                style={[
                  styles.itemsContainer,
                  {borderColor: colors.primary, borderWidth: 1},
                ]}>
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={() => setShowTime(true)}>
                  <Text style={styles.secondaryTextColor}>
                    {' '}
                    Time: {time ? time.toLocaleTimeString() : '00:00:00'}
                  </Text>
                </TouchableOpacity>
              </Box>
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDate}
                />
              )}
              {showTime && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeTime}
                />
              )}
            </Box>
          </Box>

          <Input
            style={{color: '#000'}}
            placeholder="Enter Summary"
            borderColor={colors.primary}
            height={60}
            borderRadius={10}
            borderWidth={1}
            color="#000"
            onChangeText={x => setSum1(x)}
          />
          <Box alignItems="center" style={{marginTop: 10, marginBottom: 10}}>
            <Input
              style={{color: '#000'}}
              placeholder="Car Plate Number"
              borderColor={colors.primary}
              height={60}
              borderRadius={10}
              borderWidth={1}
              color="#000"
              onChangeText={plateNumber => setPlateNumber(plateNumber)}
            />
          </Box>
          <Box>
            <Input
              style={{color: '#000'}}
              placeholder="Car Model or Make"
              height={60}
              borderRadius={10}
              borderColor={colors.primary}
              borderWidth={1}
              color="#000"
              onChangeText={make => setMake(make)}
            />
          </Box>
        </ScrollView>
      ),
    },
  ];

  return (
    <View bg="white" style={{height: height}}>
      <View>
        <Wizard
          ref={wizard}
          steps={stepList}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          onNext={() => {
            console.log('Next Step Called');
          }}
          onPrev={() => {
            console.log('Previous Step Called');
          }}
          currentStep={({currentStep, isLastStep, isFirstStep}) => {
            setCurrentStep(currentStep);
          }}
        />
      </View>
      {!isFirstStep && (
        <Fab
          disabled={isFirstStep}
          renderInPortal={false}
          shadow={2}
          bg={colors.primary}
          size="sm"
          mb={70}
          placement="bottom-left"
          onPress={() => wizard.current.prev()}
          icon={<Icon name="arrowleft" size={20} color="white" />}
        />
      )}

      {!isLastStep && (
        <Fab
          disabled={isLastStep}
          renderInPortal={false}
          shadow={2}
          size="sm"
          bg={colors.primary}
          mb={70}
          placement="bottom-right"
          onPress={() => wizard.current.next()}
          icon={<Icon name="arrowright" size={20} color="white" />}
        />
      )}
      {isLastStep && (
        <Fab
          renderInPortal={false}
          shadow={2}
          size="md"
          bg={colors.primary}
          mb={70}
          w="150"
          placement="bottom-right"
          onPress={handleUpload}
          icon={<Icon name="rocket1" size={20} color="white" />}
          label={isLoading ? 'Loading...' : 'Post    '}
        />
      )}
    </View>
  );
};

export default OfferRide;
