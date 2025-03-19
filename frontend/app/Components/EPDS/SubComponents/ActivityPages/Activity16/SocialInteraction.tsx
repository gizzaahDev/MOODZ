import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CommunityPage = () => {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState('User');
  const [showAnswers, setShowAnswers] = useState({});
  const [answersInput, setAnswersInput] = useState({});
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const photoURL = await AsyncStorage.getItem('userPhotoURL');
        const name = await AsyncStorage.getItem('userName');

        setProfileImage(photoURL || null);
        setUserName(name || 'User');
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Community')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        const questionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(questionsData);
      });

    return () => unsubscribe();
  }, []);

  const addQuestion = async () => {
    if (!question.trim()) return;

    await firestore()
      .collection('Community')
      .add({
        text: question,
        userId,
        userName,
        profileImage,
        timestamp: firestore.FieldValue.serverTimestamp(),
        likes: [],
        answers: [],
      });

    setQuestion('');
  };

  const addAnswer = async (questionId, answer) => {
    if (!answer.trim()) {
      console.log('Answer is empty');
      return;
    }

    try {
      const newAnswer = {
        text: answer,
        userId,
        userName,
        profileImage,
        timestamp: Date.now(),
      };

      await firestore()
        .collection('Community')
        .doc(questionId)
        .update({
          answers: firestore.FieldValue.arrayUnion(newAnswer),
        });

      console.log('Answer added successfully');

      const questionRef = firestore().collection('Community').doc(questionId);
      const questionDoc = await questionRef.get();
      const answers = questionDoc.data().answers;

      const answerIndex = answers.findIndex(
        (ans) => ans.timestamp === newAnswer.timestamp
      );

      if (answerIndex !== -1) {
        answers[answerIndex].timestamp = firestore.FieldValue.serverTimestamp();

        await questionRef.update({
          answers: answers,
        });

        console.log('Timestamp updated to serverTimestamp');
      }
    } catch (error) {
      console.error('Failed to add answer:', error);
    }
  };

  const likeQuestion = async (questionId) => {
    const questionRef = firestore().collection('Community').doc(questionId);
    const doc = await questionRef.get();
    const likes = doc.data()?.likes || [];

    if (likes.includes(userId)) {
      // Unlike
      await questionRef.update({
        likes: firestore.FieldValue.arrayRemove(userId),
      });
    } else {
      // Like
      await questionRef.update({
        likes: firestore.FieldValue.arrayUnion(userId),
      });
    }
  };

  const toggleAnswers = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const renderQuestion = ({ item }) => (
    <View style={styles.questionContainer}>
      <View style={styles.questionHeader}>
        <Image
          source={{ uri: item.profileImage || 'https://i.pravatar.cc/150' }}
          style={styles.profilePicture}
        />
        <View style={styles.questionContent}>
          <Text style={styles.userName}>
            {item.userId === userId ? 'You' : item.userName}
          </Text>
          <Text style={styles.questionText}>{item.text}</Text>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => likeQuestion(item.id)}
        >
          <Icon name="favorite" size={20} color={item.likes.includes(userId) ? "#FF4B4B" : "#666"} />
          <Text style={styles.actionText}>{item.likes.length}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => toggleAnswers(item.id)}
        >
          <Icon name="chat-bubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{item.answers.length}</Text>
        </TouchableOpacity>
      </View>

      {showAnswers[item.id] && (
        <View style={styles.answersSection}>
          <View style={styles.answerInputContainer}>
            <TextInput
              style={styles.answerInput}
              placeholder="Write a comment..."
              placeholderTextColor="#999"
              value={answersInput[item.id] || ''}
              onChangeText={(text) =>
                setAnswersInput((prev) => ({ ...prev, [item.id]: text }))
              }
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={async () => {
                if (answersInput[item.id]?.trim()) {
                  await addAnswer(item.id, answersInput[item.id]);
                  setAnswersInput((prev) => ({ ...prev, [item.id]: '' }));
                }
              }}
            >
              <Icon name="send" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>

          {item.answers.map((answer, index) => (
            <View key={index} style={styles.answerContainer}>
              <Image
                source={{ uri: answer.profileImage || 'https://i.pravatar.cc/150' }}
                style={styles.answerProfilePic}
              />
              <View style={styles.answerContent}>
                <Text style={styles.answerUserName}>
                  {answer.userId === userId ? 'You' : answer.userName}
                </Text>
                <Text style={styles.answerText}>{answer.text}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: profileImage || 'https://i.pravatar.cc/150' }}
          style={styles.headerProfilePic}
        />
        <Text style={styles.headerTitle}>Community</Text>
      </View>

      <View style={styles.questionInputContainer}>
        <TextInput
          style={styles.questionInput}
          placeholder="What's on your mind?"
          placeholderTextColor="#999"
          value={question}
          onChangeText={setQuestion}
          multiline
        />
        <TouchableOpacity 
          style={styles.postButton}
          onPress={addQuestion}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.questionsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  questionInputContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  questionInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 12,
    minHeight: 60,
  },
  postButton: {
    backgroundColor: '#016A70',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  questionsContainer: {
    padding: 16,
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  questionContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  questionText: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666666',
  },
  answersSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  answerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  answerInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    paddingVertical: 8,
  },
  sendButton: {
    padding: 8,
  },
  answerContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  answerProfilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  answerContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
  },
  answerUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  answerText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
  },
});

export default CommunityPage;