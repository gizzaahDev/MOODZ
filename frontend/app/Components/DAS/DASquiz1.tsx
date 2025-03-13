import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const DASquiz1 = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();
  const buttonScale = new Animated.Value(1);

  const questions = [
    {
      question: "What is the universal color of love?",
      options: ["Blue", "Green", "Red", "Yellow"],
      correctAnswer: "Red",
    },
    {
      question: "What is the most commonly exchanged item on Valentine's Day?",
      options: ["Books", "Roses", "Shoes", "Toys"],
      correctAnswer: "Roses",
    },
    {
      question: "Which drink is commonly used for romantic toasts?",
      options: ["Water", "Champagne", "Tea", "Soda"],
      correctAnswer: "Champagne",
    },
    {
      question: "What is the traditional jewelry piece given during a marriage proposal?",
      options: ["Bracelet", "Earrings", "Necklace", "Ring"],
      correctAnswer: "Ring",
    },
    {
      question: "Which symbol represents love the most?",
      options: ["Star", "Heart", "Square", "Circle"],
      correctAnswer: "Heart",
    },
    {
      question: "What is the most common shape of a wedding cake?",
      options: ["Triangle", "Square", "Round", "Hexagon"],
      correctAnswer: "Round",
    },
    {
      question: "Which month is commonly associated with love and romance?",
      options: ["January", "February", "March", "April"],
      correctAnswer: "February",
    },
    {
      question: "What is the most common romantic gesture?",
      options: ["Shaking hands", "Giving flowers", "High five", "Nodding"],
      correctAnswer: "Giving flowers",
    },
    {
      question: "What is the most popular honeymoon destination type?",
      options: ["Desert", "Beach", "Factory", "Jungle"],
      correctAnswer: "Beach",
    },
    {
      question: "What is the most common phrase used to express love?",
      options: ["See you soon", "Take care", "I love you", "Good morning"],
      correctAnswer: "I love you",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const popupScale = useRef(new Animated.Value(0)).current;

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = option;
    setSelectedAnswers(newSelectedAnswers);
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowPopup(true);
    animatePopup();
  };

  const animatePopup = () => {
    popupScale.setValue(0); // Reset scale to 0
    Animated.timing(popupScale, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1.5),
      useNativeDriver: true,
    }).start();
  };

  const handlePopupClose = (action: string) => {
    Animated.timing(popupScale, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setShowPopup(false);
      if (action === 'tryAgain') {
        router.replace("/Components/DAS/DASquiz1");
      } else if (action === 'navigate') {
        router.replace("/Components/DAS/DASday4");
      }
    });
  };

  const handleHomePress = () => {
    router.replace("/Components/DAS/DASday4");
  };

  return (
    <FontLoader>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
          <Text style={[styles.title, { color: theme.textColor }]}>Love Wisdom Quiz</Text>

          {questions.map((question, questionIndex) => (
            <View key={questionIndex} style={styles.questionContainer}>
              <Text style={[styles.questionText, { color: theme.textColor }]}>{question.question}</Text>
              {question.options.map((option, optionIndex) => (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    styles.optionButton,
                    selectedAnswers[questionIndex] === option && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswerSelect(questionIndex, option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity style={styles.submitButton} onPress={calculateScore}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
            <Text style={styles.homeButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>

        {showPopup && (
          <View style={styles.popupOverlay}>
            <Animated.View
              style={[
                styles.popupContainer,
                { transform: [{ scale: popupScale }] },
              ]}
            >
              <Text style={styles.popupTitle}>Love Wisdom Quiz Results:</Text>
              <Text style={styles.popupText}>You scored {score} out of {questions.length}!</Text>
              <View style={styles.popupButtonContainer}>
                <TouchableOpacity
                  style={styles.popupButton}
                  onPress={() => handlePopupClose('tryAgain')}
                >
                  <Text style={styles.popupButtonText}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.popupButton}
                  onPress={() => handlePopupClose('navigate')}
                >
                  <Text style={styles.popupButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        )}
      </View>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#9DC183',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#016A70',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#016A70',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  popupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  popupButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#016A70',
    borderRadius: 5,
    alignItems: 'center',
  },
  popupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DASquiz1;