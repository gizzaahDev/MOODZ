import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Linking } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const YouTubePopupPlayer = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Extract the video ID from the YouTube shareable link
  const youtubeLink = 'https://youtu.be/f2IkEfrMCLg?si=mDhkVlZgK0a4AP7z';
  const videoId = youtubeLink.split('/').pop()?.split('?')[0]; // Extracts 'f2IkEfrMCLg'

  return (
    <View style={styles.container}>
      {/* Button to Open Video */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openButton}>
        <Text style={styles.buttonText}>Play Video</Text>
      </TouchableOpacity>

      {/* Popup Video Player */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.videoContainer}>
            {/* YouTube Video Player */}
            <YoutubeIframe
              height={250}
              width={'100%'}
              videoId={videoId} // Use the extracted video ID
              play={modalVisible} // Auto-play when modal is visible
              onChangeState={(event) => {
                if (event === 'ended') {
                  setModalVisible(false); // Close modal when video ends
                }
              }}
            />

            {/* Controls: Close & See More */}
            <View style={styles.controls}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.controlButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Linking.openURL(youtubeLink)} // Open the YouTube link in browser
                style={styles.controlButton}
              >
                <Text style={styles.buttonText}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default YouTubePopupPlayer;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  openButton: { backgroundColor: '#ff0000', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' },
  videoContainer: { width: '90%', backgroundColor: '#000', padding: 10, borderRadius: 10 },
  controls: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  controlButton: { backgroundColor: '#ff0000', padding: 10, borderRadius: 5, marginHorizontal: 10 },
});