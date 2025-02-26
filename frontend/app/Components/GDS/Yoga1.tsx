import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';

const Yoga1 = () => {
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
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Fthe Music</Text>
        </View>

        <View style={styles.Player}>
          <TouchableOpacity style={styles.MusicPlayer} onPress={isPlaying ? stopSound : playSound}>
            <Text style={styles.buttonText1}>{isPlaying ? 'Stop' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
                        <View >
                            <TouchableOpacity  onPress={handleGDSHomePress}>
                                <Text >BACK</Text>
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
  MusicPlayer: {
    borderRadius: 10, width: 160, height: 100, alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#016A70',
  },
  buttonText1: { color: 'white', fontSize: 30, fontWeight: 'bold' },
});

export default Yoga1;
