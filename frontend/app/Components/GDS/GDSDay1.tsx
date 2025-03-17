import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import FontLoader from '../../../FontLoader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const GDSDay1 = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [userPoints, setUserPoints] = useState(0);

  // Fetch user points from Firestore
  useEffect(() => {
    const userId = auth().currentUser?.uid;
    if (userId) {
      const userRef = firestore().collection('UsersGDS').doc(userId);
      const unsubscribe = userRef.onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data?.points !== undefined) {
            setUserPoints(data.points);
          }
        }
      });

      return () => unsubscribe(); // Cleanup listener
    }
  }, []);

  const navigateTo = (path: string) => {
    router.replace(path);
  };

  return (
    <FontLoader>
      <View style={[styles.container, { backgroundColor: theme.background }]}>

        {/* Title */}
        <View style={styles.textContainer}>
          <Text style={[styles.heading, { color: theme.textPrimary }]}>Day 01</Text>

          {/* Image Container */}
          <View style={styles.imgcontainerday1}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={[styles.startImage1, theme.imageStyle]} // Apply theme-based styles
            />
          </View>

          {/* Display User Points */}
          <Text style={styles.pointsText}>Points: {userPoints}/40</Text>

          <Text style={[styles.subHeading, { color: theme.textPrimary }]}>How are you feeling today?</Text>
        </View>

        <ScrollView style={styles.scrollView}>

          {/* First Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => navigateTo("/Components/GDS/Music1")}>
              <View style={styles.buttonWrapper}>
                <LottieView 
                  source={require('../../../assets/lottie/musicGDS.json')} 
                  autoPlay loop 
                  style={styles.lottie} 
                />
                <Text style={styles.buttonText}>Music Therapy</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateTo("/Components/GDS/Yoga1")}>
              <View style={styles.buttonWrapper}>
                <LottieView 
                  source={require('../../../assets/lottie/yogaGDS.json')} 
                  autoPlay loop 
                  style={styles.lottie} 
                />
                <Text style={styles.buttonText}>Yoga Exercises</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Second Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => navigateTo("/Components/GDS/SmileGDS")}>
              <View style={styles.buttonWrapper}>
                <LottieView 
                  source={require('../../../assets/lottie/smileGDS.json')} 
                  autoPlay loop 
                  style={styles.lottie} 
                />
                <Text style={styles.buttonText}>Smiling Activity</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateTo("/Components/GDS/PositiveT")}>
              <View style={styles.buttonWrapper}>
                <LottieView 
                  source={require('../../../assets/lottie/PositiveT.json')} 
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

  pointsText: {
    fontSize: 24, 
    marginBottom: 10,
    color: '#ff4500', // Vibrant color for visibility
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});

export default GDSDay1;