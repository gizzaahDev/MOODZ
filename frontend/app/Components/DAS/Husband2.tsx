import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const Husband2 = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();
  const buttonScale = new Animated.Value(1);

  // Animation values for slide-in effect
  const slideAnim1 = useRef(new Animated.Value(-500)).current;
  const slideAnim2 = useRef(new Animated.Value(-500)).current;
  const slideAnim3 = useRef(new Animated.Value(-500)).current;
  const slideAnim4 = useRef(new Animated.Value(-500)).current;
  const slideAnim5 = useRef(new Animated.Value(-500)).current;
  const slideAnim6 = useRef(new Animated.Value(-500)).current;
  const slideAnim7 = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    // Slide-in animation for each button with a delay
    Animated.sequence([
      Animated.timing(slideAnim1, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim2, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        delay: 200,
      }),
      Animated.timing(slideAnim3, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        delay: 400,
      }),
      Animated.timing(slideAnim4, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        delay: 600,
      }),
      Animated.timing(slideAnim5, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        delay: 800,
      }),
      Animated.timing(slideAnim6, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        delay: 850,
      }),
      Animated.timing(slideAnim7, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        delay: 900,
      }),
    ]).start();
  }, [slideAnim1, slideAnim2, slideAnim3, slideAnim4, slideAnim5, slideAnim6, slideAnim7]);

  const handleHomePress = () => {
    router.replace("/Components/DAS/DASHusband");
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
            📖 Read & Heal 📖
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
            <TouchableOpacity  onPressIn={animateButton}>
              <Animated.View style={[styles.buttonWrapper, { 
                transform: [{ translateX: slideAnim1 }, { scale: buttonScale }],
              }]}>
                <Text style={styles.buttonText1}>"A happy marriage is built on a foundation of{'\n'} love, trust, and unwavering commitment."</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity  onPressIn={animateButton}>
              <Animated.View style={[styles.buttonWrapper, { 
                transform: [{ translateX: slideAnim2 }, { scale: buttonScale }],
              }]}>
                <Text style={styles.buttonText1}>"The best way to love your wife is to show{'\n'}  her every day how much she means to you</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity  onPressIn={animateButton}>
              <Animated.View style={[styles.buttonWrapper, { 
                transform: [{ translateX: slideAnim3 }, { scale: buttonScale }],
              }]}>
                <Text style={styles.buttonText1}>"Love is not just a feeling; it’s {'\n'} a choice you make every single day."</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity  onPressIn={animateButton}>
              <Animated.View style={[styles.buttonWrapper, { 
                transform: [{ translateX: slideAnim4 }, { scale: buttonScale }],
              }]}>
                <Text style={styles.buttonText1}>"A strong marriage is a partnership {'\n'}where both people give 100%."</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity  onPressIn={animateButton}>
              <Animated.View style={[styles.buttonWrapper, { 
                transform: [{ translateX: slideAnim5 }, { scale: buttonScale }],
              }]}>
                <Text style={styles.buttonText1}>"The little things you do for your wife  {'\n'}today will create a lifetime of love."</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity  onPressIn={animateButton}>
              <Animated.View style={[styles.buttonWrapper, { 
                transform: [{ translateX: slideAnim6 }, { scale: buttonScale }],
              }]}>
                <Text style={styles.buttonText1}>"A husband’s love is the anchor that {'\n'} keeps the family grounded."</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity  onPressIn={animateButton}>
              <Animated.View style={[styles.buttonWrapper, { 
                transform: [{ translateX: slideAnim7 }, { scale: buttonScale }],
              }]}>
                <Text style={styles.buttonText1}>"True love is not about perfection; {'\n'}it’s about embracing each other’s imperfections."</Text>
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
    backgroundColor: '#9DC183',
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
    width: 350, 
    height: 120, 
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 10, 
  },
  buttonText1: {
    color: 'black',
    fontSize: 16, 
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
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
});

export default Husband2;