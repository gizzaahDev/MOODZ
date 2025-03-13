import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const MeditationGDS = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoUri = 'https://firebasestorage.googleapis.com/v0/b/testdb-8ea15.firebasestorage.app/o/MOODZ%2FGDS%2Fvideo%204.mp4?alt=media&token=818c7d5c-239e-4908-9b41-2baa1de06ef5';

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
          <Text style={[styles.titleText, { color: theme.textPrimary }]}>MEDITATION</Text>
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
            <Text style={styles.backButtonText}>NEXT</Text>
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
    borderRadius: 40,
    width: 140,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#016A70',
    borderWidth: 1,
    borderColor: '#016A70',
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MeditationGDS;
