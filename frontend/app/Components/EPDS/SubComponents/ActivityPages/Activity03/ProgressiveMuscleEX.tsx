import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler, Dimensions, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useTheme } from '../../../../../ThemeContext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';

const MeditationActivity = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const { theme } = useTheme() as { theme: any };
    const videoRef = useRef<Video>(null);
    const [isLoading, setIsLoading] = useState(true);

    const videoUri = 'https://firebasestorage.googleapis.com/v0/b/testdb-8ea15.firebasestorage.app/o/MOODZ%2FVideo%2FEPDS%2FProgressive%20Muscle%20Relaxation%20Training.mp4.mp4?alt=media&token=ea519fd9-ec02-46b3-81a1-d4e17db8fee3';

    const togglePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = async () => {
        if (videoRef.current) {
            await videoRef.current.setIsMutedAsync(!isMuted);
            setIsMuted(!isMuted);
        }
    };

    const seekForward = async () => {
        if (videoRef.current) {
            const newPosition = position + 5000; // 5 seconds forward
            await videoRef.current.setPositionAsync(Math.min(newPosition, duration));
        }
    };

    const seekBackward = async () => {
        if (videoRef.current) {
            const newPosition = position - 5000; // 5 seconds backward
            await videoRef.current.setPositionAsync(Math.max(newPosition, 0));
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
            const data = userDoc.data() || { meditationHistoryProgMuscle: {}, hearts: 0, leaves: 0, activityType: {} };

            const sessionDuration = typeof position !== 'undefined' ? position : 0;

            let updatedHearts = (data.hearts || 0) + 10;
            let updatedLeaves = data.leaves || 0;
            if (updatedHearts >= 100) {
                updatedHearts = 0;
                updatedLeaves += 1;
            }

            const todayHistory = data.meditationHistoryProgMuscle?.[today] || {};

            await userRef.set(
                {
                    hearts: updatedHearts,
                    leaves: updatedLeaves,
                    activityType: {
                        ...data.activityType,
                        category: 'Meditation and Relaxation',
                        title: 'Progressive Muscle Relaxation',
                        description: 'Systematic tensing and relaxing of muscle groups.',
                    },
                    meditationHistoryProgMuscle: {
                        ...data.meditationHistoryProgMuscle,
                        [today]: {
                            totalDays: (todayHistory.totalDays || 0) + 1,
                            streakDays: todayHistory.streakDays || 0,
                            playCount: (todayHistory.playCount || 0) + 1,
                            sessionDurations: [...(todayHistory.sessionDurations || []), sessionDuration],

                        },
                    },
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
            <TouchableOpacity onPress={toggleMute} style={styles.muteButton}>
                <Text style={styles.controlText}>
                    <FontAwesome6 name={isMuted ? 'volume-xmark' : 'volume-high'} size={24} color="#016A70" />
                </Text>
            </TouchableOpacity>

        
            <View >
                {/* Show loading indicator when video is loading */}
                {isLoading && (
                    <ActivityIndicator
                        size="large"
                        color="#016A70"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '55%',
                            transform: [{ translateX: -25 }, { translateY: -25 }],
                            zIndex: 1, // Ensure it's above the video
                        }}
                    />
                )}

                {/* Show video only when it's loaded */}
                <Video
                    ref={videoRef}
                    source={{ uri: videoUri }}
                    style={styles.video}
                    muted={isMuted}
                    repeat={false}
                    resizeMode="contain"
                    onPlaybackStatusUpdate={(status) => {
                        if (status.isLoaded) {
                            setIsPlaying(status.isPlaying);
                            setPosition(status.positionMillis);
                            setDuration(status.durationMillis || 0);
                            setIsLoading(false); // ✅ Hide loader when the video is loaded
                        } else {
                            setIsLoading(true); // Keep loader while loading
                        }
                    }}
                />
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.5, // Adjust height as needed
        marginBottom: 20,
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
    topLeftImage: {
        position: 'absolute',
        top: -90,
        left: -0,
        width: 380,  // Adjusted width
        height: 400, // Adjusted height
        resizeMode: 'contain',
        transform: [{ rotate: '180deg' }],  // Rotate the image
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
});

export default MeditationActivity;