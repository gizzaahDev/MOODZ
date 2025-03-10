import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';

const BreathGDS = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [breathStage, setBreathStage] = useState('');
  const [timer, setTimer] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        if (timer === 0) {
          if (breathStage === '' || breathStage === 'Breathe Out') {
            setBreathStage('Breathe In');
            setTimer(4);
          } else if (breathStage === 'Breathe In') {
            setBreathStage('Hold');
            setTimer(4);
          } else if (breathStage === 'Hold') {
            setBreathStage('Breathe Out');
            setTimer(6);
          }
        } else {
          setTimer(prevTimer => prevTimer - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, timer, breathStage]);

  const handleStartBreathing = () => {
    setIsBreathing(true);
    setBreathStage('Breathe In');
    setTimer(4);
  };

  const handleStopBreathing = () => {
    setIsBreathing(false);
    setBreathStage('');
    setTimer(0);
  };

  const handleGDSHomePress = () => {
    router.replace("/Components/GDS/GDSHome");
  };

  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}> 
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Breathing Exercise</Text>

          <View style={styles.imgcontainerrr}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={[styles.startImage1, theme.imageStyle]} // Apply imageStyle from theme
            />
          </View>



          <View style={styles.imgcontainerday1}>
            <Text style={styles.breathText}>{breathStage}</Text>
            <Text style={styles.timerText}>{timer > 0 ? timer : ''}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {isBreathing ? (
            <TouchableOpacity style={styles.STOPButton} onPress={handleStopBreathing}>
              <Text style={styles.buttonText1}>STOP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.STARTButton} onPress={handleStartBreathing}>
              <Text style={styles.buttonText1}>START</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleGDSHomePress}>
            <Text style={styles.backButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  startcontainer: { flex: 1 },
  textcontainer: { marginTop: 70, padding: 16, alignItems: 'center' },
  text_welcome: { fontFamily: 'roboto', fontSize: 30, marginBottom: 20 },
  buttonText1: { color: 'white', fontSize: 25, fontWeight: 'bold' },
  imgcontainerday1: {
    width: 300,
    height: 175,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 10,
    borderColor: "#016A70",
    borderWidth: 2,
    backgroundColor: '#E8F6EF',
  },
  breathText: { fontSize: 28, fontWeight: 'bold', color: '#016A70' },
  timerText: { fontSize: 40, fontWeight: 'bold', color: '#D9534F' },
  buttonContainer: { alignItems: 'center', marginVertical: 10 },
  STARTButton: {
    borderRadius: 60,
    width: 120,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#016A70',
  },
  STOPButton: {
    borderRadius: 60,
    width: 120,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9534F',
  },
  backButtonContainer: { alignItems: 'center', marginTop: 20 },
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
  backButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },

  imgcontainerrr: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden', // Ensures rounded corners if used
    borderRadius: 100,
    borderColor: "#016A70",
    borderWidth: 3,
  },
  startImage1: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default BreathGDS;
