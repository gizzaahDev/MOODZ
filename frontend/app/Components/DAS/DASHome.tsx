import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const DASHome = () => {
  const router = useRouter(); // Initialize the router
  const images = [
    require('../../../assets/images/gettingstart.png'),
    require('../../../assets/images/EPDSwel04.png'),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle day button press
  const handleDayPress = (day: number) => {
    switch (day) {
      case 1:
        router.replace('/Components/DAS/DASday1');
        break;
      case 2:
        router.replace('/Components/DAS/DASday2'); 
        break;
      case 3:
        router.replace('/Components/DAS/DASday3'); 
        break;
      case 4:
        router.replace('/Components/DAS/DASday4'); 
        break;
      case 5:
        router.replace('/Components/DAS/DASday5'); 
        break;
      case 6:
        router.replace('/Components/DAS/DASday6'); 
        break;
      case 7:
        router.replace('/Components/DAS/DASday7'); 
        break;
      default:
        console.log('Invalid day');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [images.length]);

  return (
    <View style={styles.startcontainer}>
      <View style={styles.textcontainer}>
        <Text style={styles.text_welcome}>WELCOME</Text>

        <View style={styles.imgcontainer}>
          <Image
            source={images[currentImageIndex]}
            style={styles.startImage}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView1}>
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => handleDayPress(day)}
            style={styles.buttonWrapper}
          >
            <Text style={styles.buttonText1}>Day {day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  startcontainer: {
    flex: 1,
    backgroundColor: '#016A70', // Background color for the entire screen
  },
  textcontainer: {
    marginTop: 70,
    padding: 16,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgcontainer: {
    width: '90%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 15,
    borderColor: '#016A70',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  startImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text_welcome: {
    fontFamily: 'asul',
    fontSize: 35,
    marginBottom: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollView1: {
    marginTop: 0,
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    borderRadius: 15,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DC183',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText1: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default DASHome;