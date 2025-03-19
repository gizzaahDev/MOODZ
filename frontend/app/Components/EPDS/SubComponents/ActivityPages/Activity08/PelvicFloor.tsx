import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';

export default function PelvicFloor() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState('Warm-up');
  const [totalSessions, setTotalSessions] = useState(0);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [history, setHistory] = useState<{date: string, duration: number}[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      nextPhase();
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) return;

      const userDoc = await firestore()
        .collection('UsersEpds')
        .doc(userId)
        .collection('CompletedActivities')
        .doc('pelvicFloor')
        .get();

      if (userDoc.exists) {
        const data = userDoc.data() || {};
        setTotalSessions(data.totalSessions || 0);
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const startExercise = () => {
    setIsRunning(true);
    setTimeLeft(30); // Increased warm-up duration
    setPhase('Warm-up');
  };

  const nextPhase = () => {
    if (phase === 'Warm-up') {
      setPhase('Squeeze & Hold');
      setTimeLeft(45); // Longer hold time
    } else if (phase === 'Squeeze & Hold') {
      setPhase('Quick Contractions');
      setTimeLeft(30);
    } else if (phase === 'Quick Contractions') {
      setPhase('Relax & Breathe');
      setTimeLeft(30);
    } else {
      completeExercise();
    }
  };

  const completeExercise = async () => {
    setIsRunning(false);
    setPhase('Completed');
    setShowCompletionAnimation(true);

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
      const data = userDoc.data() || { pelvicFloorHistory: {}, hearts: 0, leaves: 0 };

      let updatedHearts = (data.hearts || 0) + 15;
      let updatedLeaves = data.leaves || 0;
      if (updatedHearts >= 100) {
        updatedHearts = 0;
        updatedLeaves += 1;
      }

      const todayHistory = data.pelvicFloorHistory?.[today] || {};
      const newHistory = [...history, { date: today, duration: 135 }];

      await userRef.set({
        hearts: updatedHearts,
        leaves: updatedLeaves,
        activityType: {
          category: 'Physical Activities',
          title: 'Pelvic Floor Exercise',
          description: 'Advanced pelvic floor strengthening routine',
        },
        pelvicFloorHistory: {
          ...data.pelvicFloorHistory,
          [today]: {
            totalDays: (todayHistory.totalDays || 0) + 1,
            streakDays: todayHistory.streakDays || 0,
            playCount: (todayHistory.playCount || 0) + 1,
            totalSessions: totalSessions + 1,
            lastCompleted: today,
            history: newHistory
          }
        }
      }, { merge: true });

      setTimeout(() => {
        setShowCompletionAnimation(false);
        router.push('/Components/EPDS/SubComponents/EPDSMyActivity');
      }, 3000);

    } catch (error) {
      console.error('Error saving exercise data:', error);
    }
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
      const data = userDoc.data() || { pelvicFloorHistory: {}, hearts: 0, leaves: 0, activityType: {} };

      let updatedHearts = (data.hearts || 0) + 10;
      let updatedLeaves = data.leaves || 0;
      if (updatedHearts >= 100) {
        updatedHearts = 0;
        updatedLeaves += 1;
      }

      const todayHistory = data.pelvicFloorHistory?.[today] || {};

      await userRef.set(
        {
          hearts: updatedHearts,
          leaves: updatedLeaves,
          activityType: {
            ...data.activityType,
            category: 'Physical Activities',
            title: 'Pelvic Floor Exercise',
            description: 'Advanced pelvic floor strengthening routine',
          },
          pelvicFloorHistory: {
            ...data.pelvicFloorHistory,
            [today]: {
              totalDays: (todayHistory.totalDays || 0) + 1,
              streakDays: todayHistory.streakDays || 0,
              playCount: (todayHistory.playCount || 0) + 1,
              totalSessions: totalSessions + 1
            },
          },
        },
        { merge: true }
      );

      router.push('/Components/EPDS/SubComponents/EPDSMyActivity');
    } catch (error) {
      console.error('Error saving exercise session:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pelvic Floor Exercise</Text>

      <View style={styles.animest}>
        <LottieView
          source={require('../../../../../../assets/lottie/epdsExercise.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      
      <View style={styles.phaseContainer}>
        <Text style={styles.phaseText}>Phase: {phase}</Text>
        {isRunning && <Text style={styles.timerText}>{timeLeft} sec</Text>}
        <Text style={styles.sessionCount}>Total Sessions: {totalSessions}</Text>
      </View>

      <ScrollView style={styles.instructions}>
        <Text style={styles.instructionText}>
          {phase === 'Warm-up' && 'Begin with deep diaphragmatic breathing. Focus on relaxing your pelvic floor with each exhale. Maintain good posture.'}
          {phase === 'Squeeze & Hold' && 'Contract your pelvic floor muscles as if stopping urine flow. Hold for 5 seconds, then slowly release. Repeat with increasing hold times.'}
          {phase === 'Quick Contractions' && 'Perform rapid contract-release cycles. Aim for maximum strength with each contraction while maintaining proper form.'}
          {phase === 'Relax & Breathe' && 'Focus on completely releasing tension. Practice coordinating your breathing with muscle relaxation.'}
          {phase === 'Completed' && 'Excellent work! You\'ve completed an advanced pelvic floor strengthening session.'}
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={startExercise}>
            <Text style={styles.buttonText}>Start Advanced Routine</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={handleDone}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        transparent={true}
        visible={showCompletionAnimation}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.congratsText}>Exercise Complete! 🎉</Text>
            <LottieView
              source={require('../../../../../../assets/lottie/succesfullyDone.json')}
              autoPlay
              loop={false}
              style={styles.completionAnimation}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3FAF4',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 100,
    color: '#000',
  },
  animation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  animest: {
    borderRadius: 50,
  },
  phaseContainer: {
    backgroundColor: '#016A70',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  phaseText: {
    fontSize: 20,
    color: '#fff',
  },
  timerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  sessionCount: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  instructions: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    maxHeight: 200,
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#016A70',
    padding: 15,
    borderRadius: 50,
    width: '80%',
    alignItems: 'center',
    elevation:5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#016A70',
    marginBottom: 20,
  },
  completionAnimation: {
    width: 150,
    height: 150,
  },
});
