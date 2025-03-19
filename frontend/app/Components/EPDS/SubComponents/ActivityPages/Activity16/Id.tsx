import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../../../../../ThemeContext';


const MeditationHome = () => {
  const [totalDays, setTotalDays] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [meditationDates, setMeditationDates] = useState<{ [key: string]: { selected: boolean; selectedColor: string } }>({});

  const userId = auth().currentUser?.uid;
  const { theme } = useTheme() as { theme: any };

  useEffect(() => {
    if (userId) {
      fetchProgress();
      fetchCommunityStats();
    }
  }, [userId]);

  const fetchCommunityStats = async () => {
    try {
      const communityRef = firestore().collection('Community');
      const snapshot = await communityRef.where('userId', '==', userId).get();
      setQuestionCount(snapshot.size);

      let totalComments = 0;
      snapshot.forEach(doc => {
        const answers = doc.data().answers || [];
        totalComments += answers.length;
      });
      setCommentCount(totalComments);
    } catch (error) {
      console.error('Error fetching community stats:', error);
    }
  };

  const fetchProgress = async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) return;

      const today = new Date().toISOString().split('T')[0];
      const userRef = firestore()
        .collection('UsersEpds')
        .doc(userId)
        .collection('CompletedActivities')
        .doc(today);

      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const data = userDoc.data();
        const walkingTask = data?.walkingTask || {};

        // Get all recorded dates
        const dates = Object.keys(walkingTask);

        // Calculate total days walked
        setTotalDays(dates.length);

        // Get today's session data
        const todayData = walkingTask[today] || { 
          totalDays: 0,
          streakDays: 0, 
          playCount: 0
        };

        setStreakDays(todayData.streakDays || 0);
        setPlayCount(todayData.playCount || 0);

        // Format walking dates for the calendar
        const markedDates: { [key: string]: { selected: boolean; selectedColor: string } } = {};
        dates.forEach((date) => {
          markedDates[date] = { selected: true, selectedColor: '#016A70' };
        });
        setMeditationDates(markedDates);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };


  const recordMeditation = async () => {
    router.push('/Components/EPDS/SubComponents/ActivityPages/Activity16/SocialInteraction');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.subMiniContainer]}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>Postpartum Community</Text>
      <Text style={[styles.guidelines, { color: theme.textSecondary }]}>
        Share your experiences, ask questions, and connect with other parents in our supportive community. Your voice matters.
      </Text>
      <ScrollView>
        {/* Progress Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.containerSub}>
            <Text style={[styles.progressText, { color: theme.textPrimary }]}>
              Total Days: {totalDays}
            </Text>
            <Text style={[styles.progressText, { color: theme.textPrimary }]}>
              Questions Posted: {questionCount}
            </Text>
            <Text style={[styles.progressText, { color: theme.textPrimary }]}>
              Comments Made: {commentCount}
            </Text>
          </View>
        </View>

        {/* Calendar */}
        <Text style={[styles.progressSubTitle, { color: theme.textPrimary }]}>
            Activity Completed Days
          </Text>
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={meditationDates}
            theme={{
              // calendarBackground: theme.background,
              calendarBackground: "#fff",
              selectedDayBackgroundColor: '#016A70', // Primary color
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#016A70', // Primary color
              dayTextColor: theme.textPrimary,
              textDisabledColor: "#ccc",
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={recordMeditation}>
          <Text style={styles.buttonText}>Start Meditation</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  subMiniContainer:{
    margin:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  guidelines: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  containerSub: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    width:200,
    letterSpacing: 0.5,
    lineHeight: 28,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 4,    
  },
  progressSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 50,
  },
  button: {
    backgroundColor: '#016A70',  // Primary color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5, // for Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calendarContainer: {
    width: '100%',
    marginBottom: 40,
    // elevation: 5,
  },
});

export default MeditationHome;