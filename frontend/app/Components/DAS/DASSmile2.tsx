import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, ScrollView } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SpinTheWheel = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();

  // Wheel sections with activities
  const wheelSections = [
    "Share a funny memory from your relationship.",
    "Give each other a 2-minute massage.",
  ];

  const [result, setResult] = useState<string | null>(null);
  const [showActivity, setShowActivity] = useState(false); // To toggle between spin wheel and activity UI
  const [activityInput, setActivityInput] = useState(''); // For sharing a memory
  const [timer, setTimer] = useState(120); // 2-minute timer (120 seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Timer state
  const spinAnim = useRef(new Animated.Value(0)).current; // Animation for spinning

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const spinWheel = () => {
    // Reset animation
    spinAnim.setValue(0);

    // Randomize the spin
    const randomSpin = Math.floor(Math.random() * 3600) + 720; // Spin between 2 and 10 full rotations
    Animated.timing(spinAnim, {
      toValue: randomSpin,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      // Calculate the result after the spin
      const degrees = randomSpin % 360;
      const sectionSize = 360 / wheelSections.length;
      const selectedIndex = Math.floor(degrees / sectionSize);
      setResult(wheelSections[selectedIndex]);
      setShowActivity(true); // Show the activity UI
    });
  };

  const handleActivityDone = () => {
    setShowActivity(false); // Return to the spin wheel UI
    setActivityInput(''); // Clear the input
    setTimer(120); // Reset timer
    setIsTimerRunning(false); // Stop timer
  };

  const handleSaveMemory = async () => {
    if (activityInput.trim()) {
      await AsyncStorage.setItem('funnyMemory', activityInput);
      alert('Memory saved successfully!');
    } else {
      alert('Please enter a memory to save.');
    }
  };

  const handleHomePress = () => {
    router.replace("/Components/DAS/DASHome");
  };

  return (
    <FontLoader>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {!showActivity ? (
          <>
            {/* Spin the Wheel UI */}
            <Text style={[styles.title, { color: theme.textColor }]}>Spin the Wheel 😊</Text>

            {/* Wheel */}
            <View style={styles.wheelContainer}>
              <Animated.View
                style={[
                  styles.wheel,
                  {
                    transform: [
                      {
                        rotate: spinAnim.interpolate({
                          inputRange: [0, 3600],
                          outputRange: ['0deg', '3600deg'],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {wheelSections.map((section, index) => {
                  const sectionRotation = (360 / wheelSections.length) * index; // Calculate rotation for each section
                  return (
                    <View
                      key={index}
                      style={[
                        styles.wheelSection,
                        {
                          backgroundColor: index % 2 === 0 ? '#FF69B4' : '#016A70',
                          transform: [{ rotate: `${sectionRotation}deg` }], // Rotate each section
                        },
                      ]}
                    >
                      <Text style={styles.wheelText}>{section}</Text>
                    </View>
                  );
                })}
              </Animated.View>
              <View style={styles.pointer} />
            </View>

            {/* Spin Button */}
            <TouchableOpacity
              style={[styles.spinButton, { backgroundColor: '#016A70' }]}
              onPress={spinWheel}
            >
              <Text style={styles.spinButtonText}>Spin the Wheel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Activity UI */}
            <Text style={[styles.title, { color: theme.textColor }]}>Your Activity 😊</Text>
            <Text style={[styles.activityText, { color: theme.textColor }]}>{result}</Text>

            {/* Activity-Specific UI */}
            {result === "Share a funny memory from your relationship." && (
              <>
                <TextInput
                  style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                  placeholder="Type your funny memory here..."
                  placeholderTextColor="#888"
                  multiline
                  value={activityInput}
                  onChangeText={(text) => setActivityInput(text)}
                />
                <TouchableOpacity
                  style={[styles.activityButton, { backgroundColor: '#016A70' }]}
                  onPress={handleSaveMemory}
                >
                  <Text style={styles.activityButtonText}>Save Memory</Text>
                </TouchableOpacity>
              </>
            )}

            {result === "Give each other a 2-minute massage." && (
              <>
                <Text style={[styles.timerText, { color: theme.textColor }]}>
                  {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                </Text>
                <TouchableOpacity
                  style={[styles.activityButton, { backgroundColor: '#016A70' }]}
                  onPress={() => setIsTimerRunning(!isTimerRunning)}
                >
                  <Text style={styles.activityButtonText}>
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Done Button */}
            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: '#016A70' }]}
              onPress={handleActivityDone}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Back Button */}
        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: 'black' }]}
          onPress={handleHomePress}
        >
          <Text style={styles.homeButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  wheelContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  wheel: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
    position: 'absolute',
    overflow: 'hidden', // Ensure the wheel sections stay within the circle
  },
  wheelSection: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '0deg' }], // Initial rotation
  },
  wheelText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    transform: [{ rotate: '90deg' }], // Rotate text to align with the section
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#000',
    position: 'absolute',
    top: -10,
  },
  activityText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
    minHeight: 100,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  activityButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  activityButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spinButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  spinButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SpinTheWheel;