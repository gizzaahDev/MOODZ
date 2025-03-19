import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Modal, ScrollView } from 'react-native';
import { useTheme } from '../../ThemeContext';
import LottieView from 'lottie-react-native';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const PositiveT = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [positiveThought, setPositiveThought] = useState('');
  const [thoughts, setThoughts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveThought = async () => {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      Alert.alert("Authentication Error", "You must be logged in to save your thoughts.");
      return;
    }

    if (positiveThought.trim() === '') {
      Alert.alert("Input Error", "Please write a positive thought before saving.");
      return;
    }

    try {
      const userRef = firestore().collection('UsersGDS').doc(userId);
      const thoughtsRef = userRef.collection('positive_thoughts');
      
      await thoughtsRef.add({
        thought: positiveThought,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      // Update points system
      const userDoc = await userRef.get();
      const data = userDoc.data() || { points: 0 };
      await userRef.set(
        { points: (data.points || 0) + 1 },
        { merge: true }
      );

      Alert.alert("Success", "Your positive thought has been saved and you've earned a point!");
      setPositiveThought('');
    } catch (error) {
      console.error("Error saving positive thought: ", error);
      Alert.alert("Error", "There was an issue saving your thought. Please try again.");
    }
  };

  const fetchThoughts = async () => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;

    try {
      const snapshot = await firestore()
        .collection('UsersGDS')
        .doc(userId)
        .collection('positive_thoughts')
        .orderBy('timestamp', 'desc')
        .get();

      const thoughtsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        formattedDate: doc.data().timestamp 
          ? moment(doc.data().timestamp.toDate()).format('MMMM DD, YYYY - HH:mm A') 
          : 'Unknown Date',
      }));

      setThoughts(thoughtsList);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching thoughts:", error);
    }
  };

  const handleBackPress = () => {
    router.replace("/Components/GDS/GDSHome");
  };

  return (
    <FontLoader>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, { color: theme.textPrimary }]}>Positive Thought</Text>
          <LottieView source={require('../../../assets/lottie/positiveGDS.json')} autoPlay loop style={styles.animation} />
          <TextInput style={styles.input}
  placeholder="Write your positive thought"
  value={positiveThought}
  onChangeText={setPositiveThought}
/>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveThought}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewButton} onPress={fetchThoughts}>
          <Text style={styles.buttonText}>VIEW</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>

        {/* MODAL FOR DISPLAYING POSITIVE THOUGHTS */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Saved Positive Thoughts</Text>
              <ScrollView style={styles.modalScroll}>
                {thoughts.length > 0 ? (
                  thoughts.map(item => (
                    <View key={item.id} style={styles.thoughtItem}>
                      <Text style={styles.thoughtText}>{item.thought}</Text>
                      <Text style={styles.thoughtDate}>{item.formattedDate}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noThoughtsText}>No thoughts saved yet.</Text>
                )}
              </ScrollView>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#E6F7F2',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  animation: {
    width: 300,
    height: 250,
    marginBottom: 20,
    
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,

    paddingHorizontal: 18,
    width: '80%',
    borderColor: '#016A70',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    height: '20%',
  },

  saveButton: {
    backgroundColor: '#016A70',
    borderRadius: 12,
    width: '80%',
    padding: 15,
    alignItems: 'center',
    marginVertical: 15,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  viewButton: {
    backgroundColor: '#008CBA',
    borderRadius: 12,
    width: '80%',
    padding: 15,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#008CBA',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 12,
    width: '80%',
    padding: 15,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#FF5A5F',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 16,
    width: '85%',
    maxHeight: '80%',
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    fontFamily: 'Roboto-Bold',
  },
  modalScroll: {
    width: '100%',
  },
  thoughtItem: {
    backgroundColor: '#F4F4F4',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  thoughtText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
  },
  thoughtDate: {
    fontSize: 13,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 5,
  },
  closeButton: {
    backgroundColor: '#FF5A5F',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  noThoughtsText: {
    fontSize: 16,
    color: '#777',
    fontStyle: 'italic',
  },
});

export default PositiveT;