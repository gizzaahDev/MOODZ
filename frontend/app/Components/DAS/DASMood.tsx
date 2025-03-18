import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../ThemeContext';
import FontLoader from '../../../FontLoader';
import Svg, { Path } from 'react-native-svg';
import firestore from '@react-native-firebase/firestore';

type Mood = 'happy' | 'neutral' | 'sad';
type DayEntry = { date: Date; mood: Mood | null };

const moodRef = firestore().collection('mooddate');

const DASMood = () => {
  const { theme } = useTheme();
  const [currentDate] = useState(new Date());
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [moodCounts, setMoodCounts] = useState({ happy: 0, neutral: 0, sad: 0 });
  const daysInMonth = getDaysInMonth(currentDate);

  useEffect(() => {
    const counts = entries.reduce((acc, entry) => {
      if (entry.mood) {  
        acc[entry.mood]++;
      }
      return acc;
    }, { happy: 0, neutral: 0, sad: 0 });

    setMoodCounts(counts);
  }, [entries]);

  
  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        endDate.setHours(23, 59, 59, 999);

        const snapshot = await moodRef
          .where('date', '>=', firestore.Timestamp.fromDate(startDate))
          .where('date', '<=', firestore.Timestamp.fromDate(endDate))
          .get();

        const fetchedEntries: DayEntry[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            date: data.date.toDate(),
            mood: data.mood as Mood || null  
          };
        });

        setEntries(fetchedEntries);
      } catch (error) {
        Alert.alert('Error', 'Failed to load mood data');
      }
    };

    fetchMoodData();
  }, [currentDate]);

  function getDaysInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  const getMoodColor = (mood: Mood | null) => {
    switch (mood) {
      case 'happy': return '#4CAF50';
      case 'neutral': return '#FFC107';
      case 'sad': return '#F44336';
      default: return '#E0E0E0';
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleMoodSelect = async (day: number, mood: Mood) => {
    if (!isToday(day)) {
      Alert.alert('Info', 'You can only select mood for today!');
      return;
    }

    try {
      const selectedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      selectedDate.setHours(0, 0, 0, 0);

      const docId = selectedDate.toISOString().split('T')[0];
      const docSnapshot = await moodRef.doc(docId).get();
      
      if (docSnapshot.exists) {
        Alert.alert('Info', 'You already logged your mood for today!');
        return;
      }
     
      await moodRef.doc(docId).set({
        date: firestore.Timestamp.fromDate(selectedDate),
        mood: mood
      });

      
      setEntries(prev => [...prev, { date: selectedDate, mood }]);

      if (mood === 'happy') {
        Alert.alert('Great Choice!', 'Keep spreading positivity!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save mood. Please try again.');
    }
  };

  const showMoodPicker = (day: number) => {
    if (!isToday(day)) {
      Alert.alert('Info', 'You can only select today!');
      return;
    }

    Alert.alert(
      'Select Your Mood',
      'How are you feeling today?',
      [
        { text: '😊 Happy', onPress: () => handleMoodSelect(day, 'happy') },
        { text: '😐 Neutral', onPress: () => handleMoodSelect(day, 'neutral') },
        { text: '😢 Sad', onPress: () => handleMoodSelect(day, 'sad') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const renderPieChart = () => {
    const total = moodCounts.happy + moodCounts.neutral + moodCounts.sad;
    const happyPercentage = (moodCounts.happy / daysInMonth) * 100;
    const neutralPercentage = (moodCounts.neutral / daysInMonth) * 100;
    const sadPercentage = (moodCounts.sad / daysInMonth) * 100;

    const angles = {
      happy: (happyPercentage / 100) * 360,
      neutral: (neutralPercentage / 100) * 360,
      sad: (sadPercentage / 100) * 360
    };

    const calculateCoordinates = (angle: number) => {
      const x = 50 + 50 * Math.cos((angle - 90) * (Math.PI / 180));
      const y = 50 + 50 * Math.sin((angle - 90) * (Math.PI / 180));
      return { x, y };
    };

    return (
      <View style={styles.chartContainer}>
        <Svg width="200" height="200" viewBox="0 0 100 100">
          <Path
            d={`M50 50 L50 0 A50 50 0 ${angles.happy > 180 ? 1 : 0} 1 ${calculateCoordinates(angles.happy).x} ${calculateCoordinates(angles.happy).y} Z`}
            fill="#4CAF50"
          />
          <Path
            d={`M50 50 L${calculateCoordinates(angles.happy).x} ${calculateCoordinates(angles.happy).y} A50 50 0 ${angles.neutral > 180 ? 1 : 0} 1 ${calculateCoordinates(angles.happy + angles.neutral).x} ${calculateCoordinates(angles.happy + angles.neutral).y} Z`}
            fill="#FFC107"
          />
          <Path
            d={`M50 50 L${calculateCoordinates(angles.happy + angles.neutral).x} ${calculateCoordinates(angles.happy + angles.neutral).y} A50 50 0 ${angles.sad > 180 ? 1 : 0} 1 50 0 Z`}
            fill="#F44336"
          />
        </Svg>
        <View style={styles.chartLabels}>
          <Text style={[styles.chartLabel, { color: '#4CAF50' }]}>
            😊 {happyPercentage.toFixed(1)}%
          </Text>
          <Text style={[styles.chartLabel, { color: '#FFC107' }]}>
            😐 {neutralPercentage.toFixed(1)}%
          </Text>
          <Text style={[styles.chartLabel, { color: '#F44336' }]}>
            😢 {sadPercentage.toFixed(1)}%
          </Text>
        </View>
      </View>
    );
  };

  const renderCalendar = () => {
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return (
      <View style={styles.calendarGrid}>
        {days.map(day => {
          const entry = entries.find(e => 
            e.date.getDate() === day && 
            e.date.getMonth() === currentDate.getMonth()
          );
          
          const isTodayDay = isToday(day);

          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayCell,
                { 
                  backgroundColor: getMoodColor(entry?.mood ?? null),
                  opacity: isTodayDay ? 1 : 0.5
                }
              ]}
              onPress={() => showMoodPicker(day)}
              disabled={!isTodayDay}
              >
              <Text style={[
                styles.dayText,
                { color: isTodayDay ? '#000' : '#666' }
              ]}>
                {day}
              </Text>
              {isTodayDay && <View style={styles.todayIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
            
             

  return (
    <FontLoader>
      <View style={[styles.container, { backgroundColor: "white" }]}>
        <Text style={[styles.title, { color: "black" }]}>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
        
        {renderCalendar()}

        <View style={styles.counterContainer}>
          <View style={styles.counterItem}>
            <Text style={[styles.counterText, { color: '#4CAF50' }]}>
              😊 {moodCounts.happy}
            </Text>
          </View>
          <View style={styles.counterItem}>
            <Text style={[styles.counterText, { color: '#FFC107' }]}>
              😐 {moodCounts.neutral}
            </Text>
          </View>
          <View style={styles.counterItem}>
            <Text style={[styles.counterText, { color: '#F44336' }]}>
              😢 {moodCounts.sad}
            </Text>
          </View>
        </View>

        {renderPieChart()}

        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: "black" }]}
          onPress={() => router.replace('/Components/DAS/DASday2')}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            Back 
          </Text>
        </TouchableOpacity>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 2,
    position: 'relative',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
  },
  todayIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2196F3',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  counterItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 15,
  },
  chartLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DASMood;