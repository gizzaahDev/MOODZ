import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet, Button, useColorScheme } from 'react-native';

// Array of questions with their descriptive answer choices and numerical values
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

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  buttonBackground: '#f0f0f0',
  selectedButtonBackground: '#d3d3d3',
};

const darkTheme = {
  background: '#121212',
  text: '#ffffff',
  buttonBackground: '#1e1e1e',
  selectedButtonBackground: '#333333',
};

const App = () => {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const handleSelect = (questionKey: string, value: number) => {
    setAnswers({ ...answers, [questionKey]: value });
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      Alert.alert('Incomplete', 'Please answer all questions.');
      return;
    }

    const payload = {
      q1: answers.q1 || 0,
      q2: answers.q2 || 0,
      q3: answers.q3 || 0,
      q4: answers.q4 || 0,
      q5: answers.q5 || 0,
      q6: answers.q6 || 0,
      q7: answers.q7 || 0,
      q8: answers.q8 || 0,
      q9: answers.q9 || 0,
      q10: answers.q10 || 0,
    };

    try {
      const response = await fetch('http://192.168.8.188:8000/api/predictEPDS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      Alert.alert('Prediction Result', data.prediction_text);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to connect to the backend.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.questionContainer , { backgroundColor: theme.background ,padding: 20}]}>
        <Text style={[styles.header, { color: theme.text }]}>EPDS Questionnaire</Text>
        {questions.map((questionObj, index) => {
          const questionKey = `q${index + 1}`;
          return (
            <View key={questionKey} style={styles.questionContainer}>
              <Text style={[styles.questionText, { color: theme.text }]}>
                {index + 1}. {questionObj.question}
              </Text>
              {questionObj.answers.map(choice => (
                <TouchableOpacity
                  key={choice.value}
                  style={[
                    styles.answerButton,
                    { backgroundColor: theme.buttonBackground },
                    answers[questionKey] === choice.value && { backgroundColor: theme.selectedButtonBackground },
                  ]}
                  onPress={() => handleSelect(questionKey, choice.value)}
                >
                  <Text style={[styles.answerText, { color: theme.text }]}>{choice.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
        <Button title="Submit" onPress={handleSubmit} 
        // color={theme.text} 
        
        />
      </ScrollView>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  answerButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  answerText: {
    fontSize: 16,
  },
});

export default App;
