import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const DYoga1 = () => {
  const router = useRouter();
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const yogaWorkouts = [
    { name: 'Partner Forward Fold', image: require('../../../assets/images/dyoga1.webp') },
    { name: 'Standing Forward Fold', image: require('../../../assets/images/dyoga2.webp') },
    { name: 'Backbend', image: require('../../../assets/images/dyoga3.webp') },
    { name: 'Twin Tree', image: require('../../../assets/images/dyoga4.webp') },
    { name: 'Boat Pose', image: require('../../../assets/images/dyoga5.webp') },
    { name: 'Double Downwards Dog', image: require('../../../assets/images/dyoga6.webp') }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isPlaying) {
      if (currentWorkoutIndex < yogaWorkouts.length - 1) {
        setCurrentWorkoutIndex(prev => prev + 1);
        setTimer(10);
      } else {
        setIsCompleted(true);
        setIsPlaying(false);
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer, currentWorkoutIndex]);

  const handleStart = () => {
    if (isCompleted) {
      setCurrentWorkoutIndex(0);
      setTimer(10);
      setIsCompleted(false);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <FontLoader>
      <LinearGradient
        colors={['#9DC183', '#016A70']}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.progressText}>
            {currentWorkoutIndex + 1}/{yogaWorkouts.length}
          </Text>
          <Text style={styles.title}>MOODZ Yoga Challenge</Text>
        </View>

          <View style={styles.animationContainer}>
          <Image 
            source={yogaWorkouts[currentWorkoutIndex].image} 
            style={styles.image}
            resizeMode="contain"
            />
            <Text style={styles.workoutName}>
             {yogaWorkouts[currentWorkoutIndex].name}
             </Text>
             </View>

        <View style={styles.timerContainer}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>
              {isCompleted ? 'DONE!' : formatTime(timer)}
            </Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.button, isCompleted && styles.completeButton]}
            onPress={handleStart}
          >
            <Text style={styles.buttonText}>
              {isCompleted ? 'Restart' : isPlaying ? 'Pause' : 'Start'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.replace("/Components/DAS/DASYoga")}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'DMSans-Bold',
    color: 'white',
    marginTop: 10,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  progressText: {
    fontSize: 20,
    fontFamily: 'DMSans-Medium',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15
  },
  animation: {
    width: width * 0.8,
    height: '80%',
  },
  workoutName: {
    fontSize: 24,
    fontFamily: 'DMSans-Bold',
    color: 'white',
    marginTop: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  animationContainer: {
    height: height * 0.4, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: '80%',
    borderRadius: 15,
  },
  timerCircle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white'
  },
  timerText: {
    fontSize: 26,
    fontFamily: 'DMSans-Bold',
    color: 'white',
    letterSpacing: 1.5
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#2D3436',
    width: width * 0.6,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  backButton: {
    backgroundColor: '#2D3436',
    width: width * 0.4,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
    letterSpacing: 1
  }
});

export default DYoga1;