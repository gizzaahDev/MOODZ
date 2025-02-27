import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../ThemeContext';
import LottieView from 'lottie-react-native';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Music1 = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const handleHomePress = () => {
    router.replace("/Components/DAS/DASday1");
  };

  return (
    <FontLoader>
      <LinearGradient
        colors={['#9DC183', '#9DC183']}
        style={styles.container}
      >
         
        <View style={styles.animationContainer}>
          <LottieView 
            source={require('../../../assets/lottie/MusicTheraphy.json')} 
            autoPlay 
            loop 
            style={styles.animation} 
          />
        </View>

        <View style={styles.instructionsContainer}>
          <Text style={[styles.instructionText, { color: theme.textPrimary }]}>Enjoy the Music </Text>
          <Text style={[styles.instructionText, { color: theme.textPrimary }]}>🎵 🎵 🎵 🎵</Text>
          <Text style={[styles.instructionText, { color: theme.textPrimary }]}>🎵 🎵 🎵 🎵 </Text>
          <Text style={[styles.instructionText, { color: theme.textPrimary }]}> Immerse in Melody </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'orange' }]}>
            <Text style={styles.buttonText}>PLAY</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: 'black' }]} 
            onPress={handleHomePress}
          >
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'roboto',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  animationContainer: {
    width: width * 0.9,
    height: height * 0.4,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  instructionsContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  instructionText: {
    fontFamily: 'roboto',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
  },
});

export default Music1;
