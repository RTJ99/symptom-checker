import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {Button, Input, ScrollView, useToast, Divider, Box} from 'native-base';
import {styles} from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../constants/colors';
import jwt_decode from 'jwt-decode';

const RideDetails = ({route, navigation}) => {
  const [seatsNeeded, setSeatsNeeded] = useState(1);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    rideId,
    driver,
    phone,
    car,
    plate,
    model,
    seats,
    price,
    pickup,
    dropoff,
    date,
    driverPic,
    time,
    preferences,
    summary,
  } = route.params;
  console.log(preferences);
  const handleUpload = async e => {
    const token = await AsyncStorage.getItem('token');
    console.log(token, 'token');
    const decodedtoken = jwt_decode(token);

    // e.preventDefault();
    // localStorage.setItem("token", response.tokenObj.id_token);
    setIsLoading(true);
    const data = JSON.stringify({
      userId: decodedtoken.id,
      rideId: rideId,
      seatsNeeded: seatsNeeded,
    });

    console.log(data, 'dataaa');
    await fetch('https://giftride.onrender.com/offer-ride/book', {
      method: 'POST',
      body: data,
      redirect: 'follow',
      headers: {
        Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(data, 'dataaa');
        console.log(json, 'json');
        setIsLoading(false);
        toast.show({
          title: 'Operation Sucessfull',
          status: 'success',
          placement: 'top',
          description: 'Ride has been successfully added',
        });
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);

        toast.show({
          title: 'Server Connectivity Error',
          status: 'error',
          placement: 'top',
          description: 'Failed to communicate with server',
        });
      });
  };

  return (
    <ScrollView style={{paddingHorizontal: 10}}>
      <View>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 10,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.primary,
              fontFamily: 'Rubik-Bold',
              textAlign: 'center',
              marginHorizontal: 20,
              marginVertical: 6,
            }}>
            {driver}
          </Text>
          <Divider w="80%" my="2" bg={'#BABFC4'} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.primary,
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: 6,
                }}>
                1
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.primary,
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: 6,
                }}>
                Ride/s
              </Text>
            </View>
            <Divider
              orientation="vertical"
              w="1px"
              h={6}
              my="2"
              bg={'#BABFC4'}
            />
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.primary,
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: 6,
                }}>
                0
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.primary,
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: 6,
                }}>
                Passangers
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontSize: 16,
            color: colors.primary,
            fontFamily: 'Rubik-Bold',
            textAlign: 'center',
            marginHorizontal: 20,
            marginVertical: 6,
          }}>
          Vehicle Details
        </Text>

        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Make:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {model}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Plate Number:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {plate}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <Text
          style={{
            fontSize: 16,
            color: colors.primary,
            fontFamily: 'Rubik-Bold',
            textAlign: 'center',
            marginHorizontal: 20,
            marginVertical: 6,
          }}>
          Trip Details
        </Text>
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Seats Available:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {seats}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Price:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {price}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                From:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {pickup}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                To:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {dropoff}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Trip Date:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {date}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}></View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />
        <View
          style={{
            padding: 5,
            borderRadius: 10,
          }}>
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
                  marginBottom: 5,
                  color: '#233b',
                }}>
                Summary of Vehicle:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#2C3539',
                  fontFamily: 'DMSans',
                }}>
                {summary}
              </Text>
            </View>
          </View>
        </View>
        <Divider my="2" bg={'#BABFC4'} />

        <Box alignItems="center" style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'Rubik-Bold',
              fontSize: 14,
              marginBottom: 5,
              color: '#233b',
            }}>
            Enter Seats Needed
          </Text>
          <Input
            type="number"
            placeholder="SeatsNeeded"
            w="320px"
            maxWidth="300px"
            borderColor={'#233b'}
            borderWidth={1}
            color="#000"
            onChangeText={data => setSeatsNeeded(data)}
          />
        </Box>

        <Box display="flex" mb={10} style={{flexDirection: 'row'}}>
          <Button
            isLoading={isLoading}
            isLoadingText="Sending..."
            onPress={handleUpload}
            w="35%"
            style={[styles.primaryButton, {marginTop: 15}]}
            m="auto">
            <Text style={{fontFamily: 'DMSans', color: 'white'}}>
              {' '}
              Book Ride
            </Text>
          </Button>
        </Box>
      </View>
    </ScrollView>
  );
};

export default RideDetails;
