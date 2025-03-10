import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function PelvicFloor() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState('Warm-up');

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      nextPhase();
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const startExercise = () => {
    setIsRunning(true);
    setTimeLeft(10); // Set warm-up duration
    setPhase('Warm-up');
  };

  const nextPhase = () => {
    if (phase === 'Warm-up') {
      setPhase('Squeeze & Hold');
      setTimeLeft(10);
    } else if (phase === 'Squeeze & Hold') {
      setPhase('Relax & Breathe');
      setTimeLeft(10);
    } else {
      setIsRunning(false);
      setPhase('Completed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pelvic Floor Exercise</Text>
      
      <View style={styles.phaseContainer}>
        <Text style={styles.phaseText}>Phase: {phase}</Text>
        {isRunning && <Text style={styles.timerText}>{timeLeft} sec</Text>}
      </View>

      <ScrollView style={styles.instructions}>
        <Text style={styles.instructionText}>
          {phase === 'Warm-up' && 'Start by relaxing and breathing deeply. Focus on engaging your pelvic muscles gently.'}
          {phase === 'Squeeze & Hold' && 'Tighten your pelvic floor muscles and hold for 5-10 seconds. Maintain steady breathing.'}
          {phase === 'Relax & Breathe' && 'Release the muscles completely and take deep breaths. This helps strengthen control.'}
          {phase === 'Completed' && 'Well done! You have completed your pelvic floor exercise session.'}
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {!isRunning && (
          <TouchableOpacity style={styles.startButton} onPress={startExercise}>
            <Text style={styles.buttonText}>Start Exercise</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  phaseContainer: {
    backgroundColor: '#4CAF50',
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
  instructions: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
