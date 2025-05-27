import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { useTheme } from "../../ThemeContext";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import LoadingAlert from "../../constants/LoadingAlert";
import SuccessAlert from "../../constants/SuccessAlert";
import FailedAlert from "../../constants/FailedAlert";
import SureAlert from "@/app/constants/SureAlert";

const Photo = () => {
    const { theme } = useTheme() as { theme: any };
    const router = useRouter();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

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
        setSuccess(false);
        setFailed(false);

        try {
            const formData = new FormData();
            formData.append("file", {
                uri: selectedImage,
                name: "photo.jpg",
                type: "image/jpeg",
            } as any);

            const response = await axios.post(
                "https://moodzchild-hdoty7s3nq-as.a.run.app/child/classify",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            const result = response.data;
            console.log("API Response:", result);

            setLoading(false);

            if (result.status === "success") {
                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);

                    router.push({
                        pathname: "/Components/Child/QuestionIntro",
                        params: {
                            emotion: result.emotion,
                            faceImg: selectedImage,
                        },
                    });
                }, 5000);
            } else {
                setLoading(false);
                setFailed(true);
                setErrorMsg("Please upload a child's face image!");
            }
        } catch (error: any) {
            console.error("Error uploading image:", error);
            setLoading(false);
            setFailed(true);
            setErrorMsg("Something went wrong. Try again!");
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
                            <Text style={[styles.confirmBtnText]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <ImageBackground
                    source={require("../../../assets/images/ChildBG.png")}
                    style={{ height: "100%" }}
                >
                    <View style={styles.wrapper}>
                        <LottieView
                            source={require("../../../assets/lottie/Upload.json")}
                            autoPlay
                            loop
                            style={styles.lottie}
                        />
                        <View
                            style={[
                                styles.modalContent,
                                {
                                    backgroundColor: theme.childModalContent,
                                    borderWidth: 1,
                                    borderStyle: "dashed",
                                    borderColor: theme.textTernary,
                                },
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
                                                backgroundColor: theme.camerabg,
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
                                                    theme.gallerybg,
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
                </ImageBackground>
            )}

            <LoadingAlert
                loading={loading}
                setLoading={setLoading}
                lottie={require("../../../assets/lottie/LoadingElepGre.json")}
                title="LOADING!"
                text="Uploading image... Please wait!"
            />
            {success && (
                <SuccessAlert
                    success={success}
                    setSuccess={setSuccess}
                    lottie={require("../../../assets/lottie/succesfullyDone.json")}
                    title="SUCCESS"
                    text="Image has been uploaded successfully!"
                />
            )}

            {failed && (
                <FailedAlert
                    failed={failed}
                    setFailed={setFailed}
                    lottie={require("../../../assets/lottie/failedLottie.json")}
                    title="FAILED"
                    text={errorMsg}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        height: "100%",
        paddingTop: 60,
        alignItems: "center",
    },
    lottie: {
        width: 400,
        height: 400,
    },
    wrapper: {
        display: "flex",
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
        color: "#fff",
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
        fontSize: 14,
        fontFamily: "poppinsSemiBold",
    },
    confirmBtnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "poppinsSemiBold",
    },
    leaveImg: {
        width: "100%",
    },
    modalWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingContent: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: 350,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#333",
    },
    loadingTextTitle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    animation: {
        width: 200,
        height: 200,
        marginBottom: 5,
    },
    animationLoading: {
        width: 75,
        height: 75,
        marginBottom: 5,
    },
});

export default Photo;
