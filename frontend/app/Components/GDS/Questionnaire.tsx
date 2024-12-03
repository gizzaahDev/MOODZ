import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';


const Questionnaire = () => {
  const [answers, setAnswers] = useState(Array(15).fill(null));
const questions = [
  { question: 'Are you basically satisfied with your life?', answers: [{ label: 'Yes', value: 0 }, { label: 'No', value: 1 }] },
  { question: 'Have you dropped many of your activities and interests?', answers: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }] },
  { question: 'Do you feel that your life is empty?', answers: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }] },
  { question: 'Do you often get bored?', answers: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }] },
  { question: 'Are you in good spirits most of the time?', answers: [{ label: 'Yes', value: 0 }, { label: 'No', value: 1 }] },
  { question: 'Are you afraid that something bad is going to happen to you?', answers: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }] },
  { question: 'Do you feel happy most of the time?', answers: [{ label: 'Yes', value: 0 }, { label: 'No', value: 1 }] },
  { question: 'Do you often feel helpless?', answers: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }] },
  { question: 'Do you prefer to stay at home, rather than going out and doing things?', answers: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }] },
  { question: 'Do you feel that you have more problems with memory than most?', answers: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }] },
  { question: 'Do you think it is wonderful to be alive now?', answers: [{ label: 'Yes', value: 0 }, { label: 'No', value: 1 }] },
  { question: 'Do you feel worthless the way you are now?', answers: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }] },
  { question: 'Do you feel full of energy?', answers: [{ label: 'Yes', value: 0 }, { label: 'No', value: 1 }] },
  { question: 'Do you feel that your situation is hopeless?', answers: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }] },
  { question: 'Do you think that most people are better off than you are?', answers: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }] },
];

const handleSelect = (questionKey: number, value: number) => {
  const updatedAnswers = [...answers];
  updatedAnswers[questionKey] = value;
  setAnswers(updatedAnswers);
};

const handleSubmit = async () => {
  // Ensure all questions are answered
  if (answers.includes(null)) {
    Alert.alert('Validation Error', 'Please answer all the questions before submitting.');
    return;
  }

  // Create payload object matching backend structure
  const payload = {
    Q1: answers[0],
    Q2: answers[1],
    Q3: answers[2],
    Q4: answers[3],
    Q5: answers[4],
    Q6: answers[5],
    Q7: answers[6],
    Q8: answers[7],
    Q9: answers[8],
    Q10: answers[9],
    Q11: answers[10],
    Q12: answers[11],
    Q13: answers[12],
    Q14: answers[13],
    Q15: answers[14],
  };

  try {
    // Make POST request to the backend
    const response = await axios.post('http://192.168.8.188:8000/adult/predict', payload);
    
    // Extract and display the predicted depression level
    const prediction = response.data.predicted_depression_level;
    if (prediction) {
      Alert.alert('Prediction Result', `Predicted Category: ${prediction}`);
    } else {
      Alert.alert('Error', 'Prediction result not available.');
    }
  } catch (error) {
    console.error('Error submitting questionnaire:', error);
    Alert.alert('Error', `Failed to connect to the server.`);
  }
};

return (
  <View style={{ flex: 1, padding: 20 }}>
    <Text style={styles.title}>Geriatric Depression Questionnaire</Text>
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      {questions.map((questionObj, questionKey) => (
        <View key={questionKey} style={{ marginBottom: 20 }}>
          <Text style={styles.question}>
            {questionKey + 1}. {questionObj.question}
          </Text>
          {questionObj.answers.map((choice) => (
            <TouchableOpacity
              key={choice.value}
              style={{
                ...styles.answerButton,
                backgroundColor: answers[questionKey] === choice.value ? '#d3d3d3' : '#f0f0f0',
              }}
              onPress={() => handleSelect(questionKey, choice.value)}
            >
              <View
                style={{
                  ...styles.radioCircle,
                  backgroundColor: answers[questionKey] === choice.value ? '#000' : '#fff',
                }}
              />
              <Text>{choice.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      
    </ScrollView>
    <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: answers.includes(null) ? '#ccc' : '#016A70' }]}
        onPress={handleSubmit}
        disabled={answers.includes(null)} // Disable submit if any question is not answered
      >
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
title: {
  fontSize: 25,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
  color:'#016A70'
},
question: {
  marginBottom: 10,
  fontWeight: 'bold',
},
answerButton: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  borderRadius: 5,
  marginBottom: 5,
},
radioCircle: {
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#000',
  marginRight: 10,
},
submitButton: {
  paddingVertical: 15,
  borderRadius: 5,
  marginTop: 0,
  alignItems: 'center',
  marginBottom:10,
},
submitButtonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
});

export default Questionnaire;