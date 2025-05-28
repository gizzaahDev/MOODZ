import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Dimensions } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const YouTubeInlinePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract the video ID from the YouTube shareable link
  const youtubeLink = 'https://youtu.be/6B02j0xPvV4?si=F2z3xUPuPO_9aVkt';
  const videoId = youtubeLink.split('/').pop()?.split('?')[0];

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
        plays: existingPlays.length + 1,
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
              plays: [...existingPlays, new Date().toISOString()],
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
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>Brighten Your Day</Text>
        <Text style={styles.subtitleText}>
          Enjoy a hilarious video to lift your spirits and unwind
        </Text>
      </View>

      {/* YouTube Video Player */}
      <View style={styles.videoContainer}>
        <YoutubeIframe
          height={height * 0.35}
          width={width * 0.9}
          videoId={videoId}
          play={isPlaying}
          onChangeState={(event) => {
            if (event === 'ended') {
              setIsPlaying(false);
            }
          }}
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => setIsPlaying(!isPlaying)}
          style={styles.controlButton}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color="#E0F2F1"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(youtubeLink)}
          style={styles.controlButton}
        >
          <Ionicons
            name="logo-youtube"
            size={24}
            color="#E0F2F1"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Watch on YouTube</Text>
        </TouchableOpacity>
      </View>

      {/* Done Button */}
      <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
        <View style={styles.doneButtonSolid}>
          <Text style={styles.doneButtonText}>Done</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default YouTubeInlinePlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FAFA',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
    width: '90%',
    maxWidth: 600,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#01363B',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: '#024950',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  videoContainer: {
    width: '90%',
    maxWidth: 600,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  controls: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
    width: '90%',
    maxWidth: 600,
  },
  controlButton: {
    width: '100%',
    backgroundColor: '#016A70',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#E0F2F1',
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    width: '60%',
    maxWidth: 360,
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  doneButtonSolid: {
    backgroundColor: '#016A70',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    color: '#E0F2F1',
    fontSize: 18,
    fontWeight: '700',
  },
});