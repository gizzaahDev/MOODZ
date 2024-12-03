import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const animation = useRef<LottieView>(null); // Reference for controlling the animation
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/Onboarding/OnboardingScreen'); // Correct path for onboarding screen
    }, 5500); // Display splash screen for 3 seconds
  }, [router]);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        ref={animation}
        style={styles.animation}
        source={require('../assets/lottie/Splash_Anim.json')} // Path to your animation file
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  animation: {
    position: 'absolute', // Use absolute positioning
    
    width: '150%',
    height: '100%',
  },
});
