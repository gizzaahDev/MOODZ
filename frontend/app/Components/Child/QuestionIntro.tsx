import {
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    View,
    Modal,
    TouchableWithoutFeedback,
    Image,
    Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FontLoader from "../../../FontLoader";
import { useTheme } from "../../ThemeContext";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const UploadPhoto = () => {
    const { theme } = useTheme() as { theme: any };
    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(100)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const zoomAnim = useRef(new Animated.Value(1)).current;

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
                            source={require("../../../assets/lottie/Survey.json")}
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
                            Take Questionnaire
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
                            Please select the response that best describes how
                            your child has felt during the past week.
                        </Text>
                    </Animated.View>

                    <Animated.View
                        style={{ transform: [{ scale: scaleAnim }] }}
                    >
                        <TouchableOpacity
                            onPress={() => {router.push("/Components/Child/Questionnaire");}}
                            style={styles.startButton}
                        >
                            <Text style={styles.startButtonText}>Take</Text>
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
        justifyContent: "center",
        alignItems: "center",
    },
    lottieContainer: {
        width: 350,
        height: 350,
        borderRadius: 175,
        alignItems: "center",
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 50,
    },
    lottie: {
        width: 450,
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
        fontWeight: "600",
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
