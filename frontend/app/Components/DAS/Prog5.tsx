import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import firestore from '@react-native-firebase/firestore';

const questions = [
  'Leadership & Responsibility',
  'Love & Commitment',
  'Growth & Resillience',
  'Self-Love & Empowerment',
  'Marriage & Partnership',
  'Strenght & Resillience',
];

const Prog5 = () => {
  const [selected, setSelected] = useState<boolean[]>(Array(questions.length).fill(false));
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const router = useRouter();

  const toggleCheckbox = (index: number) => {
    const updated = [...selected];
    updated[index] = !updated[index];
    setSelected(updated);
  };

  const handleSubmit = async () => {
    const responseData: { [key: string]: boolean | any } = {};
    questions.forEach((q, i) => {
      responseData[`question_${i + 1}`] = selected[i];
    });
    responseData.timestamp = firestore.FieldValue.serverTimestamp();

    try {
      await firestore().collection('activities').add(responseData);
      setSubmitted(true);
      loadAllSubmissions(); // reload updated list
    } catch (error) {
      console.error('Error saving answers:', error);
      Alert.alert('Error', 'Failed to save your answers. Please try again.');
    }
  };

  const loadAllSubmissions = async () => {
    try {
      const snapshot = await firestore()
        .collection('activities')
        .orderBy('timestamp', 'desc')
        .get();

      const submissions = snapshot.docs.map(doc => doc.data());
      setHistory(submissions);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  useEffect(() => {
    loadAllSubmissions();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Day 5</Text>
      <Text style={styles.subheading}>Select what makes you more healing</Text>

      {questions.map((q, i) => (
        <TouchableOpacity key={i} style={styles.checkboxRow} onPress={() => toggleCheckbox(i)}>
          <Ionicons
            name={selected[i] ? 'checkbox-outline' : 'square-outline'}
            size={24}
            color="#016A70"
          />
          <Text style={styles.questionText}>{q}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      {submitted && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Best Healed Quotes:</Text>
          {selected.map((isSelected, index) =>
            isSelected ? (
              <Text key={index} style={styles.resultItem}>
                - {questions[index]}
              </Text>
            ) : null
          )}
        </View>
      )}

      {history.length > 0 && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>All Previous Submissions:</Text>
          {history.map((item, idx) => (
            <View key={idx} style={{ marginBottom: 10 }}>
              <Text style={{ color: '#016A70', fontWeight: '600' }}>
                Submission {idx + 1}
              </Text>
              {questions.map((q, i) =>
                item[`question_${i + 1}`] ? (
                  <Text key={i} style={styles.resultItem}>- {q}</Text>
                ) : null
              )}
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/Components/DAS/DASProg')}>
        <Ionicons name="arrow-back-outline" size={22} color="#fff" />
        <Text style={styles.submitText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3FAF4',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#016A70',
    marginBottom: 5,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#016A70',
    marginBottom: 25,
    textAlign: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  questionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#016A70',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 4,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 25,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#016A70',
    marginBottom: 10,
  },
  resultItem: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },
  backButton: {
    backgroundColor: '#016A70',
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 4,
  },
});

export default Prog5;
