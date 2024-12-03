import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';

import { BlurView } from 'expo-blur';
import { ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    animation: require('../../assets/lottie/Welcome.json'),
    title: 'Welcome to Depression Relief',
    description: 'The app welcomes users warmly, emphasizing its focus on helping manage and reduce depression effectively. It introduces itself as a supportive tool designed to empower users to improve their emotional well-being.',
  },
  {
    id: 2,
    animation: require('../../assets/lottie/Activity.json'),
    title: 'Assess Your Mood',
    description: 'Users are guided to complete a scientifically validated questionnaire that assesses their current depression levels. The process is simple and private, providing valuable insights into their emotional state and serving as a foundation for personalized support.',
  },
  {
    id: 3,
    animation: require('../../assets/lottie/Activities_onboard.json'),
    title: 'Engage in Activities',
    description: 'The app presents practical and engaging tasks that are tailored to help alleviate depressive symptoms. These activities are designed to be manageable and effective, fostering positive habits and providing users with a sense of achievement.',
  },
  {
    id: 4,
    animation: require('../../assets/lottie/progress.json'),
    title: 'Track Your Progress',
    description: 'A progress tracking feature allows users to visualize their improvements over time. This helps to reinforce their efforts, showing how consistent small actions can lead to meaningful change in mental health.',
  },
  {
    id: 5,
    animation: require('../../assets/lottie/start.json'),
    title: 'Let’s Get Started!',
    description: 'Users are encouraged to begin their journey towards better mental health with confidence. The app offers a clear starting point, equipping them with tools and insights to take proactive steps toward a happier, more balanced life.',
  },
];

export default function OnboardingScreen() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();
  const translateX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentScreen === onboardingData.length - 1) {
      router.replace('/Home/Home');
    } else {
      Animated.timing(translateX, {
        toValue: -(currentScreen + 1) * width,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleSkip = () => {
    router.replace('/Home/Home');
  };

  const handleDotPress = (index: React.SetStateAction<number>) => {
    Animated.timing(translateX, {
      toValue: -index * width,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setCurrentScreen(index);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/backg.jpg')} // Your background image
      style={styles.backgroundImage}
    >
      <BlurView intensity={1000} style={styles.blurView}>
        <View style={styles.container}>
          <Animated.View
            style={[styles.slidesContainer, { transform: [{ translateX }] }]}
          >
            {onboardingData.map((item) => (
              <View key={item.id} style={styles.slide}>
                <LottieView source={item.animation} autoPlay loop style={styles.animation} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            ))}
          </Animated.View>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDotPress(index)}
                style={[
                  styles.dot,
                  currentScreen === index && styles.activeDot, // Highlight active dot
                ]}
              />
            ))}
          </View>

          {/* Skip Button */}
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          {/* Next or Get Started Button */}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentScreen === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center', // Center the content
  },
  blurView: {
    flex: 1, // Ensure BlurView covers the full screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  slidesContainer: {
    flexDirection: 'row',
    width: width * onboardingData.length,
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#016A70', // White text on a dark background
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginHorizontal: 30,
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20, // Wider for active dot
    backgroundColor: '#016A70',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 25,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  animation: {
    width: 250,
    height: 250,
    marginBottom: 20,
    
  },
});
