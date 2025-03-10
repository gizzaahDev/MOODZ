import {
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    View,
    Modal,
    Button,
    TouchableWithoutFeedback, // Add this import
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FontLoader from "../../../FontLoader";
import { useRouter } from "expo-router";
import { useTheme } from "../../ThemeContext";
import LottieView from "lottie-react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import iconSet from "@expo/vector-icons/build/FontAwesome5";

const UploadPhoto = () => {
    const router = useRouter();
    const { theme } = useTheme() as { theme: any };

    const [modalVisible, setModalVisible] = useState(false);

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
                            onPress={() => setModalVisible(true)}
                            style={styles.startButton}
                        >
                            <Text style={styles.startButtonText}>Upload</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ImageBackground>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableWithoutFeedback
                        onPress={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <LottieView
                                source={require("../../../assets/lottie/Owl.json")}
                                autoPlay
                                loop
                                style={styles.lottie}
                            />
                            <TouchableWithoutFeedback>
                                <View
                                    style={[
                                        styles.modalContent,
                                        { backgroundColor: theme.childModal },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.modalText,
                                            { color: theme.landingInstruction },
                                        ]}
                                    >
                                        Upload Photo
                                    </Text>
                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <MaterialCommunityIcons
                                                name="camera-outline"
                                                style={[
                                                    styles.icons,
                                                    {
                                                        backgroundColor:
                                                            theme.selectedTab,
                                                    },
                                                ]}
                                            />
                                            <Text
                                                style={{
                                                    marginLeft: 8,
                                                    marginTop: 10,
                                                }}
                                            >
                                                Take Photo
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <MaterialCommunityIcons
                                                name="image-outline"
                                                style={[
                                                    styles.icons,
                                                    {
                                                        backgroundColor:
                                                            theme.selectedTab,
                                                    },
                                                ]}
                                            />
                                            <Text
                                                style={{
                                                    marginLeft: 8,
                                                    marginTop: 10,
                                                }}
                                            >
                                                From Gallery
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
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
        fontWeight: "800", // Use string for fontWeight
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
    modalContainer: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
    modalContent: {
        alignItems: "center",
        alignSelf: "center",
        width: 300,
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontFamily: "robotoMedium",
        fontSize: 22,
        marginBottom: 35,
    },
    iconContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 50,
    },
    icons: {
        color: "#016A70",
        fontSize: 35,
        borderRadius: 10,
        padding: 8,
    },
});

export default UploadPhoto;
