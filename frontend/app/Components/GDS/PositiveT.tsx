import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../ThemeContext';
import LottieView from 'lottie-react-native';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';


const PositiveT = () => {
  const { theme } = useTheme();
  const router = useRouter();
  

  const handleGDSHomePress = () => {

    router.replace("/Components/GDS/GDSHome");
    // Navigate to GDS Home page
  };


  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}> 
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Positive Thought</Text>

        <View style={styles.imgcontainerday1}>
          <LottieView source={require('../../../assets/lottie/PositiveT.json')} autoPlay loop style={styles.animation} />
        </View>

        <TextInput style={[styles.PositiveInput, { fontSize: 24 }]} placeholder="Positive Thought" />


          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Please Write Your Strength</Text>

        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.SaveButton}>
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
  animation: { width: 336, height: 300, borderRadius: 10,  borderColor: "#016A70", borderWidth: 3,},
  text_welcome: { fontFamily: 'roboto', fontSize: 30, marginBottom: 20 },
  Player: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  MusicPlayer: {
    borderRadius: 10, width: 160, height: 100, alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#016A70',
  },
  buttonText1: { color: 'white', fontSize: 25, fontWeight: 'bold' },
  imgcontainerday1: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden', // Ensures rounded corners if used
    borderRadius: 10,
    borderColor: "#016A70",
    borderWidth: 2,
  },
  PlayerButton: {
    marginLeft: '30%',
    borderRadius: 10,
    width: 120,
    height: 60,
    alignItems: 'center', // Center the button and text
    backgroundColor: '#016A70',
    marginBottom: 10,
  },
  PositiveInput:{
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
  alignItems: 'center', // Centers the button horizontally
  marginVertical: 10, // Adds some space
},

SaveButton: {
  borderRadius: 40,
  width: 140,
  height: 60,
  alignItems: 'center', 
  justifyContent: 'center', // Centers the text inside the button
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
  backgroundColor: '#D9534F', // Red color
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
