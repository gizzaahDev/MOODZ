import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    View,
    ImageBackground,
} from "react-native";
import React, { useEffect, useRef } from "react";
import FontLoader from "../../../../../FontLoader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "../../../../ThemeContext";
import Sound from "./Sound";

const Intro = () => {
    const router = useRouter();
    const { theme } = useTheme() as { theme: any };

    const { aid } = useLocalSearchParams();
    const natureSound = Sound.find((item) => item.id === aid);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(100)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const swingAnim = useRef(new Animated.Value(0)).current;

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
        // Swinging animation
        Animated.loop(
            Animated.sequence([
                // Move up
                Animated.timing(swingAnim, {
                    toValue: -5,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                // Move down
                Animated.timing(swingAnim, {
                    toValue: 5,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                // Return to the center
                Animated.timing(swingAnim, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [swingAnim]);

    return (
        <FontLoader>
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                <ImageBackground
                    source={require("../../../../../assets/images/ChildBG.png")}
                    style={{ height: "100%" }}
                    resizeMode="cover"
                >
                    <Animated.View
                        style={[
                            styles.imgContainer,
                            {
                                transform: [{ translateY: swingAnim }],
                            },
                        ]}
                    >
                        <Image
                            source={require("../../../../../assets/images/HeadSetBoy.png")}
                            style={styles.img}
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
                        <Text
                            style={[
                                styles.instruction,
                                { color: theme.textTernary },
                            ]}
                        >
                            Enjoy the soothing{" "}
                            <Text
                                style={{
                                    color: theme.title,
                                    fontSize: 19,
                                }}
                            >
                                {natureSound?.title}
                            </Text>{" "}
                            sound for a moment of relaxation. 😊✨
                        </Text>
                    </Animated.View>

                    <Animated.View
                        style={{ transform: [{ scale: scaleAnim }] }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                router.push({
                                    pathname:
                                        "/Components/Child/Activity/SoundScape/FirstSound",
                                    params: { soundId: natureSound?.id },
                                });
                            }}
                            style={styles.startButton}
                        >
                            <Text style={styles.startButtonText}>Start</Text>
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
    imgContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 50,
    },
    img: {
        width: 250,
        height: 430,
    },
    mainTextContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    instruction: {
        textAlign: "center",
        fontFamily: "roboto",
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 24,
        marginBottom: 25,
        paddingHorizontal: 12,
    },
    startButton: {
        width: "90%",
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

export default Intro;
