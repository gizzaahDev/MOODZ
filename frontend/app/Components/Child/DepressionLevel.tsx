import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "../../ThemeContext";
import LottieView from "lottie-react-native";
import FontLoader from "@/FontLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DepressionLevel = () => {
    const { theme } = useTheme();
    const router = useRouter();

    const [userName, setUserName] = useState("User");
    const [imgValue, setImgValue] = useState("negative");
    const [quizValue, setQuizValue] = useState("yes");
    const [depLevel, setDepLevel] = useState("unknown");

    // Get the logged username
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const name = await AsyncStorage.getItem("userName");
                setUserName(name ?? "User");
            } catch (error) {
                console.error("Failed to load user data:", error);
            }
        };

        loadUserData();
    }, []);

    // Define the depression level
    useEffect(() => {
        const combinedValue = `${imgValue}-${quizValue}`;

        switch (combinedValue) {
            case "negative-no":
                setDepLevel("normal");
                break;
            case "positive-no":
                setDepLevel("low");
                break;
            case "negative-yes":
                setDepLevel("moderate");
                break;
            case "positive-yes":
                setDepLevel("high");
                break;
            default:
                setDepLevel("unknown");
                break;
        }
    }, [imgValue, quizValue]);

    const zoomAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(zoomAnim, {
                    toValue: 0.9,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(zoomAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [zoomAnim]);

    // Function to determine the background color based on depLevel
    const getBackgroundColor = () => {
        switch (depLevel) {
            case "normal":
                return "#D1FAE5";
            case "low":
                return "#FEF3C7";
            case "moderate":
                return "#FDE68A";
            case "high":
                return "#FECACA";
            default:
                return "#E5E7EB";
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
                <Animated.View
                    style={[
                        styles.lottieContainer,
                        {
                            backgroundColor: getBackgroundColor(),
                            transform: [{ scale: zoomAnim }],
                        },
                    ]}
                />

                <View style={styles.lottieAndTextContainer}>
                    <LottieView
                        source={require("../../../assets/lottie/ChildNormal.json")}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />

                    <View style={styles.textContainer}>
                        <Text
                            style={[
                                styles.username,
                                { color: theme.textTernary },
                            ]}
                        >
                            Hi {userName},
                        </Text>
                        <Text
                            style={[styles.title, { color: theme.textTernary }]}
                        >
                            Your Depression Level
                        </Text>
                        <Text
                            style={[
                                styles.depLevelText,
                                { color: theme.textTernary },
                            ]}
                        >
                            {depLevel}
                        </Text>
                    </View>
                </View>

                <ImageBackground
                    source={require("../../../assets/images/lotusBg.png")}
                    style={{ width: "100%", height: 330 }}
                >
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => {
                            router.push({
                                pathname:
                                    "/Components/Child/Activity/ActivityIntro",
                                params: { depLevel },
                            });
                        }}
                    >
                        <Text style={styles.startButtonText}>Let's Go</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
    },
    lottie: {
        width: 500,
        height: 450,
        alignSelf: "center",
    },
    lottieContainer: {
        width: 350,
        height: 350,
        borderRadius: 175,
        position: "absolute",
        alignSelf: "center",
        top: 25,
    },
    lottieAndTextContainer: {
        alignItems: "center",
        marginTop: 25,
    },
    textContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    username: { fontSize: 22, fontFamily: "robotoBold", marginBottom: 5 },
    title: {
        fontSize: 24,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    depLevelText: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        textTransform: "capitalize",
    },
    startButton: {
        width: 160,
        paddingVertical: 14,
        borderRadius: 50,
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#016A70",
        marginTop: 60,
    },
    startButtonText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "poppinsSemiBold",
    },
});

export default DepressionLevel;
