import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,Dimensions } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../FontLoader';

const GettingstartScreen = () => {
  
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();

  const handleLogin = () => {
    router.replace('../Auth/Login')
  };

  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}>
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            Welcome to your
          </Text>
          <Text style={[styles.text_title, { color: theme.title }]}>
            Healing Journey
          </Text>
          <Text style={[styles.text_paragrapgh, { color: theme.textSecondary }]}>
            We’re here to support you with personalized measurements to overcome depression. Start your path today.
          </Text>
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: theme.buttonBackground }]} onPress={handleLogin}
          >
            <Text style={[styles.startButtonText, { color: theme.buttonText }]}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imgcontainer}>
          <Image
            source={require('../../assets/images/gettingstart.png')}
            style={[styles.startImage, theme.imageStyle]} // Apply imageStyle from theme
          />
        </View>

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
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgcontainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_welcome: {
    fontFamily: 'asul',
    fontSize: 30,
    marginBottom: 0,
  },
  text_title: {
    fontFamily: 'poppins',
    fontSize: 36,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  text_paragrapgh: {
    fontFamily: 'times',
    fontSize: 17,
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,
  },
  startButton: {
    borderRadius: 250,
    paddingVertical: 15,
    paddingHorizontal: 60,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'times',
  },
  startImage: {
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default GettingstartScreen;
