import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    ImageBackground,
    Linking,
    Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "../../ThemeContext";
import LottieView from "lottie-react-native";
import FontLoader from "@/FontLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import SureAlert from "@/app/constants/SureAlert";

const DepressionLanding = () => {
    const { theme } = useTheme();
    const router = useRouter();

    const [userName, setUserName] = useState("User");
    const [userId, setUserId] = useState<string | null>(null);
    const [depressionLevel, setDepressionLevel] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Fetch logged-in user's UID
    useEffect(() => {
        const fetchUser = () => {
            const user = auth().currentUser;
            if (user) {
                setUserId(user.uid);
            } else {
                Alert.alert("Error", "User not authenticated");
            }
        };
        fetchUser();
    }, []);

    // retrieving the depression level from firestore
    useEffect(() => {
        const fetchData = async () => {
            const result = await firestore()
                .collection("UserChilds")
                .doc(userId as any)
                .collection("QuestionnaireChilds")
                .orderBy("timestamp", "desc")
                .limit(1)
                .get();

            if (!result.empty) {
                const data = result.docs[0].get("depLevel") as string;
                setDepressionLevel(data);
            }
        };

        fetchData();
    }, [userId]);

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

    // Get firstname
    const firstname = userName.split(" ")[0];

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
        switch (depressionLevel) {
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

    // Handle Restart
    const handleRestart = () => {
        setShowConfirmation(true);
    };

    const confirmRestart = () => {
        setShowConfirmation(false);
        router.replace("/Components/Child/Landing");
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
                        <Text style={[styles.username, { color: theme.title }]}>
                            {firstname},
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
                            {depressionLevel}
                        </Text>
                    </View>
                </View>

                <ImageBackground
                    source={require("../../../assets/images/lotusBg.png")}
                    style={{ width: "100%", height: 330 }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <TouchableOpacity
                            style={styles.startButton}
                            onPress={handleRestart}
                        >
                            <Text style={styles.startButtonText}>
                                Take Again
                            </Text>
                        </TouchableOpacity>

                        {(depressionLevel === "low" ||
                            depressionLevel === "moderate") && (
                            <TouchableOpacity
                                style={styles.startButton}
                                onPress={() => {
                                    router.replace(
                                        "/Components/Child/Activity/ActivityView"
                                    );
                                }}
                            >
                                <Text style={styles.startButtonText}>
                                    Activity Plan
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ImageBackground>
            </View>

            <SureAlert
                visible={showConfirmation}
                setVisible={setShowConfirmation}
                lottie={require("../../../assets/lottie/Warning.json")}
                title="Are you sure?"
                text="You won't be able to revert this!"
                btn1="Confirm"
                btn2="Cancel"
                onConfirm={confirmRestart}
            />
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
    username: { fontSize: 22, fontFamily: "roboto", marginBottom: 5 },
    title: {
        fontSize: 26,
        textTransform: "capitalize",
        fontFamily: "roboto",
    },
    depLevelText: {
        fontSize: 30,
        marginTop: 10,
        textTransform: "capitalize",
        fontFamily: "robotoBold",
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

export default DepressionLanding;
