import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import firestore from '@react-native-firebase/firestore';

const Prog7 = () => {
  const [moyoga, setMoCount] = useState(0);
  const [pyoga, setPartCount] = useState(0);
  const [myoga, setMobCount] = useState(0);
  const [fyoga, setFitCount] = useState(0);
  const [ayoga, setAdCount] = useState(0);
  const router = useRouter();


  const getCountByName = (activities: any[], name: string) =>
    activities.find(a => a.name.trim().toLowerCase() === name.trim().toLowerCase())?.count || 0;

  useEffect(() => {
    const fetchActivityCounts = async () => {
      try {
        const doc = await firestore().collection('activities').doc('Day 7').get();
        const data = doc.data();

        if (data && data.activities) {
          console.log("Fetched Activities:", data.activities.map((a: any) => a.name)); // debug

          setMoCount(getCountByName(data.activities, 'MOODZ Yoga Challenge'));
          setPartCount(getCountByName(data.activities, 'Partner Yoga - Beginners'));
          setMobCount(getCountByName(data.activities, 'Mobility Based Yoga'));
          setFitCount(getCountByName(data.activities, 'Fitness Based Yoga'));
          setAdCount(getCountByName(data.activities, 'Partner Yoga - Advanced'));
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };

    fetchActivityCounts();
  }, []);

  const renderActivity = (title: string, count: number, icon: any, color: string) => (
    <View style={styles.activityCard}>
      <View style={styles.iconRow}>
        <Ionicons name={icon} size={28} color={color} />
        <Text style={styles.activityTitle}>{title}</Text>
      </View>
      <Text style={styles.countText}>Completed: {count} time(s)</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${Math.min(count * 20, 100)}%`, backgroundColor: color }]} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Day 7 Activities</Text>

      {renderActivity('MOODZ Yoga Challenge', moyoga, 'trophy-outline', '#016A70')}
      {renderActivity('Partner Yoga - Beginners', pyoga, 'people-outline', '#016A70')}
      {renderActivity('Mobility Based Yoga', myoga, 'body-outline', '#016A70')}
      {renderActivity('Fitness Based Yoga', fyoga, 'barbell-outline', '#016A70')}
      {renderActivity('Partner Yoga - Advanced', ayoga, 'rocket-outline', '#016A70')}

      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/Components/DAS/DASProg')}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FAF4',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#016A70',
    marginBottom: 25,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  countText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 15,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
  backButton: {
    marginTop: 'auto',
    backgroundColor: '#016A70',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 4,
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Prog7;
