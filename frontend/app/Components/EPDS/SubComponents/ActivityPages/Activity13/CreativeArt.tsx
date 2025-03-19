import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';

const YouTubeInlinePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract the video ID from the YouTube shareable link
  const youtubeLink = 'https://youtu.be/6B02j0xPvV4?si=F2z3xUPuPO_9aVkt';
  const videoId = youtubeLink.split('/').pop()?.split('?')[0]; // Extracts 'f2IkEfrMCLg'

  const handleDone = async () => {
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
      const data = userDoc.data() || { videoTask: {}, hearts: 0, leaves: 0, activityType: {}, completedActivities: [] };

      let updatedHearts = (data.hearts || 0) + 10;
      let updatedLeaves = data.leaves || 0;
      if (updatedHearts >= 100) {
        updatedHearts = 0;
        updatedLeaves += 1;
      }

      const todayHistory = data.videoTask?.[today] || {};
      const existingPlays = todayHistory.plays || [];

      const completedActivity = {
        category: 'Creative and Cognitive Activities',
        title: 'Play Funny Video',
        description: 'Watch a short funny video to lighten your mood and relax',
        date: today,
        plays: existingPlays.length + 1
      };

      await userRef.set(
        {
          hearts: updatedHearts,
          leaves: updatedLeaves,
          activityType: {
            ...data.activityType,
            category: 'Creative and Cognitive Activities',
            title: 'Play Funny Video',
            description: 'Watch a short funny video to lighten your mood and relax',
          },
          videoTask: {
            ...data.videoTask,
            [today]: {
              totalDays: (todayHistory.totalDays || 0) + 1,
              streakDays: todayHistory.streakDays || 0,
              playCount: (todayHistory.playCount || 0) + 1,
              plays: [...existingPlays, new Date().toISOString()]
            },
          },
          completedActivities: [...(data.completedActivities || []), completedActivity],
        },
        { merge: true }
      );

      router.push('/Components/EPDS/SubComponents/EPDSMyActivity');
    } catch (error) {
      console.error('Error saving video session:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Fix Your Mood with a Funny Video</Text>
        <Text style={styles.subtitleText}>Watch this hilarious video to lighten your mood and relax</Text>
      </View>

      {/* YouTube Video Player */}
      <View style={styles.videoContainer}>
        <YoutubeIframe
          height={220}  // Reduced height to make space for Done button
          width={'100%'}
          videoId={videoId}
          play={isPlaying}
          onChangeState={(event) => {
            if (event === 'ended') {
              setIsPlaying(false);
            }
          }}
        />
      </View>

      {/* Play/Pause Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          onPress={() => setIsPlaying(!isPlaying)} 
          style={styles.controlButton}
        >
          <Text style={styles.buttonText}>
            {isPlaying ? 'Pause Video' : 'Play Video'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(youtubeLink)}
          style={styles.controlButton}
        >
          <Text style={styles.buttonText}>Watch on YouTube</Text>
        </TouchableOpacity>
      </View>

      {/* Done Button */}
      <TouchableOpacity
        onPress={handleDone}
        style={[styles.controlButtondone, { 
          backgroundColor: '#016A70', 
          marginTop: 20,  // Increased margin
          marginBottom: 20,  // Added bottom margin
          paddingVertical: 15  // Increased padding
        }]}
      >
        <Text style={[styles.buttonText, { fontSize: 18 }]}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default YouTubeInlinePlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,  // Added margin
  },
  controlButton: {
    flex: 1,
    backgroundColor: '#ff0000',
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
  },
  controlButtondone:{
    
    backgroundColor: '#016A70',
    padding: 12,
    width:100,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});