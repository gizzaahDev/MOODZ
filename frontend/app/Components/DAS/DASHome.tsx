import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const DASHome = () => {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;

  const images = [
    require('../../../assets/images/gettingstart.png'),
    //require('../../../assets/images/EPDSwel04.png'),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);

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
        router.replace('/Components/DAS/DASact4');
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
        console.warn('Invalid day selected');
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const newIndex = Math.max(scrollIndex - 1, 0);
      scrollRef.current.scrollTo({ x: newIndex * 180, animated: true });
      setScrollIndex(newIndex);
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const newIndex = Math.min(scrollIndex + 1, 6);
      scrollRef.current.scrollTo({ x: newIndex * 180, animated: true });
      setScrollIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textWelcome}>WELCOME</Text>
        <View style={styles.imageContainer}>
          <Image source={images[currentImageIndex]} style={styles.image} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>      Start Your Healing Journey</Text>
      <View style={styles.dayScrollContainer}>
        <TouchableOpacity onPress={handleScrollLeft} style={styles.scrollArrow}>
          <Ionicons name="chevron-back" size={28} color="#016A70" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayButtons}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <TouchableOpacity
              key={day}
              style={styles.dayButton}
              onPress={() => handleDayPress(day)}
            >
              <Text style={styles.dayText}>Day {day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={handleScrollRight} style={styles.scrollArrow}>
          <Ionicons name="chevron-forward" size={28} color="#016A70" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.progressButton}
          onPress={() => router.replace('/Components/DAS/DASAbout2')}
        >
          <Ionicons name="bar-chart-outline" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.progressText}>Your Progress</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FAF4',
  },
  textContainer: {
    marginTop: 60,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  textWelcome: {
    fontFamily: 'asul',
    fontSize: 36,
    color: '#016A70',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '90%',
    height: 380,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderColor: '#016A70',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#016A70',
    marginLeft: 20,
    marginTop: 20,
  },
  dayScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 8,
  },
  scrollArrow: {
    padding: 10,
  },
  dayButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 10,
  },
  dayButton: {
    width: 160,
    height: 100,
    backgroundColor: '#016A70',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dayText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  progressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#016A70',
    paddingVertical: 16,
    borderRadius: 18,
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  progressText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DASHome;
