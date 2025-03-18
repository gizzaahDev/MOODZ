import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ImageBackground,
} from "react-native";
import { Video } from "expo-av";
import LottieView from "lottie-react-native";
import { useTheme } from "../../../../ThemeContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontLoader from "@/FontLoader";
import { useLocalSearchParams } from "expo-router";
import Stories from "./Stories";

const StoryTelling = () => {
    const { theme } = useTheme();
    const { aid } = useLocalSearchParams();
    const videoRef = useRef<Video>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    // Find the selected story
    const story = Stories.find((story) => story.id === "ca21");

    // Format time function
    const formatTime = (millis: number) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Play or pause the video
    const togglePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
                setIsPlaying(false);
            } else {
                await videoRef.current.playAsync();
                setIsPlaying(true);
                setIsFinished(false);
            }
        }
    };

    // Replay the video from the beginning
    const replayVideo = async () => {
        if (videoRef.current) {
            await videoRef.current.setPositionAsync(0);
            await videoRef.current.playAsync();
            setIsPlaying(true);
            setIsFinished(false);
        }
    };

    // Seek forward by 5 seconds
    const seekForward = async () => {
        if (videoRef.current) {
            const newPosition = position + 5000; // 5 seconds forward
            await videoRef.current.setPositionAsync(
                Math.min(newPosition, duration)
            );
        }
    };

    // Seek backward by 5 seconds
    const seekBackward = async () => {
        if (videoRef.current) {
            const newPosition = position - 5000; // 5 seconds backward
            await videoRef.current.setPositionAsync(Math.max(newPosition, 0));
        }
    };

    // Handle video playback status updates
    const onPlaybackStatusUpdate = (status: any) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
            if (status.didJustFinish) {
                setIsPlaying(false);
                setIsFinished(true);
            }
        }
    };

    return (
        <FontLoader>
            
                <View
                    style={[
                        styles.container,
                        { backgroundColor: theme.background },
                    ]}
                >
                    <View style={styles.titleContainer}>
                        <Text
                            style={[styles.title, { color: theme.textTernary }]}
                        >
                            🌿 {story?.title}
                        </Text>
                    </View>

                    {/* Video Player */}
                    {story && (
                        <Video
                            ref={videoRef}
                            source={{ uri: story.video }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            shouldPlay={isPlaying}
                            resizeMode="contain"
                            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                            style={styles.video}
                        />
                    )}

                    {/* Video Controls */}
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
                                        width: `${
                                            (position / duration) * 100
                                        }%`,
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

                    {/* Complete Button */}
                    <View
                        style={[
                            styles.buttonContainer,
                            { backgroundColor: theme.title },
                        ]}
                    >
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Complete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    titleContainer: {
        alignSelf: "center",
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 28,
        fontFamily: "robotoBold",
        textAlign: "center",
        textTransform: "capitalize",
    },
    video: {
        width: "100%",
        height: 200,
    },
    animation: {
        width: 400,
        height: 400,
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

export default StoryTelling;
