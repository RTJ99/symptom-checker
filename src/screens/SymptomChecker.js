import {Button} from 'native-base';
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
} from 'react-native';
import colors from '../constants/colors';
// import {symptoms, conditions} from '../constants/data';
import axios from 'axios';
const AddSymptomScreen = ({route}) => {
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
  const [sugs, setSugs] = useState([]);
  useEffect(() => {
    // fetch symptoms from API
    axios
      .get('https://symptoms3.onrender.com/symptoms')
      .then(response => {
        console.log(response.data, 'response being given');
        setSugs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const handleInputChange = value => {
    setSymptom(value);
    if (value) {
      const matchedSymptoms = sugs.filter(sug =>
        sug.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(matchedSymptoms);
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    // get conditions from api
    axios
      .get('https://symptoms3.onrender.com/conditions')
      .then(response => {
        console.log(response.data, 'response being given by conditions');
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

        <Text style={styles.title}>Add Symptom</Text>
      </View>
      <View
        style={{
          padding: 20,
        }}>
        <TextInput
          style={styles.input}
          value={symptom}
          onChangeText={handleInputChange}
          placeholder="Enter symptom"
          placeholderTextColor={colors.gray}
          color={colors.black}
        />
        {suggestions.length > 0 && (
          <View style={styles.suggestions}>
            {suggestions.map(suggestion => (
              <TouchableOpacity
                key={suggestion.value}
                onPress={() => handleSuggestionClick(suggestion)}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.selectedSymptomsContainer}>
          {selectedSymptoms.map((symptom, index) => (
            <View key={index} style={styles.selectedSymptom}>
              <Text>{symptom}</Text>
            </View>
          ))}
        </View>
        <Button onPress={handleClearSymptoms} variant="ghost">
          Clear Symptoms
        </Button>

        <View style={styles.resultContainer}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>
                <ActivityIndicator size="large" color="#00ff00" />
              </Text>
            </View>
          )}

          <Text
            style={{
              color: '#00b894',
            }}>
            Results
          </Text>
          {selectedCondtions.map((condition, index) => (
            <View>
              <TouchableOpacity
                key={index}
                style={styles.resultRow}
                onPress={() => handleConditionClick(condition.name)}>
                <Text style={styles.resultConditionName}>{condition.name}</Text>
                <Text style={styles.resultProbability}>
                  {condition.percentage}%
                </Text>
              </TouchableOpacity>
              <View style={styles.resultRow}>
                <View key={index} style={styles.selectedSymptom}>
                  <Text style={styles.matchedSymptoms}>
                    Matched symptoms: {condition.symptoms.join(', ')}
                  </Text>
                  {condition.unmatchedSymptoms && (
                    <Text style={styles.unmatchedSymptoms}>
                      Unmatched symptoms:{' '}
                      {condition.unmatchedSymptoms.join(', ')}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    // padding: 30,
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
