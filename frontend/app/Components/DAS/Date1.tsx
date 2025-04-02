import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, TextInput } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';
import firestore from '@react-native-firebase/firestore';

interface NoteItem {
  id: string;
  text: string;
  category: string;
  timestamp: string;
}

const Date1 = () => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const [categories] = useState([
    'Dream Destination', 
    'Date Night Ideas', 
    'Favorite Moments'
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [newNote, setNewNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
    animateNote();
  }, []);

  const fetchNotes = async () => {
    try {
      const querySnapshot = await firestore().collection('notes').get();
      const fetchedNotes: NoteItem[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<NoteItem, 'id'>),
      }));
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const animateNote = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const addNote = async () => {
    if (!newNote.trim()) {
      setError('Please write a note before submitting');
      return;
    }
    try {
      setError('Submitting...');
      const newItem = {
        text: newNote,
        category: categories[selectedCategory],
        timestamp: new Date().toLocaleString(),
      };
      const docRef = await firestore().collection('notes').add(newItem);
      setNotes([{ id: docRef.id, ...newItem }, ...notes]);
      setNewNote('');
      setError('');
      animateNote();
    } catch (err) {
      setError(' Please try again later.');
    }
  };

  return (
    <FontLoader>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: "#F3FAF4" }]}> 
        <Text style={[styles.header, { color: theme.textColor }]}>Our Love Board</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryButton, { backgroundColor: "#9DC183" }]}
              onPress={() => setSelectedCategory(index)}
            >
              <Text style={[styles.categoryText, { color: "black" }]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TextInput
          style={[styles.input, { borderColor: error ? 'red' : theme.borderColor }]}
          placeholder="Write your Preferred Option ..."
          multiline
          value={newNote}
          onChangeText={setNewNote}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.submitButton} onPress={addNote}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>
        <View style={styles.notesContainer}>
          {notes.map((note) => (
            <Animated.View key={note.id} style={[styles.noteCard, { opacity: fadeAnim }]}> 
              <Text style={styles.noteCategory}>{note.category}</Text>
              <Text style={styles.noteText}>{note.text}</Text>
              <Text style={styles.noteTime}>{note.timestamp}</Text>
            </Animated.View>
          ))}
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/Components/DAS/DASday2")}> 
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20,
    paddingTop: 35,
  },
  header: { 
    fontSize: 32, 
    fontFamily: 'DMSans-Bold', 
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  },
  categoryContainer: { 
    marginBottom: 25,
    paddingVertical: 5,
  },
  categoryButton: { 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, 
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryText: { 
    fontSize: 15, 
    fontFamily: 'DMSans-Medium',
    letterSpacing: 0.5,
    
  },
  input: { 
    minHeight: 100,
    borderRadius: 20,
    padding: 20,
    fontSize: 16,
    borderWidth: 1.5,
    marginVertical: 15,
    lineHeight: 22,
    textAlignVertical: 'top',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButton: { 
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    backgroundColor: "#016A70",
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: { 
    color: 'white', 
    fontFamily: 'DMSans-Bold', 
    fontSize: 17,
    letterSpacing: 0.8,
  },
  notesContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginTop: 20,
  },
  noteCard: { 
    width: '48%',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noteCategory: { 
    fontSize: 13, 
    fontFamily: 'DMSans-Bold',
    color: '#016A70',
    marginBottom: 6,
  },
  noteText: { 
    fontSize: 14, 
    marginBottom: 8,
    lineHeight: 18,
    fontFamily: 'DMSans-Regular',
  },
  noteTime: { 
    fontSize: 11, 
    color: '#666',
    fontFamily: 'DMSans-Italic',
  },
  errorText: { 
    fontSize: 13, 
    color: 'red',
    marginTop: -5,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'DMSans-Regular',
  },
  backButton: { 
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: 'black',
    width: '40%',
    alignSelf: 'center',
  }
});

export default Date1;
