import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ToastAndroid,
    BackHandler,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import { useTheme } from "../ThemeContext";
import LottieView from "lottie-react-native";
import Article1 from "../Articles/EPDSArticle1";
import Article2 from "../Articles/GDSArticle1";
import firestore from "@react-native-firebase/firestore";

export default function Home() {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [userName, setUserName] = useState("User");
    const { theme } = useTheme() as { theme: any };
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleAct, setModalVisibleAct] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    const depressionCollection = firestore().collection("DepressionType");

    const getQuestionnaireRoute = (category: string) => {
        switch (category) {
            case "child":
                return "/Components/Child/Activity/StoryTime/StoryTelling";
            case "marital":
                return "/Components/DAS/Questionnaire";
            case "postpartum":
                return "/Components/EPDS/Questionnaire";
            case "adult":
                return "/Components/GDS/Questionnaire";
            default:
                return "/"; // Default route if category is unknown
        }
    };

    // Function to get the activity route based on the category
    const getActivityRoute = (category: string) => {
        switch (category) {
            case "child":
                return "/Components/Child/SubComponents/ChildMyActivity";
            case "marital":
                return "/Components/DAS/DASAbout";
            case "postpartum":
                return "/Components/EPDS/SubComponents/EPDSMyActivity";
            case "adult":
                return "/Components/GDS/GDSHome";
            default:
                return "/"; // Default route if category is unknown
        }
    };

    // Function to check if the user has submitted the questionnaire at least once
    const hasUserSubmittedQuestionnaire = async (
        userId: string,
        category: string
    ) => {
        try {
            const epdsQuery = firestore()
                .collection("UsersEpds")
                .doc(userId)
                .collection("Questionnaires")
                .where("category", "==", category)
                .get();

            const gdsQuery = firestore()
                .collection("UsersGDS")
                .doc(userId)
                .collection("QuestionnairesGDS")
                .where("category", "==", category)
                .get();

            const dasQuery = firestore()
                .collection("UsersDAS")
                .doc(userId)
                .collection("QuestionnairesDAS")
                .where("category", "==", category)
                .get();

            const [epdsSnapshot, gdsSnapshot, dasSnapshot] = await Promise.all([
                epdsQuery,
                gdsQuery,
                dasQuery,
            ]);

            return !epdsSnapshot.empty || !gdsSnapshot.empty || !dasSnapshot.empty; // Returns true if at least one document exists in either collection
        } catch (error) {
            console.error("Error checking questionnaire submission:", error);
            return false;
        }
    };

    const handlePress = async (category: string) => {
        setSelectedCategory(category);
        setLoading(true);

        // Get the current user ID
        const user = auth().currentUser;

        if (user) {
            const userId = user.uid;

            // Save the selected category to Firestore
            try {
                await depressionCollection.doc(userId).set(
                    {
                        selectedCategory: category,
                        depressionTypeId: getCategoryId(category), // Save the depression type id
                    },
                    { merge: true } // Merge to update the document without overwriting it
                );
                console.log("Depression type saved to Firestore");
            } catch (error) {
                console.error("Error saving depression type:", error);
            }

            // Check if the user has submitted the questionnaire at least once
            const hasSubmitted = await hasUserSubmittedQuestionnaire(
                userId,
                category
            );

            if (hasSubmitted) {
                // If the user has submitted the questionnaire, show the modal
                setModalVisibleAct(true);
            } else {
                // If the user hasn't submitted the questionnaire, navigate to the questionnaire
                const questionnaireRoute = getQuestionnaireRoute(category);
                router.push(questionnaireRoute as any);
            }
        }

        setLoading(false);
    };

    const getCategoryId = (category: string) => {
        switch (category) {
            case "child":
                return 0;
            case "marital":
                return 1;
            case "postpartum":
                return 2;
            case "adult":
                return 3;
            default:
                return -1; // If category is unknown
        }
    };

    const handleUserChoice = async (
        choice: "questionnaire" | "activities",
        category: string
    ) => {
        if (choice === "questionnaire") {
            const questionnaireRoute = getQuestionnaireRoute(category);
            router.push(questionnaireRoute as any);
        } else if (choice === "activities") {
            const activityRoute = getActivityRoute(category);
            router.push(activityRoute as any);
        }
        setModalVisibleAct(false);
    };

    const handleBackPress = () => {
        if (loading) {
            setLoading(false);
            setSelectedCategory(null);
            return true;
        }
        return false;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackPress
            );
        };
    }, [loading]);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const photoURL = await AsyncStorage.getItem("userPhotoURL");
                const name = await AsyncStorage.getItem("userName");

                setProfileImage(photoURL || null);
                setUserName(name || "User");
            } catch (error) {
                console.error("Failed to load user data:", error);
            }
        };

        loadUserData();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image
                        source={
                            profileImage
                                ? { uri: profileImage }
                                : require("../../assets/images/userpic.png")
                        }
                        style={styles.profileImage}
                    />
                    <View style={styles.userText}>
                        <Text
                            style={[
                                styles.greeting,
                                {
                                    color: theme.textPrimary,
                                    flexWrap: "wrap",
                                    maxWidth: 250,
                                },
                            ]}
                        >
                            Hello,{" "}
                            <Text
                                style={[
                                    styles.userName,
                                    { color: theme.title },
                                ]}
                            >
                                {userName}
                            </Text>
                        </Text>
                        <Text style={styles.subtitle}>
                            How can I help you today?
                        </Text>
                    </View>
                </View>

                {/* Notification Bell */}
                <View style={styles.iconWrapper}>
                    <MaterialCommunityIcons
                        name="bell"
                        size={28}
                        style={{ color: theme.iconColor }}
                    />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </View>
            </View>

            {/* Depression Categories */}
            <View style={styles.categoryContainer}>
                {/* Child Depression */}
                <TouchableOpacity
                    style={[styles.categoryBox, { backgroundColor: "#E6E6FA" }]}
                    onPress={() => handlePress("child")}
                >
                    {loading && selectedCategory === "child" ? (
                        <LottieView
                            source={require("../../assets/lottie/LoadingAAA.json")}
                            autoPlay
                            loop
                            style={styles.lottie}
                        />
                    ) : (
                        <>
                            <Image
                                source={require("../../assets/images/child.png")}
                                style={styles.categoryImage}
                            />
                            <Text style={styles.categoryText}>
                                Child{"\n"}Depression
                            </Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Marital Depression */}
                <TouchableOpacity
                    style={[styles.categoryBox, { backgroundColor: "#FAD2D2" }]}
                    onPress={() => handlePress("marital")}
                >
                    {loading && selectedCategory === "marital" ? (
                        <LottieView
                            source={require("../../assets/lottie/LoadingAAA.json")}
                            autoPlay
                            loop
                            style={styles.lottie}
                        />
                    ) : (
                        <>
                            <Image
                                source={require("../../assets/images/marital.png")}
                                style={styles.categoryImage}
                            />
                            <Text style={styles.categoryText}>
                                Marital{"\n"}Depression
                            </Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Postpartum Depression */}
                <TouchableOpacity
                    style={[styles.categoryBox, { backgroundColor: "#D2FAD2" }]}
                    onPress={() => handlePress("postpartum")}
                >
                    {loading && selectedCategory === "postpartum" ? (
                        <LottieView
                            source={require("../../assets/lottie/LoadingAAA.json")}
                            autoPlay
                            loop
                            style={styles.lottie}
                        />
                    ) : (
                        <>
                            <Image
                                source={require("../../assets/images/postpartum.png")}
                                style={styles.categoryImage}
                            />
                            <Text style={styles.categoryText}>
                                Postpartum{"\n"}Depression
                            </Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Adult Depression */}
                <TouchableOpacity
                    style={[styles.categoryBox, { backgroundColor: "#FADCA2" }]}
                    onPress={() => handlePress("adult")}
                >
                    {loading && selectedCategory === "adult" ? (
                        <LottieView
                            source={require("../../assets/lottie/LoadingAAA.json")}
                            autoPlay
                            loop
                            style={styles.lottie}
                        />
                    ) : (
                        <>
                            <Image
                                source={require("../../assets/images/adult.png")}
                                style={styles.categoryImage}
                            />
                            <Text style={styles.categoryText}>
                                Elderly{"\n"}Depression
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>

            {/* Articles Section */}
            <View style={styles.articlesContainer}>
                <Text
                    style={[styles.articleTitle, { color: theme.textPrimary }]}
                >
                    Articles
                </Text>

                {/* Scrollable Articles */}
                <ScrollView
                    style={styles.articleScrollView}
                    contentContainerStyle={{ paddingBottom: 220 }}
                >
                    {/* Article 1 */}
                    <TouchableOpacity
                        style={[
                            styles.articleBox,
                            { backgroundColor: theme.semi_container },
                        ]}
                        onPress={() => setModalVisible(true)}
                    >
                        <View style={styles.articleContent}>
                            <Text
                                style={[
                                    styles.articleHeading,
                                    { color: theme.textPrimary },
                                ]}
                            >
                                Postpartum Depression :{" "}
                            </Text>
                            <Text
                                style={[
                                    styles.articleText,
                                    { color: theme.dimText },
                                ]}
                            >
                                A Comprehensive Overview of Causes, Symptoms,
                                Diagnosis, and Treatment
                            </Text>
                        </View>
                        <Image
                            source={require("../../assets/images/postpartum.png")}
                            style={styles.articleImage}
                        />
                    </TouchableOpacity>
                    <Article1
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />

                    {/* Article 2 */}
                    <TouchableOpacity
                        style={[
                            styles.articleBox,
                            { backgroundColor: theme.semi_container },
                        ]}
                        onPress={() => setModalVisible(true)}
                    >
                        <View style={styles.articleContent}>
                            <Text
                                style={[
                                    styles.articleHeading,
                                    { color: theme.textPrimary },
                                ]}
                            >
                                Elderly Depression :{" "}
                            </Text>
                            <Text
                                style={[
                                    styles.articleText,
                                    { color: theme.dimText },
                                ]}
                            >
                                A Comprehensive Overview of Causes, Symptoms,
                                Diagnosis, and Treatment
                            </Text>
                        </View>
                        <Image
                            source={require("../../assets/images/adult.png")}
                            style={styles.articleImage}
                        />
                    </TouchableOpacity>
                    <Article2
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />

                    {/* Article 3 */}
                    <TouchableOpacity
                        style={[
                            styles.articleBox,
                            { backgroundColor: theme.semi_container },
                        ]}
                    >
                        <View style={styles.articleContent}>
                            <Text
                                style={[
                                    styles.articleHeading,
                                    { color: theme.textPrimary },
                                ]}
                            >
                                Article 2
                            </Text>
                            <Text
                                style={[
                                    styles.articleText,
                                    { color: theme.dimText },
                                ]}
                            >
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </Text>
                        </View>
                        <Image
                            source={require("../../assets/images/marital.png")}
                            style={styles.articleImage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.articleBox,
                            { backgroundColor: theme.semi_container },
                        ]}
                    >
                        <View style={styles.articleContent}>
                            <Text
                                style={[
                                    styles.articleHeading,
                                    { color: theme.textPrimary },
                                ]}
                            >
                                Article 2
                            </Text>
                            <Text
                                style={[
                                    styles.articleText,
                                    { color: theme.dimText },
                                ]}
                            >
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </Text>
                        </View>
                        <Image
                            source={require("../../assets/images/marital.png")}
                            style={styles.articleImage}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Full-Screen Popup */}
            {modalVisibleAct && (
                <View style={styles.fullScreenOverlay}>
                    {/* Overlay to close the popup when clicked outside */}
                    <TouchableOpacity
                        style={styles.overlay}
                        activeOpacity={1} // Prevents flickering
                        onPress={() => setModalVisibleAct(false)} // Close popup when clicked outside
                    >
                        {/* Popup content */}
                        <View style={styles.fullScreenPopup}>
                            <Text style={styles.modalText}>
                                Choose an option:
                            </Text>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() =>
                                    handleUserChoice(
                                        "questionnaire",
                                        selectedCategory!
                                    )
                                }
                            >
                                <Text style={styles.modalButtonText}>
                                    Questionnaire
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() =>
                                    handleUserChoice(
                                        "activities",
                                        selectedCategory!
                                    )
                                }
                            >
                                <Text style={styles.modalButtonText}>
                                    Activities
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreenOverlay: {
        position: "absolute", // Cover the entire screen
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        justifyContent: "center", // Center the popup vertically
        alignItems: "center", // Center the popup horizontally
        zIndex: 999, // Ensure it overlays on top of other content
    },
    overlay: {
        flex: 1, // Cover the entire screen
        width: "100%",
        justifyContent: "center", // Center the popup vertically
        alignItems: "center", // Center the popup horizontally
    },
    fullScreenPopup: {
        width: "80%", // Full width of the screen
        height: "40%", // Full height of the screen
        backgroundColor: "white",
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        borderRadius: 20,
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    modalButton: {
        width: "80%", // Set button width
        padding: 15,
        backgroundColor: "#016A70", // Blue background for buttons
        borderRadius: 5, // Rounded corners for buttons
        alignItems: "center", // Center text horizontally
        marginBottom: 10, // Space between buttons
    },
    modalButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: "#F6FAF6",
    },
    header: {
        flexDirection: "row",
        padding: 20,
        paddingBottom: 25,
        alignItems: "center",
        justifyContent: "space-between",
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    userText: {
        marginLeft: 10,
    },
    greeting: {
        fontSize: 18,
        fontWeight: "bold",
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#016A70",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: "#ccc",
        borderWidth: 2,
    },
    iconWrapper: {
        position: "relative",
    },
    badge: {
        position: "absolute",
        right: -1,
        top: -1,
        backgroundColor: "red",
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingBottom: 25,
    },
    categoryBox: {
        width: 155,
        height: 150,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    categoryImage: {
        width: 90,
        height: 90,
        marginBottom: 10,
    },
    categoryText: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
    },
    articlesContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    articleScrollView: {
        maxHeight: 500, // Allow scrolling only in articles
        paddingBottom: 200,
    },
    articleBox: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 8,
        alignItems: "center",
    },
    articleImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 10,
    },
    articleContent: {
        flex: 1,
    },
    articleHeading: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 2,
    },
    articleText: {
        fontSize: 14,
        color: "#666",
    },
    loadingContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 1,
        width: 100, // Adjust the size of the animation
        height: 100, // Adjust the size of the animation
    },
    lottie: {
        width: 150, // Adjust to your desired size
        height: 150, // Adjust to your desired size
    },
});