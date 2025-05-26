import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const DASProg = () => {
  const router = useRouter();

  const handleBack = () => {
    router.replace('/Components/DAS/DASHome');
  };
  const handleprog1 = () => {
    router.replace('/Components/DAS/Prog1UI');
  };
  const handleprog2 = () => {
   router.replace('/Components/DAS/Prog2');
  };
  const handleprog3 = () => {
    router.replace('/Components/DAS/Prog3');
  };
  const handleprog4 = () => {
   router.replace('/Components/DAS/Prog4');
  };
  const handleprog5 = () => {
   router.replace('/Components/DAS/Prog5');
  };
  const handleprog6 = () => {
   router.replace('/Components/DAS/Prog6');
  };
  const handleprog7 = () => {
    router.replace('/Components/DAS/Prog7');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Your Progress</Text>

      <ScrollView contentContainerStyle={styles.daysContainer}>
  <TouchableOpacity style={styles.dayCard} onPress={handleprog1}>
    <Ionicons name="calendar-outline" size={28} color="#ffffff" />
    <Text style={styles.dayText}>Day 1</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.dayCard} onPress={handleprog2}>
    <Ionicons name="calendar-outline" size={28} color="#ffffff" />
    <Text style={styles.dayText}>Day 2</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.dayCard} onPress={handleprog3}>
    <Ionicons name="calendar-outline" size={28} color="#ffffff" />
    <Text style={styles.dayText}>Day 3</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.dayCard} onPress={handleprog4}>
    <Ionicons name="calendar-outline" size={28} color="#ffffff" />
    <Text style={styles.dayText}>Day 4</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.dayCard} onPress={handleprog5}>
    <Ionicons name="calendar-outline" size={28} color="#ffffff" />
    <Text style={styles.dayText}>Day 5</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.dayCard} onPress={handleprog6}>
    <Ionicons name="calendar-outline" size={28} color="#ffffff" />
    <Text style={styles.dayText}>Day 6</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.dayCard} onPress={handleprog7}>
    <Ionicons name="calendar-outline" size={28} color="#ffffff" />
    <Text style={styles.dayText}>Day 7</Text>
  </TouchableOpacity>
  
</ScrollView>


      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back-outline" size={20} color="#ffffff" />
        <Text style={styles.backText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FAF4',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#016A70',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  daysContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  dayCard: {
    backgroundColor: '#016A70',
    width: '90%',
    padding: 18,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  dayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#016A70',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default DASProg;
