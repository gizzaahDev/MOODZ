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
  const [sessionDurations, setSessionDurations] = useState<number[]>([]);
  const [meditationDates, setMeditationDates] = useState<{ [key: string]: { selected: boolean; selectedColor: string } }>({});

  const userId = auth().currentUser?.uid;
  const { theme } = useTheme() as { theme: any };

  useEffect(() => {
    if (userId) {
      fetchProgress();
    }
  }, [userId]);

  const fetchProgress = async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) return;

      // Get the date for today
      const today = new Date().toISOString().split('T')[0];

      // Reference to the document for today's activity under 'CompletedActivities' subcollection
      const userRef = firestore().collection('UsersEpds').doc(userId).collection('CompletedActivities').doc(today);

      // Fetch the user's meditation data for today
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const data = userDoc.data();
        const meditationHistoryBreathing = data?.meditationHistoryBreathing || {};

        // Get all recorded dates
        const dates = Object.keys(meditationHistoryBreathing);

        // Calculate total days meditated
        setTotalDays(dates.length);

        // Get today's session data (today's session if exists)
        const todayData = meditationHistoryBreathing[today] || { streakDays: 0, playCount: 0, sessionDurations: [] };

        setStreakDays(todayData.streakDays || 0);
        setPlayCount(todayData.playCount || 0);
        setSessionDurations((todayData.sessionDurations || []).map((duration: number) =>
          parseFloat((duration / (60 * 1000)).toFixed(2)) // Convert duration from ms to minutes
        ));

        // Format meditation dates for the calendar
        const markedDates: { [key: string]: { selected: boolean; selectedColor: string } } = {};
        dates.forEach((date) => {
          markedDates[date] = { selected: true, selectedColor: '#016A70' }; // Use primary color
        });
        setMeditationDates(markedDates);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };


  const recordMeditation = async () => {
    router.push('/Components/EPDS/SubComponents/ActivityPages/Activity02/BreathingEx');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.subMiniContainer]}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>Breathing Exercise</Text>
      <Text style={[styles.guidelines, { color: theme.textSecondary }]}>
        Focus on deep breathing and staying present. Follow the instructions during the meditation.
      </Text>
      <ScrollView>
        {/* Progress Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.containerSub}>
            <Text style={[styles.progressText, { color: theme.textPrimary }]}>
              Total Days: {totalDays}
            </Text>
            <Text style={[styles.progressText, { color: theme.textPrimary }]}>
              Streak: {streakDays} days
            </Text>
            <Text style={[styles.progressText, { color: theme.textPrimary }]}>
              Play Count: {playCount}
            </Text>
          </View>



          <Text style={[styles.progressSubTitle, { color: theme.textPrimary }]}>
            Session Durations
          </Text>
          <View style={styles.durationsContainer}>
          {sessionDurations.length > 0 ? (
        <View style={styles.durationsWrapper}>
            {sessionDurations.map((duration, index) => (
                <View key={index} style={styles.subContainer}>
                    <Text style={[styles.durationsText, { color: theme.textPrimary }]}>
                        {duration} Min
                    </Text>
                </View>
            ))}
        </View>
    ) : (
        <Text style={[styles.noRecordsText, ]}>
            No records available...
        </Text>
    )}
          </View>

        </View>

        {/* Start Meditation Button */}


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
  durationsContainer: {
    height: 'auto',
    padding:10,
    margin:5,
    
    borderRadius: 8,
    backgroundColor: '#ffffff', // Add a background color to the container
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 4,
  },
  durationsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  subContainer: {
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f0f0f0', // Add a background color to the sub-containers
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    
    elevation: 2, // for Android
  },

  durationsText: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  noRecordsText: {
    fontSize: 14,
    
    color: '#888', // Light gray to indicate no records
    
    
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