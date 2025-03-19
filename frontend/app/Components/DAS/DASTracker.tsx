import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRouter } from 'expo-router';

interface Activity {
  name: string;
  count: number;
}

interface DayData {
  day: string;
  activities: Activity[];
}

const DASTracker = () => {
  const [days, setDays] = useState<DayData[]>([]);
  const router = useRouter();

  // Real-time Firestore listener
  useEffect(() => {
    const unsubscribe = firestore().collection('activities')
      .onSnapshot(querySnapshot => {
        const loadedDays: DayData[] = [];
        querySnapshot.forEach(doc => {
          loadedDays.push({
            day: doc.id,
            activities: doc.data()?.activities || []
          });
        });
        setDays(loadedDays.sort((a, b) => 
          parseInt(a.day.split(' ')[1]) - parseInt(b.day.split(' ')[1])
        ));
      }, error => {
        Alert.alert('Error', 'Failed to load activity data');
      });

    return () => unsubscribe();
  }, []);

  const handleBackPress = () => {
    router.replace('/Components/DAS/DASAbout2'); // Update with your actual home route
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Activity Tracker</Text>
        
        {days.map((day) => (
          <View key={day.day} style={styles.dayCard}>
            <Text style={styles.dayHeader}>{day.day}</Text>
            
            {day.activities.map((activity, index) => (
              <View key={`${day.day}-${index}`} style={styles.activityRow}>
                <Text style={styles.activityName}>{activity.name}</Text>
                <Text style={styles.activityCount}>{activity.count}</Text>
              </View>
            ))}
            
            {day.activities.length === 0 && (
              <Text style={styles.noActivities}>No activities recorded yet</Text>
            )}
          </View>
        ))}

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#9DC183',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80, 
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 25,
    textAlign: 'center',
  },
  dayCard: {
    backgroundColor: '#016A70',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  dayHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
    paddingBottom: 8,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  activityName: {
    fontSize: 16,
    color: 'white',
    flex: 2,
  },
  activityCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'right',
  },
  noActivities: {
    color: '#95A5A6',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
  backButton: {
    backgroundColor: '#272727',
    padding: 15,
    borderRadius: 50,
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DASTracker;