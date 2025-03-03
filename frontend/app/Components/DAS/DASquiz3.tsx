import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Image } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const DASquiz3 = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();
  const buttonScale = new Animated.Value(1);

  const questions = [
    {
      question: "Would you rather go on a surprise trip or receive a thoughtful gift?",
      options: ["Surprise Trip", "Thoughtful Gift"],
    },
    {
      question: "Would you rather cook dinner together or order takeout?",
      options: ["Cook Dinner", "Order Takeout"],
    },
    {
      question: "Would you rather watch a movie or go for a walk?",
      options: ["Watch a Movie", "Go for a Walk"],
    },
    {
      question: "Would you rather have a picnic or go to a fancy restaurant?",
      options: ["Picnic", "Fancy Restaurant"],
    },
    {
      question: "Would you rather dance in the rain or watch the sunset?",
      options: ["Dance in the Rain", "Watch the Sunset"],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(''));
    setShowResult(false);
  };

  const handleHomePress = () => {
    router.replace("/Components/DAS/DASday4");
  };

  return (
    <FontLoader>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {!showResult ? (
          <>
            <Text style={[styles.title, { color: theme.textColor }]}>Would You Rather? Couple Edition 😂</Text>
            <Image
              source={require('../../../assets/images/marital.png')} 
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={[styles.question, { color: theme.textColor }]}>{questions[currentQuestion].question}</Text>
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.optionButton, { backgroundColor: index === 0 ? '#016A70' : '#016A70' }]}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: 'black' }]}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.progress, { color: theme.textColor }]}>
              Question {currentQuestion + 1} of {questions.length}
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.title, { color: theme.textColor }]}>Your Would You Rather Results 😂</Text>
            {answers.map((answer, index) => (
              <View key={index} style={styles.answerContainer}>
                <Text style={[styles.question, { color: theme.textColor }]}>{questions[index].question}</Text>
                <Text style={[styles.answer, { color: theme.textColor }]}>{answer}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: '#016A70' }]}
              onPress={handleRestart}
            >
              <Text style={styles.nextButtonText}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.homeButton, { backgroundColor: 'black' }]}
              onPress={handleHomePress}
            >
              <Text style={styles.homeButtonText}>Back</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progress: {
    fontSize: 16,
    textAlign: 'center',
  },
  answerContainer: {
    marginBottom: 20,
  },
  answer: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  homeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DASquiz3;