import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import meditationAudio from '../../../../../../assets/songs/Mental_Reset_in_5.mp3';
import { useTheme } from '../../../../../ThemeContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const MeditationActivity = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);
    const { theme } = useTheme() as { theme: any };
    const [hearts, setHearts] = useState(0);
    const [leaves, setLeaves] = useState(0);

    // Define subtitles with start and end times (in milliseconds)
    const subtitles = [
        { text: 'Just breathe...', startTime: 17000, endTime: 20000 },
        { text: 'breath in and out...', startTime: 23000, endTime: 28000 },
        { text: 'Recognize all of the thoughts...', startTime: 30000, endTime: 33000 },
        { text: 'Swirling around in your mind ...', startTime: 34000, endTime: 36000 },
        { text: 'The worries, stresses, fears, anxieties ...', startTime: 39000, endTime: 45000 },
        { text: 'And then start ...', startTime: 46000, endTime: 47000 },
        { text: 'With breathing ...', startTime: 48000, endTime: 52000 },
        { text: 'And step outside of yourself ...', startTime: 53000, endTime: 56000 },
        { text: 'For just a moment ...', startTime: 57000, endTime: 59000 },
        { text: 'Push the mental reset button ...', startTime: 63000, endTime: 67000 },
        { text: 'See yourself here in this space ...', startTime: 69000, endTime: 72000 },
        { text: 'Recognize your body, your arms, your legs, your head ...', startTime: 75000, endTime: 82000 },
        { text: 'See yourself here and know that you can just be ...', startTime: 84000, endTime: 90000 },
        { text: 'You recognize all these thoughts happening in your mind ...', startTime: 92000, endTime: 98000 },
        { text: 'They have become like papers thrown all around A room ...', startTime: 101000, endTime: 106000 },
        { text: 'But you can allow them to be picked up neatly and orally and file them away. ...', startTime: 107000, endTime: 116000 },
        { text: 'Clear the clutter ...', startTime: 117000, endTime: 119000 },
        { text: 'So you can access any certain thought or idea, but only when you need them ...', startTime: 120000, endTime: 128000 },
        { text: 'Just listen to these suggestions and count with me ...', startTime: 129000, endTime: 135000 },
        { text: 'Starting with five a sharp and focused mind ...', startTime: 137000, endTime: 143000 },
        { text: 'For freeing yourself of needless worry ...', startTime: 146000, endTime: 151000 },
        { text: 'The presence of mind right here and now ...', startTime: 157000, endTime: 162000 },
        { text: 'Two resolution, order and clarity ...', startTime: 167000, endTime: 173000 },
        { text: 'one a Free and open mind ...', startTime: 177000, endTime: 183000 },
        { text: 'And now seeing yourself ...', startTime: 187000, endTime: 190000 },
        { text: 'Feeling your breath, recognizing it, returning here to this very moment ...', startTime: 192000, endTime: 200000 },
        { text: 'No future or past, only here and now ...', startTime: 201000, endTime: 207000 },
        { text: 'Again, listen and count with me ...', startTime: 210000, endTime: 214000 },
        { text: '5 sharp focused ...', startTime: 216000, endTime: 219000 },
        { text: 'Four free. No worry ...', startTime: 223000, endTime: 229000 },
        { text: 'Three present here and now ...', startTime: 233000, endTime: 239000 },
        { text: 'Two Order, Clarity ...', startTime: 242000, endTime: 247000 },
        { text: 'One mind, free and open ...', startTime: 242000, endTime: 246000 },
        { text: 'Just pause, breathe and reset anytime ...', startTime: 252000, endTime: 260000 },
        { text: 'Again and again ...', startTime: 261000, endTime: 263000 },
        { text: 'You will find strength and presence ...', startTime: 265000, endTime: 268000 },
        { text: 'You will be confident ...', startTime: 270000, endTime: 272000 },
        { text: 'You will be your best self ...', startTime: 272000, endTime: 275000 },
        { text: 'You can ...', startTime: 276000, endTime: 277000 },
        { text: 'it\'s up to you ...', startTime: 277000, endTime: 279000 },
        { text: 'So ...', startTime: 280000, endTime: 282000 },
        { text: 'Press Reset ...', startTime: 283000, endTime: 286000 },
    ];


    useEffect(() => {
        const loadAudio = async () => {
            const { sound } = await Audio.Sound.createAsync(
                meditationAudio, // Use the local audio file
                { shouldPlay: false }
            );
            setSound(sound);

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setIsPlaying(status.isPlaying);
                    setPosition(status.positionMillis);
                    setDuration(status.durationMillis ?? 0);

                    // Update subtitle based on current position
                    const currentTime = status.positionMillis;
                    const subtitle = subtitles.find(
                        (sub) => currentTime >= sub.startTime && currentTime < sub.endTime
                    );
                    setCurrentSubtitle(subtitle ? subtitle.text : null);
                }
            });
        };

        loadAudio();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const togglePlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
        }
    };

    useEffect(() => {
        const backAction = () => {
            if (isPlaying) {
                togglePlayPause(); // Pause the song when back button is pressed
            }
            return false; // Allow default back navigation
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove(); // Cleanup event listener
    }, [isPlaying, sound]);

    const toggleMute = async () => {
        if (sound) {
            await sound.setIsMutedAsync(!isMuted);
            setIsMuted(!isMuted);
        }
    };

    const seekForward = async () => {
        if (sound) {
            const newPosition = position + 5000; // 5 seconds forward
            await sound.setPositionAsync(Math.min(newPosition, duration));
        }
    };

    const seekBackward = async () => {
        if (sound) {
            const newPosition = position - 5000; // 5 seconds backward
            await sound.setPositionAsync(Math.max(newPosition, 0));
        }
    };

    const formatTime = (millis: number) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

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
            const data = userDoc.data() || { meditationHistory: {}, hearts: 0, leaves: 0, activityType: {}, completedActivities: [] };

            const sessionDuration = typeof position !== 'undefined' ? position : 0;

            let updatedHearts = (data.hearts || 0) + 10;
            let updatedLeaves = data.leaves || 0;
            if (updatedHearts >= 100) {
                updatedHearts = 0;
                updatedLeaves += 1;
            }

            const todayHistory = data.meditationHistory?.[today] || {};

            // Add the current activity to the completed activities array
            const completedActivity = {
                category: 'Meditation and Relaxation',
                title: 'Guided Mindfulness Meditation (5–15 minutes)',
                description: 'Focus on deep breathing and staying present.',
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
                        title: 'Guided Mindfulness Meditation (5–15 minutes)',
                        description: 'Focus on deep breathing and staying present.',
                    },
                    meditationHistory: {
                        ...data.meditationHistory,
                        [today]: {
                            totalDays: (todayHistory.totalDays || 0) + 1,
                            streakDays: todayHistory.streakDays || 0,
                            playCount: (todayHistory.playCount || 0) + 1,
                            sessionDurations: [...(todayHistory.sessionDurations || []), sessionDuration],
                        },
                    },
                    completedActivities: [...(data.completedActivities || []), completedActivity], // Update completed activities
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


    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Image
                source={require('../../../../../../assets/images/leafBGA.png')}
                style={styles.topLeftImage}
            />
            <TouchableOpacity onPress={toggleMute}>
                <Text style={styles.controlText}><FontAwesome6 name={isMuted ? 'volume-xmark' : 'volume-high'} size={24} color="#016A70" /></Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={toggleMute}>
        <Text style={styles.controlText}>{isMuted ? '🔇' : '🔊'}</Text>
      </TouchableOpacity> */}

            <LottieView
                source={require('../../../../../../assets/lottie/MediYogaEPDS.json')}
                autoPlay
                loop
                style={styles.lottie}
            />
            <Text style={styles.instructions}>Focus on your breath. Inhale deeply, exhale slowly.</Text>

            <View style={styles.subtitleContainerMain}>
                {currentSubtitle && (
                    <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitleText}>{currentSubtitle}</Text>
                    </View>
                )}
            </View>

            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>

            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${(position / duration) * 100}%` }]} />
            </View>

            <View style={styles.controls}>
                <TouchableOpacity onPress={seekBackward}>
                    <Text style={styles.controlText}>
                        <FontAwesome6 name="backward" size={24} color="#016A70" /> 5s
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayPause}>
                    <Text style={styles.controlTextPlay}>
                        {isPlaying ? <FontAwesome6 name="pause" size={16} color="white" /> : <FontAwesome6 name="play" size={16} color="white" />}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={seekForward}>
                    <Text style={styles.controlText}>
                        5s <FontAwesome6 name="forward" size={24} color="#016A70" />
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDone}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    lottie: {
        width: 400,
        height: 400,

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    instructions: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitleContainerMain: {
        height: 70,
    },
    subtitleContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 5,
    },
    subtitleText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    timeText: {
        fontSize: 16,
        color: '#888',
    },
    progressBarContainer: {
        width: '100%',
        height: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginBottom: 20,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#016A70',
        borderRadius: 5,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    controlText: {
        fontSize: 24,
        marginTop: 10,
        color: "#888"

    },
    controlTextPlay: {
        textAlign: "center",
        backgroundColor: "#016A70",
        padding: 20,
        width: 57,
        borderRadius: 100,
    },
    muteButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 10,
        borderRadius: 50,
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
    topLeftImage: {
        position: 'absolute',
        top: -90,
        left: -0,
        width: 380,  // Adjusted width
        height: 400, // Adjusted height
        resizeMode: 'contain',
        transform: [{ rotate: '180deg' }],  // Rotate the image
    },
});

export default MeditationActivity;