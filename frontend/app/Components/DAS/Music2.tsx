import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../ThemeContext';
import LottieView from 'lottie-react-native';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

const Music2 = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const handleHomePress = () => {
    router.replace("/Components/DAS/DASday2");
  };

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
      return;
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../../assets/songs/das_music2.mp3'),
      { shouldPlay: true }
    );
    setSound(newSound);
    setIsPlaying(true);
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);


  return (
    <FontLoader>
      <LinearGradient
        colors={['#9DC183', '#9DC183']}
        style={styles.container}
      >
         
        <View style={styles.animationContainer}>
          <LottieView 
            source={require('../../../assets/lottie/dasMusic.json')} 
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
        <TouchableOpacity style={styles.MusicPlayer} onPress={isPlaying ? stopSound : playSound}>
            <Text style={styles.buttonText1}>{isPlaying ? 'Stop' : 'Play'}</Text>
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
  animationContainer: {
    width: width * 0.85,
    height: height * 0.35,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 35,
    backgroundColor: '#7A9F', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 15,
    transform: [{ rotate: '-2deg' }],
  },
  animation: {
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  instructionsContainer: {
    marginBottom: 35,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  instructionText: {
    fontFamily: 'DMSans-Bold',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 8,
    color: 'white',
    letterSpacing: 0.6,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  MusicPlayer: {
    borderRadius: 30,
    width: 220,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#016A70',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    gap: 12,
  },
  buttonText1: { 
    color: 'white', 
    fontSize: 28, 
    fontFamily: 'DMSans-Bold',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },
  button: {
    width: 220,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'DMSans-Bold',
    letterSpacing: 1.1,
  },
});

export default Music2;
