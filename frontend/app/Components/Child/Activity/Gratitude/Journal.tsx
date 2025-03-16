import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Modal,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../../../ThemeContext";
import FontLoader from "@/FontLoader";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

const Journal = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const [text, setText] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const [userName, setUserName] = useState("User");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [disabled, setDisabled] = useState(false);

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

    // Get date
    const getDate = () => {
        const options: any = {
            weekday: "short",
            month: "short",
            day: "numeric",
        };
        return new Date().toLocaleDateString("en-US", options);
    };

    // Clear the prompt
    const handleClear = () => {
        setText("");
    };

    // finish functon
    const handleFinish = async () => {
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);

        try {
            if (userId) {
                const payload = {
                    id: "ca11",
                    text,
                    day: getDate(),
                    timestamp: firestore.FieldValue.serverTimestamp(),
                };

                // Save to Firestore
                await firestore()
                    .collection("ChildGratitude")
                    .doc(userId)
                    .collection("Gratitude")
                    .add(payload);

                setIsSuccess(true);
            } else {
                throw new Error("User ID is null");
            }
        } catch (error) {
            console.error("Error saving journal:", error);
            setIsError(true);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
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
                {/* <TouchableOpacity>
                    <MaterialCommunityIcons
                        name="chevron-left"
                        style={{ color: theme.title, fontSize: 50 }}
                    />
                </TouchableOpacity> */}

                <Text style={[styles.dateText]}>New Diary: {getDate()}</Text>

                <Text style={[styles.mainText, { color: theme.textTernary }]}>
                    Hi <Text style={{ color: theme.title }}>{firstname}</Text>,
                    How are you feeling today? 😊
                </Text>

                <View style={{ flexDirection: "row", gap: "30" }}>
                    <TouchableOpacity
                        style={[
                            styles.btnContainer,
                            { backgroundColor: theme.smallBtnBg },
                        ]}
                    >
                        <MaterialCommunityIcons
                            style={[styles.btnIcon, { color: theme.title }]}
                            name="restore"
                        />
                        <Text style={[styles.btnText, { color: theme.title }]}>
                            Reset propmt
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.btnContainer,
                            { backgroundColor: theme.smallBtnBg },
                        ]}
                        onPress={handleClear}
                    >
                        <MaterialCommunityIcons
                            style={[styles.btnIcon, { color: theme.title }]}
                            name="close"
                        />
                        <Text style={[styles.btnText, { color: theme.title }]}>
                            Clear propmt
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[
                        styles.btnContainer,
                        {
                            width: 180,
                            marginTop: 15,
                            backgroundColor: theme.smallBtnBg,
                        },
                    ]}
                    onPress={() => {
                        router.push(
                            "/Components/Child/Activity/Gratitude/AllDiary"
                        );
                    }}
                >
                    <MaterialCommunityIcons
                        style={[styles.btnIcon, { color: theme.title }]}
                        name="align-vertical-center"
                    />
                    <Text style={[styles.btnText, { color: theme.title }]}>
                        Show all juornals
                    </Text>
                </TouchableOpacity>

                <View style={{ height: "50%", marginTop: 10 }}>
                    <TextInput
                        style={[styles.textInput, { color: theme.textTernary }]}
                        placeholder="Write anything...."
                        placeholderTextColor="#999"
                        scrollEnabled={false}
                        multiline={true}
                        numberOfLines={1000}
                        value={text}
                        onChangeText={setText}
                    />
                </View>

                <TouchableOpacity
                    style={[
                        styles.finishBtn,
                        (disabled || text.trim() === "") &&
                            styles.disabledButton, // Disable if text is empty or upload is in progress
                    ]}
                    onPress={handleFinish}
                    disabled={disabled || text.trim() === ""} // Disable if text is empty or upload is in progress
                >
                    <Text style={styles.finishBtnText}>Finish</Text>
                </TouchableOpacity>

                {/* Loading Modal */}
                <Modal
                    visible={isLoading}
                    transparent={true}
                    animationType="fade"
                >
                    <View
                        style={[
                            styles.modalContainer,
                            { backgroundColor: theme.loadingModalBg },
                        ]}
                    >
                        {isSuccess ? (
                            <LottieView
                                source={require("../../../../../assets/lottie/successLottie.json")}
                                autoPlay={true}
                                loop={false}
                                style={styles.lottieAnimation}
                            />
                        ) : isError ? (
                            <LottieView
                                source={require("../../../../../assets/lottie/failedLottie.json")}
                                autoPlay={true}
                                loop={false}
                                style={styles.lottieAnimation}
                            />
                        ) : (
                            <LottieView
                                source={require("../../../../../assets/lottie/LoadingElepGre.json")}
                                autoPlay={true}
                                loop={true}
                                style={styles.lottieAnimation}
                            />
                        )}

                        {/* Show appropriate text based on state */}
                        <Text style={styles.loadingText}>
                            {isSuccess
                                ? "Journal saved successfully!"
                                : isError
                                ? "Failed to save journal. Please try again."
                                : "Saving your journal...."}
                        </Text>
                    </View>
                </Modal>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    dateText: {
        fontSize: 16,
        fontFamily: "asul",
        color: "#5e5e5e",
        marginTop: 50,
        marginBottom: 25,
    },
    mainText: {
        fontSize: 25,
        marginBottom: 25,
        fontFamily: "roboto",
    },
    btnContainer: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 50,
    },
    btnIcon: {
        fontSize: 20,
        fontWeight: "700",
        color: "#016A70",
    },
    btnText: {
        fontSize: 14,
        fontFamily: "roboto",
        fontWeight: "700",
        color: "#016A70",
    },
    textInput: {
        width: "100%",
        minHeight: 100,
        fontSize: 16,
        color: "#333",
        fontFamily: "roboto",
    },
    finishBtn: {
        width: 160,
        paddingVertical: 14,
        borderRadius: 50,
        alignSelf: "flex-end",
        alignItems: "center",
        backgroundColor: "#016A70",
    },
    finishBtnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "poppinsSemiBold",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    lottieAnimation: {
        width: 200,
        height: 200,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: "poppins",
        color: "#F3FAF4",
        textTransform: "capitalize",
    },
});

export default Journal;
