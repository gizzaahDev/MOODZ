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
import { router, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";

const UploadPhoto = () => {
    const { theme } = useTheme() as { theme: any };

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

    // Request permissions for camera and gallery
    const requestPermissions = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission denied",
                "Sorry, we need camera roll permissions to make this work!"
            );
            return false;
        }
        return true;
    };

    // Open camera to take a photo
    const openCamera = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setModalVisible(false); // Close modal after selection
        }
    };

    // Open gallery to select a photo
    const openGallery = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setModalVisible(false); // Close modal after selection
        }
    };

    // Upload Image and Call API
    const handleConfirm = async () => {
        if (!selectedImage) {
            Alert.alert("No image selected", "Please select an image first.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", {
                uri: selectedImage,
                name: "photo.jpg",
                type: "image/jpeg",
            } as any);

            const response = await axios.post(
                "https://moodz.fly.dev/child/classify/",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            const result = response.data;
            console.log("API Response:", result);

            if (result.status === "success") {
                router.push({
                    pathname: "/Components/Child/Landing",
                    params: { emotion: result.emotion },
                });
            } else {
                Alert.alert(
                    "Error",
                    result.detail || "Failed to classify image"
                );
            }
        } catch (error: any) {
            console.error("Error uploading image:", error);
            Alert.alert(
                "Upload failed",
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
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
                                            onPress={openCamera}
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
                                                    color: theme.landingInstruction,
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
                                            onPress={openGallery}
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
                                                    color: theme.landingInstruction,
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

                {/* Display Selected Image */}
                {selectedImage && (
                    <Modal>
                        <View style={styles.selectedImageContainer}>
                            <Image
                                source={{ uri: selectedImage }}
                                style={styles.selectedImage}
                            />

                            <View style={styles.imgButtonContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.imgBtn,
                                        {
                                            borderWidth: 2,
                                            borderColor: theme.title,
                                        },
                                    ]}
                                    onPress={() => router.back()}
                                >
                                    <Text
                                        style={[
                                            styles.backBtnText,
                                            {
                                                color: theme.title,
                                            },
                                        ]}
                                    >
                                        Go Back
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.imgBtn,
                                        { backgroundColor: theme.title },
                                    ]}
                                    onPress={handleConfirm}
                                >
                                    <Text style={[styles.confirmBtnText]}>
                                        Confirm
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
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
    selectedImageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 50,
        backgroundColor: "#0f0f0f",
    },
    selectedImage: {
        width: "95%",
        height: 400,
        resizeMode: "cover",
    },
    imgButtonContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    imgBtn: {
        width: 160,
        paddingVertical: 14,
        borderRadius: 50,
        alignSelf: "center",
        alignItems: "center",
    },
    backBtnText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "poppinsSemiBold",
    },
    confirmBtnText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "poppinsSemiBold",
    },
});

export default UploadPhoto;
