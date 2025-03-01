import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';

const Music1 = () => {
  const { theme } = useTheme();
  const router = useRouter();


  const handleGDSHomePress = () => {

    router.replace("/Components/GDS/GDSHome");
    // Navigate to GDS Home page
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
      require('../../../assets/songs/GDS1.mp3'),
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
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}> 
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Music Therapy</Text>
          <LottieView source={require('../../../assets/lottie/MusicTheraphy.json')} autoPlay loop style={styles.animation} />
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Please Close Your Eyes</Text>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}> & </Text>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Feel the Music</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.MusicPlayer} onPress={isPlaying ? stopSound : playSound}>
            <Text style={styles.buttonText1}>{isPlaying ? 'Stop' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleGDSHomePress}>
            <Text style={styles.backButtonText}>BACK</Text>
          </TouchableOpacity>
        </View>

      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  startcontainer: { flex: 1 },
  textcontainer: { marginTop: 70, padding: 16, alignItems: 'center' },
  animation: { width: 350, height: 300, marginBottom: 10 },
  text_welcome: { fontFamily: 'asul', fontSize: 30, marginBottom: 20 },
  Player: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  buttonContainer: {
    alignItems: 'center', // Centers the button horizontally
    marginVertical: 10, // Adds some spacing
  },
  
  MusicPlayer: {
    borderRadius: 10,
    width: 160,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#016A70',
  },
  
  backButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  
  backButton: {
    borderRadius: 10,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9534F', // Red color for back button
    borderWidth: 1,
    borderColor: '#B52B27',
  },
  
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  buttonText1: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Music1;
