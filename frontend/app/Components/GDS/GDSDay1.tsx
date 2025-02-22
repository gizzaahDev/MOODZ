
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const GDSDay1 = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();


  const handleHomePress = () => {

    router.replace("/Components/GDS/GDSHome");
    // Navigate to GDS Home page
  };
  const handleMusicPress = () => {

    router.replace("/Components/GDS/Music1");
    // Navigate to Music1
  };

  const handlePositiveTPress = () => {

    router.replace("/Components/GDS/PositiveT");
    // Navigate to Music1
  };



  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}>
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            Day 01
          </Text>

          <View style={styles.imgcontainerday1}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={[styles.startImage1, theme.imageStyle]} // Apply imageStyle from theme
            />
          </View>

          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            How are you feeling today?
          </Text>
        </View>

        <ScrollView style={styles.scrollView1}>

          <View style={styles.buttonContainerraw}>
          <TouchableOpacity onPress={handleMusicPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>  Music{'\n'}Therapy</Text>
            </View>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={handleMusicPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Yoga</Text>
            </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainerraw}>
          <TouchableOpacity onPress={handleMusicPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Smiling</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePositiveTPress}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.buttonText1}>Positive{'\n'}Thought</Text>
            </View>
            </TouchableOpacity>
          </View>

                        <View style={styles.buttonContainer}>
                          <TouchableOpacity style={styles.button} onPress={handleHomePress}>
                            <Text style={styles.buttonText}>BACK</Text>
                          </TouchableOpacity>
                        </View>


        </ScrollView>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  startcontainer: {
    flex: 1,
  },
  textcontainer: {
    marginTop: 70,
    padding: 16,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgcontainerday1: {
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
  text_welcome: {
    fontFamily: 'roboto',
    fontSize: 30,
    marginBottom: 20,
  },
  scrollView1: {
    marginTop: 0,
  },
  buttonContainerraw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonWrapper: {
    borderRadius: 10,
    width: 160,
    height: 100,
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center', // Center the button and text
    backgroundColor: '#016A70',
    marginBottom: 10,
  },
  buttonText1: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',

  },
  button: {
    backgroundColor: '#272727',
    padding: 15,
    borderRadius: 50,
    width: 350,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
marginTop: 30,
    alignItems: 'center',  // Center the button horizontally
    justifyContent: 'center',  // Center the button vertically (if needed)

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
});

export default GDSDay1;