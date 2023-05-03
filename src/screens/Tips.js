import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';

const TipsScreen = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   fetch('https://symptoms3.onrender.com/tips')
  //     .then(response => response.json())
  //     .then(data => setTips(data.tips.tips))
  //     .catch(error => console.error(error));
  // }, []);

  // get tips from api using axios

  useEffect(() => {
    async function fetchConditions() {
      try {
        setLoading(true);
        const response = await fetch('https://symptoms3.onrender.com/tips');
        const data = await response.json();
        setTips(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchConditions();
  }, []);

  console.log(tips?.tips, 'tips');

  const tipss = [
    {
      title: 'Stay Hydrated',
      description:
        'Drink at least 8 cups of water a day to keep your body hydrated and functioning properly.',
      category: 'General Health',
    },
    {
      title: 'Exercise Regularly',
      description:
        'Try to get at least 30 minutes of exercise every day to improve your overall health and well-being.',
      category: 'Fitness',
    },
    {
      title: 'Get Enough Sleep',
      description:
        'Make sure to get 7-9 hours of sleep every night to give your body the rest it needs to function properly.',
      category: 'Sleep',
    },
    {
      title: 'Eat a Balanced Diet',
      description:
        'Aim to eat a variety of foods from all food groups to get the nutrients your body needs to stay healthy.',
      category: 'Nutrition',
    },
    {
      title: 'Wash Your Hands',
      description:
        'Wash your hands frequently with soap and water or use hand sanitizer to prevent the spread of germs.',
      category: 'Hygiene',
    },
  ];

  const renderTip = ({item}) => (
    <View style={styles.tipContainer}>
      <Text style={styles.tipTitle}>{item.name}</Text>
      <Text style={styles.tipDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#00b894',
          padding: 20,
          // make it rounded at the bottom
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          height: 200,
        }}>
        <Image
          source={require('../../assets/sympt.png')}
          style={{width: 130, height: 130, alignSelf: 'center'}}
        />

        <Text style={styles.heading}>Health Tips</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View
          style={{
            padding: 20,
          }}>
          <FlatList
            data={tips?.tips}
            renderItem={renderTip}
            keyExtractor={item => item._id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  tipContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 16,
  },
});

export default TipsScreen;
