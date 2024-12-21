import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useTheme } from '../ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    animation: require('../../assets/lottie/Welcome.json'),
    title: 'Welcome to Depression Relief',
    description:
      'The app welcomes users warmly, emphasizing its focus on helping manage and reduce depression effectively. It introduces itself as a supportive tool designed to empower users to improve their emotional well-being.',
  },
  {
    id: 2,
    animation: require('../../assets/lottie/Activity.json'),
    title: 'Assess Your Mood',
    description:
      'Users are guided to complete a scientifically validated questionnaire that assesses their current depression levels. The process is simple and private, providing valuable insights into their emotional state and serving as a foundation for personalized support.',
  },
  {
    id: 3,
    animation: require('../../assets/lottie/Activities_onboard.json'),
    title: 'Engage in Activities',
    description:
      'The app presents practical and engaging tasks that are tailored to help alleviate depressive symptoms. These activities are designed to be manageable and effective, fostering positive habits and providing users with a sense of achievement.',
  },
  {
    id: 4,
    animation: require('../../assets/lottie/progress.json'),
    title: 'Track Your Progress',
    description:
      'A progress tracking feature allows users to visualize their improvements over time. This helps to reinforce their efforts, showing how consistent small actions can lead to meaningful change in mental health.',
  },
  {
    id: 5,
    animation: require('../../assets/lottie/start.json'),
    title: 'Let’s Get Started!',
    description:
      'Users are encouraged to begin their journey towards better mental health with confidence. The app offers a clear starting point, equipping them with tools and insights to take proactive steps toward a happier, more balanced life.',
  },
];

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();
  const scrollViewRef = useRef(null);

  const handleScrollEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentScreen(newIndex);
  };

  const handleNext = () => {
    if (currentScreen === onboardingData.length - 1) {
      router.replace('../Gettingstart/GettingstartScreen');
    } else {
      const nextScreenIndex = currentScreen + 1;
      scrollViewRef.current.scrollTo({ x: nextScreenIndex * width, animated: true });
      setCurrentScreen(nextScreenIndex);
    }
  };

  const handleSkip = () => {
    router.replace('../Gettingstart/GettingstartScreen');
  };

  const handleDotPress = (index) => {
    scrollViewRef.current.scrollTo({ x: index * width, animated: true });
    setCurrentScreen(index);
  };

  useEffect(() => {
    const checkStatus = async () => {
      // Check if user has seen onboarding
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      // Check if user is already logged in
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      const currentUser = auth().currentUser; // Firebase current user
  
      // If user has already logged in, skip onboarding and go to Home
      if (userLoggedIn === "true" || currentUser) {
        router.replace("/Home/Home");
      } 
      // If onboarding is completed, go to login
      else if (hasSeenOnboarding) {
        router.replace("/Auth/Login");
      }
    };
  
    checkStatus();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/backg.jpg')}
      style={styles.backgroundImage}
    >
      <BlurView intensity={50} style={styles.blurView}>
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            style={styles.scrollView}
            ref={scrollViewRef}
          >
            {onboardingData.map((item) => (
              <View key={item.id} style={styles.slide}>
                <LottieView
                  source={item.animation}
                  autoPlay
                  loop
                  style={styles.animation}
                />
                <Text style={[styles.title, { color: theme.textPrimary }]}>{item.title}</Text>
                <Text style={[styles.description, { color: theme.textSecondary }]}>
                  {item.description}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDotPress(index)}
                style={[
                  styles.dot,
                  { backgroundColor: currentScreen === index ? theme.activeDot : theme.dot,
                    width: currentScreen === index ? 20 : 10,
                    height: currentScreen === index ? 20 : 10,
                    borderRadius: currentScreen === index ? 20 : 10,
                   },
                  
                ]}
              />
            ))}
          </View>

          <TouchableOpacity style={[styles.skipButton, { backgroundColor: theme.skipButtonBackground }]} onPress={handleSkip}>
            <Text style={[styles.skipButtonText, { color: theme.skipButtonText }]}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.buttonBackground }]}
            onPress={handleNext}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              {currentScreen === onboardingData.length - 1 ? 'Next' : 'Next'}
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
  },
  blurView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 0,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    
    marginHorizontal: 5,
  },
  activeDot:{
    backgroundColor: '#000',
    width: 20,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
function auth() {
    throw new Error('Function not implemented.');
}

