import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome6 } from '@expo/vector-icons';

export default function SleepRelaxationAudio() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSongList, setShowSongList] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(-100)).current;

  // List of songs
  const songs = [
    { id: '1', title: 'Relaxing Ocean Waves', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: '2', title: 'Soft Rain Sounds', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: '3', title: 'Gentle Piano', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: '4', title: 'Calm Guitar Melody', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: '5', title: 'Peaceful Birds Chirping', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: '6', title: 'Relaxing Ocean Waves', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    
  ];

  // Function to load and play a song
  async function playSong(songUrl) {
    if (sound) {
      await sound.unloadAsync(); // Stop previous sound
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: songUrl },
      { shouldPlay: true }
    );

    setSound(newSound);
    setIsPlaying(true);
  }

  // Function to toggle play/pause
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

  // Function to skip 5s forward
  async function skipForward() {
    if (sound) {
      const status = await sound.getStatusAsync();
      await sound.setPositionAsync(status.positionMillis + 5000);
    }
  }

  // Function to skip 5s backward
  async function skipBackward() {
    if (sound) {
      const status = await sound.getStatusAsync();
      await sound.setPositionAsync(Math.max(0, status.positionMillis - 5000));
    }
  }

  // Function to mute/unmute
  async function toggleMute() {
    if (sound) {
      await sound.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  }

  // Function to open song list with animation
  const openDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: -20,
      duration: 80,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    setShowSongList(true);
  };

  // Function to close song list with animation
  const closeDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 80,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => setShowSongList(false));
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Text style={styles.songButton}>Songs ▶</Text>
        </TouchableOpacity>
      </View>

      {/* Song Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={skipBackward}>
          <FontAwesome6 name="backward" size={30} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause}>
          <FontAwesome6 name={isPlaying ? 'pause' : 'play'} size={30} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipForward}>
          <FontAwesome6 name="forward" size={30} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleMute}>
          <FontAwesome6 name={isMuted ? 'volume-mute' : 'volume-up'} size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Animated Song List Drawer */}
      {showSongList && (
        <Animated.View style={[styles.drawer, { transform: [{ translateY: drawerAnimation }] }]}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Select a Song</Text>
            <TouchableOpacity onPress={closeDrawer}>
              <FontAwesome6 name="times" size={24} color="#FFF" />
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
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  songButton: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
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
