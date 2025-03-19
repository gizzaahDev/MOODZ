import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, Modal } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Set Notification Handler for System Notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function WalkingChallenge() {
  const [isRunning, setIsRunning] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [goal, setGoal] = useState('');
  const [history, setHistory] = useState([]);
  const [timer, setTimer] = useState(0);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  let interval = null;

  useEffect(() => {
    registerForPushNotificationsAsync(); // Request permission for system notifications
  }, []);

  // Step Counter Logic
  useEffect(() => {
    let lastAcceleration = null;
    let stepThreshold = 1.2;

    const subscribe = () => {
      Accelerometer.setUpdateInterval(200);
      return Accelerometer.addListener(accelerometerData => {
        const acceleration = Math.sqrt(
          accelerometerData.x ** 2 + 
          accelerometerData.y ** 2 + 
          accelerometerData.z ** 2
        );

        if (lastAcceleration !== null) {
          const change = Math.abs(acceleration - lastAcceleration);
          if (change > stepThreshold) {
            setStepCount(prev => {
              const newStepCount = prev + 1;
              checkGoal(newStepCount); // Check if goal is reached
              return newStepCount;
            });
          }
        }
        lastAcceleration = acceleration;
      });
    };

    let subscription;
    if (isRunning) {
      subscription = subscribe();
    } else {
      subscription && subscription.remove();
    }

    return () => {
      subscription && subscription.remove();
    };
  }, [isRunning]);

  // Stopwatch Logic
  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Check if goal is reached
  const checkGoal = (steps) => {
    if (goal && parseInt(goal) === steps) {
      sendNotification();
      setShowCompletionAnimation(true);
      setTimeout(() => setShowCompletionAnimation(false), 5000);
    }
  };

  // Send System Notification
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎉 Goal Reached!',
        body: 'Congratulations! You achieved your walking goal.',
        sound: true,
      },
      trigger: null,
    });

    // Alert.alert('Goal Reached!', 'Congratulations! You achieved your walking goal.');
  };

  const handleStart = () => {
    setIsRunning(true);
    setStepCount(0);
    setTimer(0);
  };

  const handleStop = () => {
    setIsRunning(false);
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    setHistory(prev => [...prev, { time: `${minutes}:${seconds}`, steps: stepCount }]);
  };

  const handleDone = async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) return;

      const today = new Date().toISOString().split('T')[0];
      const userRef = firestore()
        .collection('UsersEpds')
        .doc(userId)
        .collection('CompletedActivities')
        .doc(today);

      const userDoc = await userRef.get();
      const data = userDoc.data() || { walkingTask: {}, hearts: 0, leaves: 0, activityType: {}, completedActivities: [] };

      let updatedHearts = (data.hearts || 0) + 10;
      let updatedLeaves = data.leaves || 0;
      if (updatedHearts >= 100) {
        updatedHearts = 0;
        updatedLeaves += 1;
      }

      const todayHistory = data.walkingTask?.[today] || {};
      const existingSteps = todayHistory.steps || [];

      // Add the current activity to the completed activities array
      const completedActivity = {
        category: 'Physical Activities',
        title: 'Walking Challenge',
        description: 'Walking exercise with step counting.',
        date: today,
        steps: stepCount
      };

      await userRef.set(
        {
          hearts: updatedHearts,
          leaves: updatedLeaves,
          activityType: {
            ...data.activityType,
            category: 'Physical Activities',
            title: 'Walking Challenge',
            description: 'Walking exercise with step counting.',
          },
          walkingTask: {
            ...data.walkingTask,
            [today]: {
              totalDays: (todayHistory.totalDays || 0) + 1,
              streakDays: todayHistory.streakDays || 0,
              playCount: (todayHistory.playCount || 0) + 1,
              steps: [...existingSteps, stepCount]
            },
          },
          completedActivities: [...(data.completedActivities || []), completedActivity],
        },
        { merge: true }
      );

      router.push('/Components/EPDS/SubComponents/EPDSMyActivity');
    } catch (error) {
      console.error('Error saving walking session:', error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Walking Challenge</Text>

      {/* Initial Animation */}
      <LottieView
        source={require('../../../../../../assets/lottie/walking.json')}
        autoPlay
        loop
        style={styles.animation}
      />

      {/* Step Goal Input */}
      <TextInput
        style={styles.input}
        placeholder="Set Step Goal"
        keyboardType="numeric"
        value={goal}
        onChangeText={setGoal}
      />

      {/* Step Counter */}
      <View style={styles.counterBox}>
        <Text style={styles.counterText}>Steps: {stepCount} / {goal || 0}</Text>
      </View>

      {/* Stopwatch */}
      <Text style={styles.timer}>
        {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stopButton} onPress={() => {handleStop(); handleDone();}}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>

      {/* Walking History */}
      <Text style={styles.historyTitle}>Walking History</Text>
      <ScrollView style={styles.historyContainer}>
        {history.map((session, index) => (
          <View key={index} style={styles.historyItem}>
            <Text>Time: {session.time} mins</Text>
            <Text>Steps: {session.steps}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Completion Animation Modal */}
      <Modal
        transparent={true}
        visible={showCompletionAnimation}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.completionAnimation}>
            <Text style={styles.congratsText}>You reached your goals. congratulations 🎉</Text>
            <LottieView
              source={require('../../../../../../assets/lottie/succesfullyDone.json')}
              autoPlay
              loop={true}
              style={styles.animation}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Function to Request System Notification Permission
async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permission Denied', 'Enable notifications to receive alerts.');
      return;
    }

    // Get Expo Push Token (not required for local notifications)
    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo Push Token:', token);
    } catch (error) {
      console.error('Error getting Expo Push Token:', error);
    }
  } else {
    Alert.alert('Use a physical device', 'Push notifications do not work in simulators.');
  }

  return token;
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3FAF4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  animation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionAnimation: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 18,
    marginTop:15,
  },
  counterBox: {
    backgroundColor: '#016A70',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 24,
    color: '#fff',
  },
  timer: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 50,
    width:100,
  },
  stopButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    width:100,
    borderRadius: 50,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:"center"
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyContainer: {
    maxHeight: 200,
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    elevation: 2,
  },
});
