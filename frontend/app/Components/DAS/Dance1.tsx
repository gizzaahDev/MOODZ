import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av'; // For music playback
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const Dance1 = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };
  const router = useRouter();

  const cards = [
    {
      id: 1,
      heading: "Slow Dance",
      subheading: "Romantic and calming",
      lottieSource: require('../../../assets/lottie/dasMusic.json'),
      timer: 194,
      music: require('../../../assets/songs/DASdance1.mp3'),
    },
    {
      id: 2,
      heading: "Party Dance",
      subheading: "Energetic and fun",
      lottieSource: require('../../../assets/lottie/dasMusic.json'),
      timer: 267,
      music: require('../../../assets/songs/DASdance2.mp3'),
    },
    {
      id: 3,
      heading: "Freestyle Dance",
      subheading: "Let loose and enjoy",
      lottieSource: require('../../../assets/lottie/dasMusic.json'),
      timer: 247,
      music: require('../../../assets/songs/DASdance3.mp3'),
    },
  ];

  const [activePopup, setActivePopup] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null); 
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load and play music
  const playMusic = async (musicFile: any) => {
    if (sound) {
      await sound.unloadAsync(); // Unload previous sound
    }
    const { sound: newSound } = await Audio.Sound.createAsync(musicFile);
    setSound(newSound);
    await newSound.playAsync();
  };

  const pauseMusic = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const handleContinue = async (cardId: number) => {
    setActivePopup(cardId);
    setTimer(cards[cardId - 1].timer); // Set the timer based on the card

    // Play music if available
    if (cards[cardId - 1].music) {
      await playMusic(cards[cardId - 1].music);
      setIsPlaying(true);
    }

    // Start the timer
    if (timerRef.current) clearInterval(timerRef.current); // Clear any existing interval
    timerRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      // Pause the timer and music
      if (timerRef.current) clearInterval(timerRef.current);
      await pauseMusic();
    } else {
      // Resume the timer and music
      timerRef.current = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      if (sound) {
        await sound.playAsync();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleClosePopup = async () => {
    setActivePopup(null);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(0);

    // Stop and unload music
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
  };

  const handleHomePress = () => {
    router.replace("/Components/DAS/DASHome");
  };

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sound]);

  return (
    <FontLoader>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        {/* Cards */}
        {cards.map((card) => (
          <View key={card.id} style={styles.card}>
            <LottieView
              source={card.lottieSource}
              autoPlay
              loop
              style={styles.lottie}
            />
            <Text style={[styles.heading, { color: theme.textColor }]}>{card.heading}</Text>
            <Text style={[styles.subheading, { color: theme.textColor }]}>{card.subheading}</Text>
            <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: 'black' }]}
              onPress={() => handleContinue(card.id)}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Back Button */}
        <TouchableOpacity
          style={[styles.homeButton, { backgroundColor: 'black' }]}
          onPress={handleHomePress}
        >
          <Text style={styles.homeButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Popups */}
        {cards.map((card) => (
          <Modal
            key={card.id}
            visible={activePopup === card.id}
            transparent
            animationType="slide"
          >
            <View style={styles.popupOverlay}>
              <View style={[styles.popup, { backgroundColor: theme.backgroundColor }]}>
                <LottieView
                  source={card.lottieSource}
                  autoPlay
                  loop
                  style={styles.popupLottie}
                />
                <Text style={[styles.popupTimer, { color: theme.textColor }]}>
                  {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                </Text>
                <TouchableOpacity
                  style={[styles.playButton, { backgroundColor: '#016A70' }]}
                  onPress={handlePlayPause}
                >
                  <Text style={styles.playButtonText}>
                    {isPlaying ? 'Pause' : 'Play'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.popupBackButton, { backgroundColor: 'black' }]}
                  onPress={handleClosePopup}
                >
                  <Text style={styles.popupBackButtonText}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ))}
      </ScrollView>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#016A70',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  lottie: {
    width: 150,
    height: 150,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subheading: {
    fontSize: 16,
    marginTop: 5,
  },
  continueButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  popupLottie: {
    width: 200,
    height: 200,
  },
  popupTimer: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    backgroundColor: 'white',
  },
  playButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  playButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupBackButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  popupBackButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dance1;