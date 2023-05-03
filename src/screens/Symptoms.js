import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSymptomSubmit = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('https://symptoms3.onrender.com/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({symptoms: symptoms}),
      });

      const data = await res.json();
      console.log(data, 'JJJJJJJJJJ');
      setResponse(data);
    } catch (error) {
      console.error(error, 'YYYYYYYYYY');
    }

    setIsLoading(false);
  };

  return (
    <View>
      <TextInput
        placeholder="Enter your symptoms separated by commas"
        onChangeText={text => setSymptoms(text)}
        value={symptoms}
      />
      <Button title="Check symptoms" onPress={handleSymptomSubmit} />
      {isLoading && <Text>Loading...</Text>}
      {response && (
        <View>
          <Text>Matched conditions:</Text>
          <ul>
            {response.matched.map(condition => (
              <li key={condition.name}>
                {condition.name} ({condition.percentage}% match)
                {condition.treatment && ` - ${condition.treatment}`}
              </li>
            ))}
          </ul>
          <Text>Unmatched symptoms:</Text>
          <ul>
            {response.unmatched.map(symptom => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
        </View>
      )}
    </View>
  );
}
