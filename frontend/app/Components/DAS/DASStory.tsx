import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';
import firestore from '@react-native-firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

interface Story {
  id: string;
  name: string;
  title: string;
  story: string;
  createdAt: Date;
}

const StoryScreen = () => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const snapshot = await firestore().collection('stories').orderBy('createdAt', 'desc').get();
    setStories(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    }) as Story));
  };

  const handleSave = async () => {
    if (!name.trim() || !title.trim() || !story.trim()) {
      setError('Please fill all fields');
      return;
    }

    try {
      await firestore().collection('stories').add({
        name,
        title,
        story,
        createdAt: new Date()
      });

      Alert.alert('Success', 'The story has been saved!');
      setName('');
      setTitle('');
      setStory('');
      setError('');
      fetchStories();
    } catch (err) {
      Alert.alert('Error', 'Failed to save story');
    }
  };

  const handleDelete = async (storyId: string) => {
    Alert.alert(
      'Delete Story',
      'Are you sure you want to delete this story?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: async () => {
            try {
              await firestore().collection('stories').doc(storyId).delete();
              setStories(prev => prev.filter(s => s.id !== storyId));
              Alert.alert('Success', 'Story deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete story');
            }
        }
    }
  ]
);
};

  return (
    <FontLoader>
      <View style={[styles.container, { backgroundColor: "#9DC183" }]}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.header, { color: "black" }]}>Share Your Story</Text>

          <TextInput
            style={[styles.input, { backgroundColor: "white" }]}
            placeholder="Your Name"
            placeholderTextColor={theme.placeholderColor}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={[styles.input, { backgroundColor: "white" }]}
            placeholder="Story Title"
            placeholderTextColor={theme.placeholderColor}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.storyInput, { backgroundColor: "white" }]}
            placeholder="Tell Your Story..."
            placeholderTextColor={theme.placeholderColor}
            multiline
            numberOfLines={4}
            value={story}
            onChangeText={setStory}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: "#016A70" }]} 
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { color: "black" }]}>Your Stories</Text>

          {stories.map((story) => (
            <View 
              key={story.id} 
              style={[styles.storyCard, { backgroundColor: "white" }]}
            >
                <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDelete(story.id)}
              >
                <Ionicons name="trash-bin" size={20} color="#ff4444" />
              </TouchableOpacity>

              <Text style={[styles.storyTitle, { color: "#016A70" }]}>{story.title}</Text>
              <Text style={[styles.storyContent, { color: theme.textColor }]}>{story.story}</Text>
              <Text style={[styles.storyAuthor, { color: theme.secondaryText }]}>By {story.name}</Text>
              <Text style={[styles.storyDate, { color: theme.secondaryText }]}>
                {story.createdAt.toLocaleDateString()}
              </Text>
            </View>
          ))}

          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: "black" }]} 
            onPress={() => router.replace("/Components/DAS/DASday3")}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontFamily: 'DMSans-Bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  storyInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  saveButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'DMSans-SemiBold',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'DMSans-SemiBold',
    marginBottom: 15,
  },
  storyCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  storyTitle: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  storyAuthor: {
    fontSize: 14,
    fontFamily: 'DMSans-Italic',
    marginBottom: 10, 
  },
  storyContent: {
    fontSize: 18,
    fontFamily: 'DMSans-Regular',
    lineHeight: 20,
    marginBottom: 10,
  },
  storyDate: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    textAlign: 'right',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'DMSans-Regular',
  },
  backButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,
  },
});

export default StoryScreen;