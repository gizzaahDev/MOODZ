import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTheme } from '../../ThemeContext';
import LottieView from 'lottie-react-native';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';
import firestore from '@react-native-firebase/firestore';

const PositiveT = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [positiveThought, setPositiveThought] = useState('');

  const handleGDSHomePress = () => {
    router.replace("/Components/GDS/GDSHome"); // Navigate to GDS Home page
  };

  // Save positive thought to Firestore
  const handleSaveThought = async () => {
    if (positiveThought.trim() === '') {
      Alert.alert("Input Error", "Please write a positive thought before saving.");
      return;
    }

    try {
      await firestore()
        .collection('positive_thoughts') // New collection
        .add({
          thought: positiveThought,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      Alert.alert("Success", "Your positive thought has been saved!");
      setPositiveThought(''); // Clear the input field after saving
    } catch (error) {
      console.error("Error saving positive thought: ", error);
      Alert.alert("Error", "There was an issue saving your thought. Please try again.");
    }
  };

  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}>
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Positive Thought</Text>
          <View style={styles.imgcontainerday1}>
            <LottieView source={require('../../../assets/lottie/positiveGDS.json')} autoPlay loop style={styles.animation} />
          </View>

          <TextInput
            style={[styles.PositiveInput, { fontSize: 24 }]}
            placeholder="Write your positive thought"
            value={positiveThought}
            onChangeText={setPositiveThought}
          />

          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Please Write Your Strength</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.SaveButton} onPress={handleSaveThought}>
            <Text style={styles.buttonText1}>SAVE</Text>
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
  animation: { width: 336, height: 300, borderRadius: 10, borderColor: "#016A70", borderWidth: 3 },
  text_welcome: { fontFamily: 'roboto', fontSize: 30, marginBottom: 20 },
  buttonText1: { color: 'white', fontSize: 25, fontWeight: 'bold' },
  imgcontainerday1: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 10,
    borderColor: "#016A70",
    borderWidth: 2,
  },
  PositiveInput: {
    borderColor: "#016A70",
    height: 80,
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  SaveButton: {
    borderRadius: 40,
    width: 140,
    height: 60,
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

export default PositiveT;

