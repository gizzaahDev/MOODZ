import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const GDSHome = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [userPoints, setUserPoints] = useState(0);
  const [currentDate, setCurrentDate] = useState<string>("");

  const images = [
    require('../../../assets/images/HappyGDS.jpg'),
    require('../../../assets/images/HappyGDS1.jpg'),
    require('../../../assets/images/HappyGDS2.jpg'),
    require('../../../assets/images/HappyGDS3.jpg'),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (path: string) => router.replace(path);

  // Fetch user data (name and points)
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        setUserName(name || "User");

        const userId = auth().currentUser?.uid;
        if (userId) {
          const userRef = firestore().collection('UsersGDS').doc(userId);
          const userDoc = await userRef.get();
          const data = userDoc.data();
          if (data && data.points !== undefined) {
            setUserPoints(data.points);
          }
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
    
    // Set current date
    const date = new Date();
    const formattedDate = `${date.toLocaleString('default', { weekday: 'long' })}, ${date.toLocaleDateString()}`;
    setCurrentDate(formattedDate);
  }, []);

  return (
    <FontLoader>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        
        {/* Title */}
        <Text style={[styles.title, { color: theme.textPrimary }]}>Your 10-Day Plan</Text>

        {/* Display current date */}
        <Text style={[styles.dateText,]}>{currentDate}</Text>

        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <Image source={images[currentImageIndex]} style={styles.image} />
        </View>

        {/* Display user's name and points */}
        <Text style={[styles.greeting, { color: theme.textPrimary, flexWrap: 'wrap', maxWidth: 250 }]}>
          Hello, <Text style={[styles.userName, { color: theme.title, }]}>{userName}</Text>
        </Text>
        <Text style={styles.pointsText}>Points: {userPoints}/40</Text>

        {/* Days Grid - One Button Per Row */}
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {Array.from({ length: 10 }, (_, i) => (
            <TouchableOpacity 
              key={i + 1} 
              style={styles.dayButton} 
              onPress={() => navigateTo(i === 0 ? "/Components/GDS/GDSDay1"
                : i === 1 ? "/Components/GDS/Day2/GDSDay2" 
                : i === 2 ? "/Components/GDS/Day2/GDSDay3" 
                : i === 3 ? "/Components/GDS/Day2/GDSDay4" 
                : i === 4 ? "/Components/GDS/Day2/GDSDay5"
                : i === 5 ? "/Components/GDS/Day2/GDSDay6"
                : i === 6 ? "/Components/GDS/Day2/GDSDay7"
                : i === 7 ? "/Components/GDS/Day2/GDSDay8"
                : i === 8 ? "/Components/GDS/Day2/GDSDay9"
                : i === 9? "/Components/GDS/Day2/GDSDay10"
                : "/Components/GDS/GDSDay1")}>
              <Text style={styles.dayText}>Day {i + 1}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingVertical: 20 },
  
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  
  dateText: {
    fontSize: 18,  
    fontWeight: '500', 
    marginBottom: 15, 
    color: '#016A70',
 },

  imageContainer: {
    width: 350,
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#016A70',
    marginBottom: 20,
  },

  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#016A70',
  },

  image: { width: '100%', height: '100%', resizeMode: 'cover' },

  pointsText: {
    fontSize: 26,  // Slightly larger for better visibility
    marginBottom: 20,
    color: '#ff4500',  // A vibrant color that complements the theme
    textShadowOffset: { width: 1, height: 1 },  // Creates a slight shadow
    textShadowRadius: 4,  // Softens the shadow for better effect
  },

  gridContainer: {
    alignItems: 'center', // Center the buttons horizontally
    gap: 15,
  },

  dayButton: {
    width: 320, // Adjust width to be larger for better visibility
    height: 80,
    backgroundColor: '#016A70',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 4, // Space between buttons
  },

  dayText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
});

export default GDSHome;