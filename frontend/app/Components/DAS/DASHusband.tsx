import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const DASHusband = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();
  const buttonScale = new Animated.Value(1);

  const handleHomePress = () => {
    router.replace("/Components/DAS/DASday5");
  };

  const handleLeaderPress = () => {
    router.replace("/Components/DAS/Husband1");
  };
 
  const handleLovePress = () => {
    router.replace("/Components/DAS/Husband2");
  };

  const handleGrowthPress = () => {
    router.replace("/Components/DAS/Husband3");
  };


  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: '#9DC183' }]}>
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            Choose a Category
          </Text>

          <View style={styles.imgcontainerday1}>
            <Image
              source={require('../../../assets/images/gettingstart.png')}
              style={[styles.startImage1, theme.imageStyle]}
            />
          </View>
        </View>

        <ScrollView style={styles.scrollView1}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLeaderPress} onPressIn={animateButton}>
              <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
                <Text style={styles.buttonText1}>Leadership &{'\n'}Responsibility</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLovePress} onPressIn={animateButton}>
              <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
                <Text style={styles.buttonText1}>Love &{'\n'}Commitment</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGrowthPress} onPressIn={animateButton}>
              <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
                <Text style={styles.buttonText1}>Growth &{'\n'}Resilience</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleHomePress} onPressIn={animateButton}>
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
    backgroundColor: '#9DC183', // Updated background color
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
    overflow: 'hidden',
    borderRadius: 100,
    borderColor: "#016A70",
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    fontWeight: 'bold',
  },
  scrollView1: {
    marginTop: 0,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonWrapper: {
    borderRadius: 20,
    width: 250, // Increased width for better visibility
    height: 80, // Reduced height for vertical alignment
    marginBottom: 15, // Added margin between buttons
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText1: {
    color: 'black',
    fontSize: 20, // Reduced font size
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#272727',
    padding: 15,
    borderRadius: 50,
    width: 350,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
});

export default DASHusband;