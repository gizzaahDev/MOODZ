import {
    Text,
    Image,
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

const Landing = () => {
    const router = useRouter();
    const { theme } = useTheme() as { theme: any };

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
                <Animated.View
                    style={[
                        styles.imgContainer,
                        {
                            transform: [{ translateY: swingAnim }],
                        },
                    ]}
                >
                    <Image
                        source={require("../../../assets/images/ChildLanding.png")}
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
                    <Text style={[styles.mainText, { color: theme.title }]}>
                        remember!
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
                        You are required to participate in two assessments
                        related to your child's data.
                    </Text>
                    <Text
                        style={[
                            styles.listItem,
                            { color: theme.landingListItem },
                        ]}
                    >
                        1. Upload a photo of your child's face.
                    </Text>
                    <Text
                        style={[
                            styles.listItem,
                            { color: theme.landingListItem },
                        ]}
                    >
                        2. Complete the CES-DC Assessment.
                    </Text>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                        onPress={() =>
                            router.push("/Components/Child/UploadPhoto")
                        }
                        style={styles.startButton}
                    >
                        <Text style={styles.startButtonText}>Start</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    imgContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 35,
    },
    img: {
        width: 400,
        height: 400,
    },
    mainTextContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
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
        marginBottom: 30,
    },
    instruction: {
        textAlign: "center",
        fontFamily: "roboto",
        fontSize: 15,
        fontWeight: "500",
        marginBottom: 15,
        lineHeight: 24,
    },
    listItem: {
        fontSize: 13,
        marginBottom: 10,
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
        fontSize: 14,
        fontFamily: "poppinsSemiBold",
    },
});

export default Landing;
