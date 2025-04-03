import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';
import { LinearGradient } from 'expo-linear-gradient';


const DYoga5 = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoUri = 'https://firebasestorage.googleapis.com/v0/b/testdb-8ea15.firebasestorage.app/o/MOODZ%2FDAS%2F10%20Minute%20Full%20Body%20Partner%20Stretch%20(A%20Quick%20Daily%20Routine).mp4.mp4?alt=media&token=56639b0f-fc73-43a3-91c0-719d8eae2dcc';

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

  const handleDASPress = () => {
    router.replace('/Components/DAS/DASYoga');
  };

  return (
    <FontLoader>
      <LinearGradient
        colors={['#F3FAF4', '#F3FAF4']}
        style={styles.container}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Text style={styles.title}>Partner Yoga - Advanced</Text>
        <Text style={styles.subtitle}>Start your day with positive energy</Text>

        <View style={styles.videoContainer}>
        <Video
           ref={videoRef}
           source={{ uri: videoUri }}
           style={styles.video}
           shouldPlay={false}
           resizeMode={ResizeMode.COVER}  
           />
           
          <View style={styles.overlay}>
            <TouchableOpacity style={styles.controlButton} onPress={togglePlayPause}>
              <Text style={styles.buttonText}>{isPlaying ? 'Pause' : '▶ Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Benefits of This Routine:</Text>
          <Text style={styles.infoText}>• Improves focus and concentration</Text>
          <Text style={styles.infoText}>• Reduces stress and anxiety</Text>
          <Text style={styles.infoText}>• Enhances physical flexibility</Text>
        </View>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleDASPress}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </LinearGradient>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 50,
  },
  title: {
    fontFamily: 'asul',
    fontSize: 34,
    color: '#016A70',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontFamily: 'asul',
    fontSize: 18,
    color: '#016A70',
    textAlign: 'center',
    marginBottom: 30,
  },
  videoContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  video: {
    width: '100%',
    height: Dimensions.get('window').height * 0.35,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  controlButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
  infoBox: {
    backgroundColor: '#016A70',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  infoTitle: {
    fontFamily: 'asul',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    paddingBottom: 8,
  },
  infoText: {
    fontFamily: 'asul',
    fontSize: 16,
    color: '#F0F7F4',
    marginVertical: 5,
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default DYoga5;