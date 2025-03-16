import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";
import { useTheme } from "../../../../ThemeContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontLoader from "@/FontLoader";
import { useLocalSearchParams, useRouter } from "expo-router";
import Sound from "./Sound";

interface Theme {
    background: string;
    textTernary: string;
    title: string;
}

const FirstSound = () => {
    const { theme } = useTheme() as { theme: Theme };
    const router = useRouter();
    const { soundId } = useLocalSearchParams();
    const natureSound = Sound.find((item) => item.id === String(soundId));

    const [isBreathing, setIsBreathing] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    // Handle case where natureSound is not found
    if (!natureSound) {
        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                <Text style={[styles.title, { color: theme.textTernary }]}>
                    Sound not found.
                </Text>
            </View>
        );
    }

    // Format time function
    const formatTime = (millis: number) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Load and play the breathing instruction audio
    const playSound = async () => {
        if (sound) {
            await sound.playAsync();
            setIsPlaying(true);
            setIsBreathing(true);
            setIsFinished(false);
        } else if (natureSound) {
            const { sound: newSound } = await Audio.Sound.createAsync(
                natureSound.sound1.audio
            );
            setSound(newSound);
            await newSound.playAsync();
            setIsPlaying(true);
            setIsBreathing(true);
            setIsFinished(false);

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPosition(status.positionMillis);
                    setDuration(status.durationMillis || 0);
                    if (status.didJustFinish) {
                        setIsPlaying(false);
                        setIsBreathing(false);
                        setIsFinished(true);
                    }
                }
            });
        }
    };

    // Pause the audio
    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
            setIsBreathing(false);
        }
    };

    // Stop the audio when the component unmounts or the exercise stops
    const stopSound = async () => {
        if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
            setIsBreathing(false);
        }
    };

    // Replay the audio from the beginning
    const replaySound = async () => {
        if (sound) {
            await sound.setPositionAsync(0);
            await sound.playAsync();
            setIsPlaying(true);
            setIsBreathing(true);
            setIsFinished(false);
        }
    };

    const togglePlayPause = async () => {
        if (isFinished) {
            await replaySound();
        } else if (isPlaying) {
            await pauseSound();
        } else {
            await playSound();
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

    // Cleanup sound on unmount
    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    return (
        <FontLoader>
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: theme.textTernary }]}>
                        🍃 Close your eyes! 👀 feel the{" "}
                        {natureSound.sound1.subtitle} vibe.
                    </Text>
                </View>

                <LottieView
                    source={natureSound.sound1.lottie}
                    autoPlay={isBreathing}
                    loop={isBreathing}
                    style={styles.animation}
                />

                <View style={styles.controller}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>
                            {formatTime(position)}
                        </Text>
                        <Text style={styles.timeText}>
                            {formatTime(duration)}
                        </Text>
                    </View>

                    <View style={styles.progressBarContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                {
                                    width: `${(position / duration) * 100}%`,
                                    backgroundColor: theme.title,
                                },
                            ]}
                        />
                    </View>

                    <View style={styles.controls}>
                        <TouchableOpacity onPress={seekBackward}>
                            <Text
                                style={[
                                    styles.controlText,
                                    { color: theme.textTernary },
                                ]}
                            >
                                <FontAwesome6
                                    name="backward"
                                    size={24}
                                    color={theme.title}
                                />{" "}
                                5s
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={togglePlayPause}>
                            <Text
                                style={[
                                    styles.controlTextPlay,
                                    {
                                        color: theme.textTernary,
                                        backgroundColor: theme.title,
                                    },
                                ]}
                            >
                                {isFinished ? (
                                    <FontAwesome6
                                        name="repeat"
                                        size={16}
                                        color="#F3FAF4"
                                    />
                                ) : isPlaying ? (
                                    <FontAwesome6
                                        name="pause"
                                        size={16}
                                        color="#F3FAF4"
                                    />
                                ) : (
                                    <FontAwesome6
                                        name="play"
                                        size={16}
                                        color="#F3FAF4"
                                    />
                                )}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={seekForward}>
                            <Text
                                style={[
                                    styles.controlText,
                                    { color: theme.textTernary },
                                ]}
                            >
                                5s{" "}
                                <FontAwesome6
                                    name="forward"
                                    size={24}
                                    color={theme.title}
                                />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={[
                        styles.buttonContainer,
                        { backgroundColor: theme.title },
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => {
                            router.push({
                                pathname:
                                    "/Components/Child/Activity/SoundScape/SecondSound",
                                params: { soundId: natureSound?.id },
                            });

                            stopSound();
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        alignSelf: "center",
        paddingHorizontal: 18,
    },
    title: {
        fontSize: 28,
        fontFamily: "robotoBold",
        textAlign: "center",
        textTransform: "capitalize",
        lineHeight: 40,
        marginBottom: 25,
    },
    animation: {
        width: 350,
        height: 350,
    },
    controller: {
        width: "85%",
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 10,
    },
    timeText: {
        fontSize: 15,
        color: "#888",
    },
    progressBarContainer: {
        width: "100%",
        height: 5,
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        marginBottom: 20,
    },
    progressBar: {
        height: "100%",
        borderRadius: 5,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 20,
    },
    controlText: {
        fontSize: 18,
        marginTop: 10,
    },
    controlTextPlay: {
        textAlign: "center",
        padding: 20,
        width: 57,
        borderRadius: 100,
    },
    buttonContainer: {
        width: "90%",
        borderRadius: 50,
        marginTop: 30,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 50,
    },
    buttonText: {
        color: "#F3FAF4",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default FirstSound;
