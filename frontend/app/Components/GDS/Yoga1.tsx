import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Yoga1 = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoUri = 'https://firebasestorage.googleapis.com/v0/b/testdb-8ea15.firebasestorage.app/o/MOODZ%2FGDS%2FOver%2050_%203%20Yoga%20Poses%20You%20Should%20Do%20Daily.mp4.mp4?alt=media&token=e66821a0-a785-47d1-9041-0991106bfb94';

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekForward = async () => {
    if (videoRef.current) {
      const newPosition = position + 1000; // 5 seconds forward
      await videoRef.current.setPositionAsync(Math.min(newPosition, duration));
    }
  };

  const seekBackward = async () => {
    if (videoRef.current) {
      const newPosition = position - 1000; // 5 seconds backward
      await videoRef.current.setPositionAsync(Math.max(newPosition, 0));
    }
  };

  const handleBackPress = () => {
    router.replace('/Components/GDS/GDSHome');
  };

  return (
    <FontLoader>
      <View style={[styles.container, { backgroundColor: theme.background }]}> 
        <Image source={require('../../../assets/images/leafBGA.png')} style={styles.backgroundImage} />
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, { color: theme.textPrimary }]}>Yoga</Text>
        </View>

        <Video
          ref={videoRef}
          source={{ uri: videoUri }}
          style={styles.video}
          resizeMode="contain"
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              setIsPlaying(status.isPlaying);
              setPosition(status.positionMillis);
              setDuration(status.durationMillis || 0);
            }
          }}
        />

        <View style={styles.controls}>
          <TouchableOpacity onPress={seekBackward}>
            <Text style={styles.controlText}>
              <FontAwesome6 name="backward" size={24} color="#016A70" /> 10s
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
            <Text style={styles.playButtonText}>
              {isPlaying ? <FontAwesome6 name="pause" size={16} color="white" /> : <FontAwesome6 name="play" size={16} color="white" />}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={seekForward}>
            <Text style={styles.controlText}>
              10s <FontAwesome6 name="forward" size={24} color="#016A70" />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: -90,
    left: 0,
    width: 380,
    height: 400,
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }],
  },
  textContainer: {
    marginTop: 70,
    padding: 16,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 60,
  },
  controlText: {
    fontSize: 30,
    color: '#888',
  },
  playButton: {
    backgroundColor: '#016A70',
    padding: 30,
    borderRadius: 100,
  },
  playButtonText: {
    textAlign: 'center',
  },
  backButtonContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 60,
  },
  backButton: {
    borderRadius: 10,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9534F',
    borderWidth: 1,
    borderColor: '#B52B27',
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Yoga1;






/*
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
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Yoga</Text>
          <LottieView source={require('../../../assets/lottie/MusicTheraphy.json')} autoPlay loop style={styles.animation} />
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Please Follow Theese</Text>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}> Steps </Text>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>With Me</Text>
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
  buttonContainer: {
    alignItems: 'center', // Centers the button horizontally
    marginVertical: 10, // Adds some spacing
  },
});

export default Yoga1;
*/