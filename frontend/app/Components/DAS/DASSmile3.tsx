import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const DASSmile3 = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();

  
  const smileTips = [
    "A shared smile strengthens your bond - Keep smiling together",
    "Smiling at your partner is a simple way to say 'I LOVE YOU'",
    "Take a deep breath and smile. You've got this!",
    "Smiling releases endorphins, which make you feel happier.",
    "A happy marriage starts with a smile!!!",
    "Share a smile with someone today. It's contagious!",
    "Even on tough days, a smile from your spouse can brighten everything",
    "Love grows in laughter and smiles—cherish every joyful moment!",
  ];

  const funnyMemes = [
    {
      question: "Why did the husband open the fridge 10 times?",
      answer: "Hoping food would appear",
    },
    {
      question: "Why does the wife always win arguments?",
      answer: "she has screenshots!",
    },
    {
      question: "Why did the husband sleep on the couch?",
      answer: "He said 'calm down.'",
    },
    {
      question: "Why do married couples share everything?",
      answer: "Except the blanket",
    },
    {
      question: "Why does the wife ask 'Do you love me?",
      answer: "She wants snacks!",
    },
    {
      question: "Why did the husband wash the dishes?",
      answer: "Survival instinct",
    },
  ];

  const funnyJokes = [
    {
      question: "Honey, am I the only one you've been with?",
      answer: "Yes, the rest were all 9s and 10s!",
    },
    {
      question: "Why are you staring at the fridge?",
      answer: "I'm waiting for dinner to appear!",
    },
    {
      question: "Can I help with anything?",
      answer: "Yes, stay out of my way!",
    },
    {
      question: "You never listen to me!",
      answer: "That's a weird way to start a conversation",
    },
    {
      question: "Marriage is like a walk in the park..",
      answer: "Its like Jurasic park",
    },
    
  ];

  const [currentTip, setCurrentTip] = useState(smileTips[0]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  const getRandomItem = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const handleNewTip = () => {
    setCurrentTip(getRandomItem(smileTips));
  };

  const handleNewMeme = () => {
    setCurrentMemeIndex((prevIndex) => (prevIndex + 1) % funnyMemes.length);
    setShowAnswer1(false); // Hide answer when moving to the next meme
    fadeAnim.setValue(0); // Reset animation
  };

  const handleNewJoke = () => {
    setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % funnyJokes.length);
    setShowAnswer2(false); 
    fadeAnim.setValue(0); // Reset animation
  };

  const handleRevealAnswer1 = () => {
    setShowAnswer1(true);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleRevealAnswer2 = () => {
    setShowAnswer2(true);
    
    Animated.timing(fadeAnim, {
      toValue: 2,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleHomePress = () => {
    router.replace("/Components/DAS/DASday3");
  };

  return (
    <FontLoader>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.title, { color: theme.textColor }]}>Smile Therapy 😊</Text>

        
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.textColor }]}>Daily Smile Tip</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>{currentTip}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#016A70' }]}
            onPress={handleNewTip}
          >
            <Text style={styles.buttonText}>New Tip</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.textColor }]}>Funny Memes</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>
            {funnyMemes[currentMemeIndex].question}
          </Text>
          {showAnswer1 && (
            <Animated.Text
              style={[
                styles.answerText,
                { color: theme.textColor, opacity: fadeAnim },
              ]}
            >
              {funnyMemes[currentMemeIndex].answer}
            </Animated.Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#016A70', flex: 1, marginRight: 10 }]}
              onPress={handleRevealAnswer1}
            >
              <Text style={styles.buttonText}>Reveal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#016A70', flex: 1 }]}
              onPress={handleNewMeme}
            >
              <Text style={styles.buttonText}>New Meme</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.textColor }]}>Funny Jokes</Text>
          <Text style={[styles.cardText, { color: theme.textColor }]}>
            {funnyJokes[currentJokeIndex].question}
          </Text>
          {showAnswer2 && (
            <Animated.Text
              style={[
                styles.answerText,
                { color: theme.textColor, opacity: fadeAnim },
              ]}
            >
              {funnyJokes[currentJokeIndex].answer}
            </Animated.Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#016A70', flex: 1, marginRight: 10 }]}
              onPress={handleRevealAnswer2}
            >
              <Text style={styles.buttonText}>Show</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#016A70', flex: 1 }]}
              onPress={handleNewJoke}
            >
              <Text style={styles.buttonText}>New Joke</Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: 'black' }]}
          onPress={handleHomePress}
        >
          <Text style={styles.homeButtonText}>Back</Text>
        </TouchableOpacity>
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
  card: {
    backgroundColor: '#9DC183',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 19,
    marginBottom: 20,
  },
  answerText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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

export default DASSmile3;