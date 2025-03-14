import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useTheme } from "../../ThemeContext";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

const Photo = () => {
    const { theme } = useTheme() as { theme: any };
    const router = useRouter();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            console.log("Selected Image URI:", result.assets[0].uri); // Debugging
        }
    };

    // Open gallery to select a photo
    const openGallery = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            console.log("Selected Image URI:", result.assets[0].uri); // Debugging
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

            // const response = await axios.post(
            //     "https://moodz.fly.dev/child/classify",
            //     formData,
            //     {
            //         headers: { "Content-Type": "multipart/form-data" },
            //     }
            // );

            // const result = response.data;
            // console.log("API Response:", result);

            // if (result.status === "success") {
            //     router.push({
            //         pathname: "/Components/Child/QuestionIntro",
            //         params: { emotion: result.emotion },
            //     });
            // } else {
            //     Alert.alert(
            //         "Error",
            //         result.detail || "Failed to classify image"
            //     );
            // }

            router.push("/Components/Child/QuestionIntro")
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
        <View
            style={[
                styles.modalContainer,
                { backgroundColor: theme.childModal },
            ]}
        >
            {selectedImage ? (
                <View style={styles.selectedImageContainer}>
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.selectedImage}
                        resizeMode="contain"
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
                            onPress={() => setSelectedImage(null)} // Go back to upload options
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
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={[styles.confirmBtnText]}>
                                    Confirm
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.wrapper}>
                    <LottieView
                        source={require("../../../assets/lottie/Bird.json")}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                    <View
                        style={[
                            styles.modalContent,
                            { backgroundColor: theme.childModalContent },
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
                                            backgroundColor: theme.selectedTab,
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
                                            backgroundColor: theme.selectedTab,
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
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    lottie: {
        width: 300,
        height: 300,
    },
    modalContainer: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
    },
    wrapper: {
      display: "flex",
      gap: 50
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
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
    },
    selectedImage: {
        width: "90%",
        height: 400,
        borderRadius: 10,
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

export default Photo;
