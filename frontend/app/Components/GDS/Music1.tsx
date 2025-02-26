import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import FontLoader from '../../../FontLoader';
import { useRouter } from 'expo-router';

const Music1 = () => {
  const { theme } = useTheme();
  const router = useRouter();


  const handleGDSHomePress = () => {

    router.replace("/Components/GDS/GDSHome");
    // Navigate to GDS Home page
  };


  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
      return;
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../../assets/songs/GDS1.mp3'),
      { shouldPlay: true }
    );
    setSound(newSound);
    setIsPlaying(true);
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);


  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}> 
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Music Therapy</Text>
          <LottieView source={require('../../../assets/lottie/MusicTheraphy.json')} autoPlay loop style={styles.animation} />
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Please Close Your Eyes</Text>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}> & </Text>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>Feel the Music</Text>
        </View>

        <View style={styles.Player}>
          <TouchableOpacity style={styles.MusicPlayer} onPress={isPlaying ? stopSound : playSound}>
            <Text style={styles.buttonText1}>{isPlaying ? 'Stop' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
                        <View >
                            <TouchableOpacity  onPress={handleGDSHomePress}>
                                <Text >BACK</Text>
                                    </TouchableOpacity>
                        </View>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  startcontainer: { flex: 1 },
  textcontainer: { marginTop: 70, padding: 16, alignItems: 'center' },
  animation: { width: 350, height: 300, marginBottom: 10 },
  text_welcome: { fontFamily: 'asul', fontSize: 30, marginBottom: 20 },
  Player: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  MusicPlayer: {
    borderRadius: 10, width: 160, height: 100, alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#016A70',
  },
  buttonText1: { color: 'white', fontSize: 30, fontWeight: 'bold' },
});

export default Music1;




/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import { useRouter } from 'expo-router';
import FontLoader from '../../../FontLoader';

const Music1 = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme() as { theme: any };



  return (
    <FontLoader>
      <View style={[styles.startcontainer, { backgroundColor: theme.background }]}>
        <View style={styles.textcontainer}>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            Music Therapy
          </Text>

          <View style={styles.imgcontainerday1}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={[styles.startImage1, theme.imageStyle]} // Apply imageStyle from theme
            />
          </View>

          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            Please Close Your Eyes
          </Text>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
            & 
          </Text>
          <Text style={[styles.text_welcome, { color: theme.textPrimary }]}>
          Feel the Music
          </Text>
        </View>

        <View style={styles.Player}>
            <View style={styles.MusicPlayer}>
                <Text style={styles.buttonText1}>Stop</Text>
            </View>
        </View>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  startcontainer: {
    flex: 1,
  },
  textcontainer: {
    marginTop: 70,
    padding: 16,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgcontainerday1: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden', // Ensures rounded corners if used
    borderRadius: 100,
    borderColor: "#016A70",
    borderWidth: 3,
  },
  startImage1: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text_welcome: {
    fontFamily: 'asul',
    fontSize: 30,
    marginBottom: 20,
  },
  scrollView1: {
    marginTop: 0,
  },
  Player: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  MusicPlayer: {
    borderRadius: 10,
    width: 160,
    height: 100,
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center', // Center the button and text
    backgroundColor: '#016A70',
    marginBottom: 10,
  },
  buttonText1: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',

  },
  button: {
    backgroundColor: '#272727',
    padding: 15,
    borderRadius: 50,
    width: 350,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
marginTop: 30,
    alignItems: 'center',  // Center the button horizontally
    justifyContent: 'center',  // Center the button vertically (if needed)

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
});

export default Music1;
*/