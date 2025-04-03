import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated, Image, Alert } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const DASquiz2 = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();
  const buttonScale = new Animated.Value(1);

  const questions = [
    "What is one thing your partner did this week that made you smile?",
    "What is a small habit of your partner that you find adorable? ",
    "What is your favorite memory with your partner?",
    "What was the last time your partner suprised you in good way?",
    "What is something your partner did recently that made you feel loved?",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [showResult, setShowResult] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation for summary

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion].trim() === '') {
      
      Alert.alert(
        "Please Enter the Answer",
        "You cannot proceed without entering an answer.",
        [
          {
            text: "OK",
            onPress: () => {
              
            },
          },
        ]
      );
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
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
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: "#F3FAF4" }]}>
        {!showResult ? (
          <>
            <Text style={[styles.title, { color: theme.textColor }]}>Gratitude Moments Quiz</Text>
            <Image
              source={require('../../../assets/images/marital.png')} 
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={[styles.question, { color: theme.textColor }]}>{questions[currentQuestion]}</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
              placeholder="Type your answer here..."
              placeholderTextColor="#888"
              onChangeText={(text) => handleAnswer(text)}
              value={answers[currentQuestion]}
            />
            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: '#016A70' }]}
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
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={[styles.title, { color: theme.textColor }]}>Your Gratitude Moments 🌟</Text>
            {answers.map((answer, index) => (
              <View key={index} style={styles.answerContainer}>
                <Text style={[styles.question, { color: theme.textColor }]}>{questions[index]}</Text>
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
          </Animated.View>
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
    height: 350,
    marginBottom: 60,
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  nextButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#FFF',
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

export default DASquiz2;