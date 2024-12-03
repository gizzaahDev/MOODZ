import React, { useState } from 'react';
import { View, Text, Button, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const questions = [
    {
        question: 'Finances',
        answers: [
          { label: 'Always Disagree', value: 0 },
          { label: 'Almost Always Disagree', value: 1 },
          { label: 'Frequently Disagree', value: 2 },
          { label: 'Occasionally Disagree', value: 3 },
          { label: 'Almost Always Agree', value: 4 },
          { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Recreation',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Religion',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Affection',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Friends',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Sex Relationship',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Conventionality',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Philosophy',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Parent',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Goals',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Time Spent',
        answers: [
          { label: 'Always Disagree', value: 0 },
          { label: 'Almost Always Disagree', value: 1 },
          { label: 'Frequently Disagree', value: 2 },
          { label: 'Occasionally Disagree', value: 3 },
          { label: 'Almost Always Agree', value: 4 },
          { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Major Decisions',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Household Tasks',
        answers: [
          { label: 'Always Disagree', value: 0 },
          { label: 'Almost Always Disagree', value: 1 },
          { label: 'Frequently Disagree', value: 2 },
          { label: 'Occasionally Disagree', value: 3 },
          { label: 'Almost Always Agree', value: 4 },
          { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Leisure',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Career',
        answers: [
          { label: 'Always Disagree', value: 0 },
          { label: 'Almost Always Disagree', value: 1 },
          { label: 'Frequently Disagree', value: 2 },
          { label: 'Occasionally Disagree', value: 3 },
          { label: 'Almost Always Agree', value: 4 },
          { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Discuss Divorce',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Leave House',
        answers: [
          { label: 'Always Disagree', value: 0 },
          { label: 'Almost Always Disagree', value: 1 },
          { label: 'Frequently Disagree', value: 2 },
          { label: 'Occasionally Disagree', value: 3 },
          { label: 'Almost Always Agree', value: 4 },
          { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Going Well',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Confide',
        answers: [
          { label: 'Always Disagree', value: 0 },
          { label: 'Almost Always Disagree', value: 1 },
          { label: 'Frequently Disagree', value: 2 },
          { label: 'Occasionally Disagree', value: 3 },
          { label: 'Almost Always Agree', value: 4 },
          { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Regret',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Quarrel',
        answers: [
          { label: 'Always Disagree', value: 0 },
          { label: 'Almost Always Disagree', value: 1 },
          { label: 'Frequently Disagree', value: 2 },
          { label: 'Occasionally Disagree', value: 3 },
          { label: 'Almost Always Agree', value: 4 },
          { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Nerves',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Kiss',
        answers: [
          { label: 'Never', value: 0 },
          { label: 'Rearly', value: 1 },
          { label: 'Occasionally', value: 2 },
          { label: 'Almost Everyday', value: 3 },
          { label: 'Everyday', value: 4 },
        ],
      },
      {
        question: 'Outside Interests',
        answers: [
            { label: 'Never', value: 0 },
            { label: 'Rearly', value: 1 },
            { label: 'Occasionally', value: 2 },
            { label: 'Almost Everyday', value: 3 },
            { label: 'Everyday', value: 4 },  
        ],
      },
      {
        question: 'Exchange Ideas',
        answers: [
          { label: 'Always Disagree', value: 0 },
          { label: 'Almost Always Disagree', value: 1 },
          { label: 'Frequently Disagree', value: 2 },
          { label: 'Occasionally Disagree', value: 3 },
          { label: 'Almost Always Agree', value: 4 },
          { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Laugh',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Calm Discussion',
        answers: [
          { label: 'Always Disagree', value: 0 },
          { label: 'Almost Always Disagree', value: 1 },
          { label: 'Frequently Disagree', value: 2 },
          { label: 'Occasionally Disagree', value: 3 },
          { label: 'Almost Always Agree', value: 4 },
          { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Work Together',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
      {
        question: 'Tired Sex',
        answers: [
          { label: 'Yes', value: 0 },
          { label: 'No', value: 1 },
        ],
      },
      {
        question: 'Showing Love',
        answers: [
            { label: 'Yes', value: 0 },
          { label: 'No', value: 1 },
         ],
      },
      {
        question: 'Happiness Level',
        answers: [
            { label: 'Extremely Unhappy', value: 0 },
            { label: 'Fairly Unhappy', value: 1 },
            { label: 'A Little Unhappy', value: 2 },
            { label: 'Happy', value: 3 },
            { label: 'Very Happy', value: 4 },
            { label: 'Extremely Happy', value: 5 },
            { label: 'Perfect', value: 6 },
        ],
      },
      {
        question: 'Future',
        answers: [
            { label: 'Always Disagree', value: 0 },
            { label: 'Almost Always Disagree', value: 1 },
            { label: 'Frequently Disagree', value: 2 },
            { label: 'Occasionally Disagree', value: 3 },
            { label: 'Almost Always Agree', value: 4 },
            { label: 'Always Agree', value: 5 },
        ],
      },
  
];

const Questionnaire = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null)); // Initialize all answers to null

  const handleSelect = (questionIndex: number, value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      Alert.alert('Validation Error', 'Please complete all questions before submitting.');
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
        q11: answers[10],
        q12: answers[11],
        q13: answers[12],
        q14: answers[13],
        q15: answers[14],
        q16: answers[15],
        q17: answers[16],
        q18: answers[17],
        q19: answers[18],
        q20: answers[19],
        q21: answers[20],
        q22: answers[21],
        q23: answers[22],
        q24: answers[23],
        q25: answers[24],
        q26: answers[25],
        q27: answers[26],
        q28: answers[27],
        q29: answers[28],
        q30: answers[29],
        q31: answers[30],
        q32: answers[31]

    };
    try {
      const response = await axios.post('http://192.168.8.188:8000/married/predict', payload); // Replace <server_ip> with your server IP
      Alert.alert('Prediction Result', response.data.prediction_text + '\nTotal Score: ' + response.data.total_score);

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit the questionnaire. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}> 
        <Text style={{  fontSize: 25, fontWeight: 'bold', textAlign: 'center',marginLeft:10,marginRight:10,color:'#016A70' }}> Dyadic Adjustment Questionnaire</Text>
        <ScrollView style={styles.container}>
      {questions.map((item, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{index + 1}.{item.question}</Text>
          {item.answers.map((answer, idx) => (
            <TouchableOpacity
              key={idx}
              style={{flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
                padding: 10,
                backgroundColor: answers[index] === answer.value ? '#d3d3d3' : '#f0f0f0',
                borderRadius: 5,}}
              onPress={() => handleSelect(index, answer.value)}
            >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#000',
                    marginRight: 10,
                    backgroundColor: answers[index] === answer.value ? '#000' : '#fff',
                  }}
                />
              <Text style={styles.answerText}>{answer.label}</Text>
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
  container: { paddingBottom: 60  },
  questionContainer: { marginBottom: 20 },
  questionText: { fontSize: 16, fontWeight: 'bold' },
  answerButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedAnswerButton: {
    backgroundColor: '#007bff',
  },
  answerText: { fontSize: 14 },
  textBtn:{
    color:'#ffffff'
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