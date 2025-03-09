import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const GDSHome = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();

  const images = [
    require('../../../assets/images/GDSHome2.jpg'),
    require('../../../assets/images/GDSHome3.jpg'),
    require('../../../assets/images/GDSHome4.jpg'),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (path: string) => router.replace(path);

  return (
    <FontLoader>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        
        {/* Title */}
        <Text style={[styles.title, { color: theme.textPrimary }]}>Your 10-Day Plan</Text>

        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <Image source={images[currentImageIndex]} style={styles.image} />
        </View>

        {/* Days Grid - One Button Per Row */}
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {Array.from({ length: 10 }, (_, i) => (
            <TouchableOpacity 
              key={i + 1} 
              style={styles.dayButton} 
              onPress={() => navigateTo(i === 0 ? "/Components/GDS/GDSDay1" : i === 1 ? "/Components/GDS/Day2/GDSDay2" : "/Components/GDS/GDSDay1")}
            >
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
  
  imageContainer: {
    width: 350,
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#016A70',
    marginBottom: 20,
  },

  image: { width: '100%', height: '100%', resizeMode: 'cover' },

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