import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome6 } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function SleepRelaxationAudio() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSongList, setShowSongList] = useState(false);
  const [position, setPosition] = useState(0); // Added position state
  const drawerAnimation = useRef(new Animated.Value(-100)).current;

  const songs = [
    { id: '1', title: '1. The Little Power Nap Series. Sleep and Relaxation', url: 'https://firebasestorage.googleapis.com/v0/b/testdb-8ea15.firebasestorage.app/o/MOODZ%2FVideo%2FEPDS%2F10%20minutes.%20The%20Little%20Power%20Nap%20Series.%20Sleep%20and%20Relaxation%20Music%203%20%5BIhq64W33cyo%5D.mp3?alt=media&token=41217a4d-b413-46c7-8f70-5b3991dcf152' },
    { id: '2', title: '2. Sleep Music, Relaxing Music', url: 'https://firebasestorage.googleapis.com/v0/b/testdb-8ea15.firebasestorage.app/o/MOODZ%2FVideo%2FEPDS%2FDeep%20Sleep%20in%2010%20Minutes.Sleep%20Music.%20Relaxing%20Music.Peaceful%20Music.%20Sivananda%20Yoga%2C%20Kapalbhati%20%5BZJpt_bRTC6g%5D.mp3?alt=media&token=336d316a-565d-4a27-bb20-dc537e5bc9fc' },
    { id: '3', title: '3. Gentle Piano', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: '4', title: '4. Calm Guitar Melody', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: '5', title: '5. Peaceful Birds Chirping', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: '6', title: '6. Relaxing Ocean Waves', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  ];

  async function playSong(songUrl: string) {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: songUrl },
      { shouldPlay: true }
    );

    setSound(newSound);
    setIsPlaying(true);
  }

  async function togglePlayPause() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  }

  async function skipForward() {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = status.positionMillis + 5000;
        await sound.setPositionAsync(newPosition);
        setPosition(newPosition);
      }
    }
  }

  async function skipBackward() {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.max(0, status.positionMillis - 5000);
        await sound.setPositionAsync(newPosition);
        setPosition(newPosition);
      }
    }
  }

  async function toggleMute() {
    if (sound) {
      await sound.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  }

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
      const data = userDoc.data() || { sleepRelaxation: {}, hearts: 0, leaves: 0, activityType: {}, completedActivities: [] };

      const sessionDuration = position;

      let updatedHearts = (data.hearts || 0) + 10;
      let updatedLeaves = data.leaves || 0;
      if (updatedHearts >= 100) {
        updatedHearts = 0;
        updatedLeaves += 1;
      }

      const todayHistory = data.sleepRelaxation?.[today] || {};

      const completedActivity = {
        category: 'Meditation and Relaxation',
        title: 'Sleep Relaxation Music',
        description: 'A guided session to improve sleep quality.',
        date: today,
        duration: sessionDuration,
      };

      await userRef.set(
        {
          hearts: updatedHearts,
          leaves: updatedLeaves,
          activityType: {
            ...data.activityType,
            category: 'Meditation and Relaxation',
            title: 'Sleep Relaxation Music',
            description: 'A guided session to improve sleep quality.',
          },
          sleepRelaxation: {
            ...data.sleepRelaxation,
            [today]: {
              totalDays: (todayHistory.totalDays || 0) + 1,
              streakDays: todayHistory.streakDays || 0,
              playCount: (todayHistory.playCount || 0) + 1,
              sessionDurations: [...(todayHistory.sessionDurations || []), sessionDuration],
            },
          },
          completedActivities: [...(data.completedActivities || []), completedActivity],
        },
        { merge: true }
      );

      if (isPlaying) {
        togglePlayPause();
      }

      router.push('/Components/EPDS/SubComponents/EPDSMyActivity');
    } catch (error) {
      console.error('Error saving meditation session:', error);
    }
  };

  const openDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: -20,
      duration: 80,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    setShowSongList(true);
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 80,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => setShowSongList(false));
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Relaxation Music</Text>

      <LottieView
        source={require('../../../../../../assets/lottie/MediYogaEPDS.json')}
        autoPlay
        loop
        style={styles.animation}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Text style={styles.songButton}>Songs ▶</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.controls, { position: 'absolute', bottom: 120 }]}>
        <TouchableOpacity style={styles.controlButton} onPress={skipBackward}>
          <FontAwesome6 name="backward" size={20} style={styles.controlIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={togglePlayPause}>
          <FontAwesome6 name={isPlaying ? 'pause' : 'play'} size={20} style={styles.controlIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={skipForward}>
          <FontAwesome6 name="forward" size={20} style={styles.controlIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={toggleMute}>
          <FontAwesome6 name={isMuted ? 'volume-xmark' : 'volume-high'} size={20} style={styles.controlIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.button, { position: 'absolute', bottom: 30, }]} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      

      {/* Animated Song List Drawer */}
      {showSongList && (
        <Animated.View style={[styles.drawer, { transform: [{ translateY: drawerAnimation }] }]}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Select a Song</Text>
            <TouchableOpacity onPress={closeDrawer}>
              <View style={styles.controlx}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#FFF', marginRight: 8 }}>Close</Text>
                  <FontAwesome6 name="xmark" size={24} color="#FFF" />
                </View>
              </View>
            </TouchableOpacity>


          </View>


          <FlatList
            data={songs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.songItem} onPress={() => { playSong(item.url); closeDrawer(); }}>
                <Text style={styles.songText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FAF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 40,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#016A70',
  },
  animation: {
    width: 400,
    height: 400,
    position: 'absolute',
    top: '30%',
  },
  header: {
    position: 'absolute',
    top: 150,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 25,
    textAlign: 'center',
  },
  songButton: {
    fontSize: 16,
    color: '#016A70',
    fontWeight: 'bold',
    textAlign: "center"
  },
  controlButton: { // New style for the control buttons
    backgroundColor: '#016A70', // Background color for the buttons
    padding: 20,
    borderRadius: 50,
    elevation: 25,
    textAlign: 'center',
    width: 65, // Fixed width for circle
    height: 65, // Fixed height for circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlx: {
    backgroundColor: '#016A70', // Background color for the buttons
    padding: 10,
    borderRadius: 50,
    elevation: 25,
    textAlign: 'center',
    width: 100, // Fixed width for circle
    height: 50, // Fixed height for circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: { // New style for the icons
    color: '#fff', // White color for the icons
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  drawer: {
    position: 'absolute',
    bottom: -50,
    width: '100%',
    height: 450,
    backgroundColor: '#34495E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  button: {
    backgroundColor: '#016A70',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5, // for Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  songItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  songText: {
    color: '#FFF',
    fontSize: 16,
  },
});
