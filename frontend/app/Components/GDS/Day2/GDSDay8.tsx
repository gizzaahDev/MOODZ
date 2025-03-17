import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../ThemeContext';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import FontLoader from '../../../../FontLoader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const GDSDay8 = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;

    const userRef = firestore().collection('UsersGDS').doc(userId);
    const unsubscribe = userRef.onSnapshot((doc) => {
      if (doc.exists) {
        setUserPoints(doc.data()?.points || 0);
      }
    });

    return () => unsubscribe?.();
  }, []);

  const navigateTo = (path) => {
    router.replace(path);
  };

  return (
    <FontLoader>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        
        {/* Title */}
        <View style={styles.textContainer}>
          <Text style={[styles.heading, { color: theme.textPrimary }]}>Day 08</Text>

          <View style={styles.imgcontainerday1}>
            <Image
              source={require('../../../../assets/images/icon.png')}
              style={[styles.startImage1, theme.imageStyle]}
            />
          </View>

          {/* Display Earned Points */}
          <Text style={styles.pointsText}>Points: {userPoints}/40</Text>

          <Text style={[styles.subHeading, { color: theme.textPrimary }]}>How are you feeling today?</Text>
        </View>

        <ScrollView style={styles.scrollView}>

          {/* First Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => navigateTo("/Components/GDS/BreathGDS")}>
              <View style={styles.buttonWrapper}>
                <LottieView 
                  source={require('../../../../assets/lottie/BreathGDS.json')} 
                  autoPlay loop 
                  style={styles.lottie} 
                />
                <Text style={styles.buttonText}>Breathing</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateTo("/Components/GDS/MeditationGDS")}>
              <View style={styles.buttonWrapper}>
                <LottieView 
                  source={require('../../../../assets/lottie/MeditationGDS.json')} 
                  autoPlay loop 
                  style={styles.lottie} 
                />
                <Text style={styles.buttonText}>Meditation</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Second Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => navigateTo("/Components/GDS/SmileGDS")}>
              <View style={styles.buttonWrapper}>
                <LottieView 
                  source={require('../../../../assets/lottie/smileGDS.json')} 
                  autoPlay loop 
                  style={styles.lottie} 
                />
                <Text style={styles.buttonText}>Smiling Activity</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateTo("/Components/GDS/PositiveT")}>
              <View style={styles.buttonWrapper}>
                <LottieView 
                  source={require('../../../../assets/lottie/PositiveT.json')} 
                  autoPlay loop 
                  style={styles.lottie} 
                />
                <Text style={styles.buttonText}>Positive Thought</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Back Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigateTo("/Components/GDS/GDSHome")}>
              <Text style={styles.backButtonText}>BACK</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  textContainer: { marginTop: 50, alignItems: 'center', marginBottom: 20 },
  heading: { fontSize: 32, fontWeight: 'bold' },
  subHeading: { fontSize: 22, fontWeight: '500', marginTop: 10 },
  pointsText: {
    fontSize: 24,
    marginBottom: 10,
    color: '#ff4500',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  scrollView: { paddingHorizontal: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  buttonWrapper: {
    width: 160,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#016A70',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 5,
  },
  lottie: { width: 80, height: 80, marginBottom: 5 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  buttonContainer: { alignItems: 'center', marginTop: 30 },
  backButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B52B27',
    alignItems: 'center',
  },
  backButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
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
  },
  startImage1: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
  },
});

export default GDSDay8;