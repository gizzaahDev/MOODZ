import React, { useState } from 'react';
import { View, Text, Button, Alert, ScrollView, TouchableOpacity ,StyleSheet} from 'react-native';
import axios from 'axios';

const questions = [
  {
    question: 'I have been able to laugh and see the funny side of things',
    answers: [
      { label: 'As much as I always could', value: 0 },
      { label: 'Not quite so much now', value: 1 },
      { label: 'Definitely not so much now', value: 2 },
      { label: 'Not at all', value: 3 },
    ],
  },
  {
    question: 'I have looked forward with enjoyment to things',
    answers: [
      { label: 'As much as I ever did', value: 0 },
      { label: 'Rather less than I used to', value: 1 },
      { label: 'Definitely less than I used to', value: 2 },
      { label: 'Hardly at all', value: 3 },
    ],
  },
  {
    question: 'I have blamed myself unnecessarily when things went wrong',
    answers: [
      { label: 'Yes, most of the time', value: 3 },
      { label: 'Yes, some of the time', value: 2 },
      { label: 'Not very often', value: 1 },
      { label: 'No, never', value: 0 },
    ],
  },
  {
    question: 'I have been anxious or worried for no good reason',
    answers: [
      { label: 'No, not at all', value: 0 },
      { label: 'Hardly ever', value: 1 },
      { label: 'Yes, sometimes', value: 2 },
      { label: 'Yes, very often', value: 3 },
    ],
  },
  {
    question: 'I have felt scared or panicky for no very good reason',
    answers: [
      { label: 'Yes, quite a lot', value: 3 },
      { label: 'Yes, sometimes', value: 2 },
      { label: 'No, not much', value: 1 },
      { label: 'No, not at all', value: 0 },
    ],
  },
  {
    question: 'Things have been getting on top of me',
    answers: [
      { label: 'Yes, most of the time I haven’t been able to cope at all', value: 3 },
      { label: 'Yes, sometimes I haven’t been coping as well as usual', value: 2 },
      { label: 'No, most of the time I have coped quite well', value: 1 },
      { label: 'No, I have been coping as well as ever', value: 0 },
    ],
  },
  {
    question: 'I have been so unhappy that I have had difficulty sleeping',
    answers: [
      { label: 'Yes, most of the time', value: 3 },
      { label: 'Yes, sometimes', value: 2 },
      { label: 'Not very often', value: 1 },
      { label: 'No, not at all', value: 0 },
    ],
  },
  {
    question: 'I have felt sad or miserable',
    answers: [
      { label: 'Yes, most of the time', value: 3 },
      { label: 'Yes, quite often', value: 2 },
      { label: 'Not very often', value: 1 },
      { label: 'No, not at all', value: 0 },
    ],
  },
  {
    question: 'I have been so unhappy that I have been crying',
    answers: [
      { label: 'Yes, most of the time', value: 3 },
      { label: 'Yes, quite often', value: 2 },
      { label: 'Only occasionally', value: 1 },
      { label: 'No, never', value: 0 },
    ],
  },
  {
    question: 'The thought of harming myself has occurred to me',
    answers: [
      { label: 'Yes, quite often', value: 3 },
      { label: 'Sometimes', value: 2 },
      { label: 'Hardly ever', value: 1 },
      { label: 'Never', value: 0 },
    ],
  },
];

const Questionnaire = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null)); // Default all answers to null (unselected)

  const handleSelect = (questionKey: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionKey] = value; // Update the answer when user selects an option
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    // Check if all questions have been answered
    if (answers.includes(null)) {
      Alert.alert('Validation Error', 'Please answer all the questions before submitting.');
      return;
    }

    const payload = {
      q1: answers[0],
      q2: answers[1],
      q3: answers[2],
      q4: answers[3],
      q5: answers[4],
      q6: answers[5],
      q7: answers[6],
      q8: answers[7],
      q9: answers[8],
      q10: answers[9],
    };

    try {
      const response = await axios.post('http://192.168.8.188:8000/postpartum/predict', payload);

      const prediction = response.data.prediction;
      Alert.alert('Prediction', `Predicted Category: ${prediction}`);
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      Alert.alert('Error', 'Failed to connect to the server.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
    <Text style={styles.title}>Edinburgh Postnatal Depression Questionnaire</Text>
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
        disabled={answers.includes(null)} 
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
