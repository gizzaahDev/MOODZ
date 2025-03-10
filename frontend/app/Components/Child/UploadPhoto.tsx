import {
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import FontLoader from "../../../FontLoader";
import { useRouter } from "expo-router";
import { useTheme } from "../../ThemeContext";
import LottieView from "lottie-react-native";

const UploadPhoto = () => {
    const router = useRouter();
    const { theme } = useTheme() as { theme: any };

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(100)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const zoomAnim = useRef(new Animated.Value(1)).current; // Initial scale value is 1

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.timing(slideUpAnim, {
            toValue: 0,
            duration: 1200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();

        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, slideUpAnim, scaleAnim]);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                // Zoom in
                Animated.timing(zoomAnim, {
                    toValue: 0.9, // Scale up to 120%
                    duration: 1500, // Duration for zoom-in
                    useNativeDriver: true, // Use native driver for better performance
                }),
                // Zoom out
                Animated.timing(zoomAnim, {
                    toValue: 1, // Scale back to 100%
                    duration: 1500, // Duration for zoom-out
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [zoomAnim]);

    return (
        <FontLoader>
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                <ImageBackground
                    source={require("../../../assets/images/ChildBG.png")}
                    resizeMode="cover"
                    style={styles.bg}
                >
                    <Animated.View
                        style={[
                            styles.lottieContainer,
                            {
                                backgroundColor: theme.childLottieCircle,
                                transform: [{ scale: zoomAnim }],
                            },
                        ]}
                    >
                        <LottieView
                            source={require("../../../assets/lottie/ChildUploadPhoto.json")}
                            autoPlay
                            loop
                            style={styles.lottie}
                        />
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.mainTextContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideUpAnim }],
                            },
                        ]}
                    >
                        <Text style={[styles.mainText, { color: theme.title }]}>
                            Upload Photo
                        </Text>
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.subTextContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideUpAnim }],
                                backgroundColor: theme.landingSubTextContainer,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.instruction,
                                { color: theme.landingInstruction },
                            ]}
                        >
                            Upload a photo of the child's face, capturing their
                            expression after receiving something they like.
                        </Text>
                    </Animated.View>

                    <Animated.View
                        style={{ transform: [{ scale: scaleAnim }] }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                router.push("/Components/Child/UploadPhoto")
                            }
                            style={styles.startButton}
                        >
                            <Text style={styles.startButtonText}>Upload</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ImageBackground>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    bg: {
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
    },
    lottieContainer: {
        width: 350,
        height: 350,
        borderRadius: "50%",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 50,
    },
    lottie: {
        width: 300,
        height: 300,
    },
    mainTextContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    mainText: {
        textTransform: "capitalize",
        fontSize: 26,
        fontWeight: 600,
        fontFamily: "robotoBold",
    },
    subTextContainer: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 12,
        paddingHorizontal: 19,
        paddingVertical: 22,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 10,
    },
    instruction: {
        textAlign: "center",
        fontFamily: "roboto",
        fontSize: 16,
        fontWeight: "800",
        marginBottom: 15,
        lineHeight: 24,
    },
    startButton: {
        width: 160,
        paddingVertical: 14,
        borderRadius: 50,
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#016A70",
        marginTop: 10,
    },
    startButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "poppinsSemiBold",
    },
});

export default UploadPhoto;
