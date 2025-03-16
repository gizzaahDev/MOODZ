import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    StyleSheet,
    Image,
    ToastAndroid,
    Modal,
    Linking,
    useColorScheme,
} from "react-native";
import axios from "axios";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useTheme } from "../../ThemeContext";
import { BlurView } from "expo-blur";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import buttonSizes from "../../Dimensions/buttonSize";
import LottieView from "lottie-react-native";

const questions = [
    {
        question: "I was bothered by things that usually don’t bother me",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I did not feel like eating, I wasn’t very hungry.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question:
            "I wasn’t able to feel happy, even when my family or friends tried to help me feel better.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I felt like I was just as good as other kids.",
        answers: [
            { label: "Not At All", value: 3 },
            { label: "A Little", value: 2 },
            { label: "Some", value: 1 },
            { label: "A Lot", value: 0 },
        ],
    },
    {
        question: "I felt like I couldn’t pay attention to what I was doing.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I felt down and unhappy.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I felt like I was too tired to do things.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I felt like something good was going to happen.",
        answers: [
            { label: "Not At All", value: 3 },
            { label: "A Little", value: 2 },
            { label: "Some", value: 1 },
            { label: "A Lot", value: 0 },
        ],
    },
    {
        question: "I felt like things I did before didn’t work out right.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I felt scared.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I didn’t sleep as well as I usually sleep.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I was happy.",
        answers: [
            { label: "Not At All", value: 3 },
            { label: "A Little", value: 2 },
            { label: "Some", value: 1 },
            { label: "A Lot", value: 0 },
        ],
    },
    {
        question: "I was more quiet than usual.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I felt lonely, like I didn’t have any friends.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question:
            "I felt like kids I know were not friendly or that they didn’t want to be with me.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I had a good time.",
        answers: [
            { label: "Not At All", value: 3 },
            { label: "A Little", value: 2 },
            { label: "Some", value: 1 },
            { label: "A Lot", value: 0 },
        ],
    },
    {
        question: "I felt like crying.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I felt sad",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: "I felt people didn’t like me.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
    {
        question: " It was hard to get started doing things.",
        answers: [
            { label: "Not At All", value: 0 },
            { label: "A Little", value: 1 },
            { label: "Some", value: 2 },
            { label: "A Lot", value: 3 },
        ],
    },
];

const Questionnaire = () => {
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [prediction, setPrediction] = useState("");

    const router = useRouter();

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


    const { theme } = useTheme() as { theme: any };

    const handleSelect = (value: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = value;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (answers[currentQuestionIndex] === null) {
            ToastAndroid.show(
                "Please answer the question before moving to the next one.",
                ToastAndroid.SHORT // or ToastAndroid.LONG for a longer display
            );

            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const checkServerConnection = async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1500); // Set a timeout for the request

        try {
            const response = await fetch("https://moodz.fly.dev/", {
                method: "GET", // Use GET method to check server
                signal: controller.signal,
            });
            clearTimeout(timeout);

            if (response.ok) {
                return true; // Return true if the server is reachable
            } else {
                return false; // Return false if the server is unreachable
            }
        } catch (error) {
            clearTimeout(timeout);
            return false; // Return false if an error or timeout occurs
        }
    };

    const handleSubmit = async () => {
        // Immediately check connectivity to the backend server
        const isServerConnected = await checkServerConnection();

        if (!isServerConnected) {
            ToastAndroid.show(
                "No internet connection. Please check your connection.",
                ToastAndroid.SHORT
            );
            return; // Exit early if server is not reachable
        }

        // Validate answers before submitting
        if (answers.includes(null)) {
            ToastAndroid.show(
                "Please answer all the questions before submitting.",
                ToastAndroid.SHORT
            );
            return; // Exit early if there are unanswered questions
        }

        // Show loading animation
        setIsLoading(true);

        try {
            // Proceed with submission if server is reachable
            const response = await axios.post(
                "https://moodz.fly.dev/child/predict",
                {
                    Q1: answers[0],
                    Q2: answers[1],
                    Q3: answers[2],
                    Q4: answers[3],
                    Q5: answers[4],
                    Q6: answers[5],
                    Q7: answers[6],
                    Q8: answers[7],
                    Q9: answers[8],
                    Q10: answers[9],
                    Q11: answers[10],
                    Q12: answers[11],
                    Q13: answers[12],
                    Q14: answers[13],
                    Q15: answers[14],
                    Q16: answers[15],
                    Q17: answers[16],
                    Q18: answers[17],
                    Q19: answers[18],
                    Q20: answers[19],
                }
            );

            const prediction = response.data;
            console.log(prediction);
            // prediction have two atrributes. prediction (0/1) and isDeprssed (yes/no)

            if (userId) {
                const payload = {
                    answers,
                    prediction,
                    timestamp: firestore.FieldValue.serverTimestamp(),
                };

                await firestore()
                    .collection("UserChilds")
                    .doc(userId)
                    .collection("QuestionnaireChilds")
                    .add(payload);
            } else {
                throw new Error("User ID is null");
            }

            // Hide loading animation and show success message after submission
            setTimeout(() => {
                setIsLoading(false); // Stop loading animation
                setPrediction(prediction);
                setShowModal(true);
            }, 3500); // Wait for 3 seconds before hiding the loading animation
        } catch (error) {
            console.error("Error submitting data:", error);

            // Handle error by stopping the loading animation and showing the error message
            setTimeout(() => {
                setIsLoading(false); // Stop loading animation in case of error
                ToastAndroid.show(
                    "Submission failed. Please try again.",
                    ToastAndroid.SHORT
                );
            }, 3000); // Wait for 3 seconds before hiding the loading animation
        }
    };

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const colorScheme = useColorScheme();
    const intensity = colorScheme === "dark" ? 100 : 200;

    return (
        <>
            <View style={[styles.startcontainer]}>
                <View
                    style={[
                        styles.bgcontainer,
                        { backgroundColor: theme.background },
                    ]}
                >
                    <Image
                        source={require("../../../assets/images/rb_864.png")}
                        style={[
                            styles.startImage,
                            theme.imageStyle,
                            { backgroundColor: theme.imageBG },
                        ]} // Apply imageStyle from theme
                    />
                    <View>
                        <View style={{ flex: 1, padding: 20 }}>
                            {currentQuestionIndex > 0 ? (
                                <TouchableOpacity
                                    style={[styles.previousButton]}
                                    onPress={handlePrevious}
                                >
                                    <MaterialIcons
                                        name="keyboard-arrow-left"
                                        size={24}
                                        style={{ color: theme.textPrimary }}
                                    />
                                    <Text
                                        style={[
                                            styles.previousButtonText,
                                            { color: theme.textPrimary },
                                        ]}
                                    >
                                        Previous
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={styles.previousButton}
                                    onPress={() => router.push("/(tabs)")}
                                >
                                    <MaterialIcons
                                        name="keyboard-arrow-left"
                                        size={24}
                                        style={{ color: theme.textPrimary }}
                                    />
                                    <Text
                                        style={[
                                            styles.previousButtonText,
                                            { color: theme.textPrimary },
                                        ]}
                                    >
                                        Back
                                    </Text>
                                </TouchableOpacity>
                            )}

                            <BlurView
                                intensity={intensity}
                                style={[
                                    styles.blur,
                                    { backgroundColor: theme.bluranime },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.title,
                                        { color: theme.title },
                                    ]}
                                >
                                    CES-DC
                                </Text>
                            </BlurView>

                            <BlurView
                                intensity={intensity}
                                style={[
                                    styles.bluranime,
                                    { backgroundColor: theme.bluranime },
                                ]}
                            >
                                {/* The Question Text */}
                                <Text
                                    style={[
                                        styles.question,
                                        { flexWrap: "wrap", maxWidth: 280 },
                                        { color: theme.textPrimary },
                                    ]}
                                >
                                    {currentQuestionIndex + 1}.{" "}
                                    {questions[currentQuestionIndex].question}
                                </Text>
                            </BlurView>

                            {/* Wrapping AnimatedCircularProgress in a separate View for visual layering */}
                            <View style={styles.circularProgressWrapper}>
                                <AnimatedCircularProgress
                                    size={90}
                                    width={8}
                                    fill={progress}
                                    tintColor="#016A70"
                                    backgroundColor={theme.answerTab}
                                    rotation={0}
                                    lineCap="round"
                                    style={[styles.circularProgress]}
                                >
                                    {() => (
                                        <Text style={styles.progressText}>
                                            {currentQuestionIndex + 1}/
                                            {questions.length}
                                        </Text>
                                    )}
                                </AnimatedCircularProgress>
                            </View>

                            <View style={[styles.answersTab]}>
                                {questions[currentQuestionIndex].answers.map(
                                    (choice) => (
                                        <TouchableOpacity
                                            key={choice.value}
                                            style={{
                                                ...styles.answerButton,
                                                backgroundColor:
                                                    answers[
                                                        currentQuestionIndex
                                                    ] === choice.value
                                                        ? theme.selectedTab
                                                        : theme.answerTab,
                                            }}
                                            onPress={() =>
                                                handleSelect(choice.value)
                                            }
                                        >
                                            <Text
                                                style={[
                                                    styles.answerText,
                                                    {
                                                        color: theme.textPrimary,
                                                    },
                                                ]}
                                            >
                                                {choice.label}
                                            </Text>
                                            <View
                                                style={{
                                                    ...styles.radioCircle,
                                                    backgroundColor:
                                                        answers[
                                                            currentQuestionIndex
                                                        ] === choice.value
                                                            ? "#016A70"
                                                            : theme.answerTab,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )
                                )}
                            </View>

                            <View style={styles.buttonContainer}>
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <TouchableOpacity
                                        style={styles.nextButton}
                                        onPress={handleNext}
                                    >
                                        <Text
                                            style={[
                                                styles.submitButtonText,
                                                buttonSizes.large,
                                            ]}
                                        >
                                            Next
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={[
                                            styles.submitButton,
                                            {
                                                backgroundColor:
                                                    answers.includes(null)
                                                        ? "#ccc"
                                                        : "#016A70",
                                            },
                                        ]}
                                        onPress={handleSubmit}
                                    >
                                        <Text
                                            style={[
                                                styles.submitButtonText,
                                                buttonSizes.large,
                                            ]}
                                        >
                                            Submit
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isLoading}
                    onRequestClose={() => setIsLoading(false)}
                >
                    <View
                        style={[
                            styles.modalContainer,
                            { backgroundColor: theme.modalBackground },
                        ]}
                    >
                        <View
                            style={[
                                styles.loadingContent,
                                {
                                    backgroundColor:
                                        theme.loadingModalBackground,
                                },
                            ]}
                        >
                            <LottieView
                                source={require("../../../assets/lottie/succesfullyDone.json")} // Add your Lottie animation file here
                                autoPlay
                                loop
                                style={styles.animation}
                            />
                            <Text
                                style={[
                                    styles.loadingTextTitle,
                                    { color: theme.textPrimary },
                                ]}
                            >
                                SUCCESSFUL!
                            </Text>
                            <Text
                                style={[
                                    styles.loadingText,
                                    { color: theme.dimText },
                                ]}
                            >
                                Questionnaire submitted successfully!
                            </Text>
                            <LottieView
                                source={require("../../../assets/lottie/LoadAnime.json")} // Add your Lottie animation file here
                                autoPlay
                                loop
                                style={styles.animationLoading}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    startcontainer: {
        flex: 1,
        zIndex: 1,
    },

    modalContainer: {
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
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#016A70",
    },
    bluranime: {
        width: 350, // Fixed width
        height: 130,
        borderRadius: 10, // Rounded corners for BlurView
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        top: 70,
        overflow: "hidden",
    },
    blur: {
        width: 350,
        top: 0,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        marginBottom: 20,

        overflow: "hidden", // Ensures rounded corners if used
        padding: 20,
    },
    bgcontainer: {
        flex: 1,
        position: "relative", // Ensure the View's position is relative
        backgroundColor: "#F3FAF4", // Optional: Set a background color if needed
        alignItems: "center",
        justifyContent: "center",
    },
    question: {
        fontWeight: "bold",
        fontSize: 19,
    },
    answersTab: {
        height: 280,
        marginTop: 100,
        marginBottom: 30,
    },
    answerText: {
        flex: 1, // Allow text to take as much space as needed
        marginRight: 10, // Add space between text and radio circle
    },
    answerButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
        borderRadius: 5,
        marginBottom: 5,
        position: "relative",
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#016A70",
        position: "absolute",
        right: 0,
        marginRight: 10,
    },
    submitButton: {
        bottom: 10,
        borderRadius: 50,
        alignItems: "center",
        backgroundColor: "#016A70",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    nextButton: {
        bottom: 10,

        borderRadius: 50,
        alignItems: "center",
        backgroundColor: "#016A70",
    },
    previousButton: {
        left: -40,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
    },
    previousButtonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonContainer: {
        alignItems: "center", // Center the button horizontally
        justifyContent: "center", // Center the button vertically (if needed)
    },
    startImage: {
        width: "103%", // Make the image take up the full width
        height: 350, // Adjust height as per your design
        position: "absolute", // Position the image absolutely
        top: -10, // Position the image at the top of the View
        left: -5, // Align the image to the left
        right: 0, // Align the image to the right
        borderBottomLeftRadius: 30, // Optional: Add a bottom-left radius
        borderBottomRightRadius: 30, // Optional: Add a bottom-right radius
        // iOS Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        // Android Shadow
        elevation: 10,
    },
    circularProgressWrapper: {
        position: "absolute",
        top: 210, // Vertical position remains as-is
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    circularProgress: {
        backgroundColor: "#ddebed",
        borderRadius: 50, // Round the circular progress
        transform: [{ scale: 1.1 }],
    },
    progressText: {
        fontSize: 24,
        color: "#016A70",
        fontWeight: "bold",
    },

    button: {
        backgroundColor: "#272727",
        padding: 15,
        borderRadius: 50,
        width: 350,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonNext: {
        backgroundColor: "#016A70",
        padding: 15,
        borderRadius: 50,
        width: 350,
        alignItems: "center",
        marginBottom: 20,
    },
    highButton: {
        backgroundColor: "#FF6347", // Different color for "Get Professional Help"
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
    },
    buttonTextNext: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
    },

    modalResultsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3FAF4",
    },
    previousButtonResults: {
        left: -140,
        paddingVertical: 12,

        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    ResultsContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        height: 600,
        marginBottom: 20,
        borderRadius: 43,
        width: 360,
        overflow: "hidden",
        elevation: 15,
    },
    titleAboveCurve: {
        fontSize: 25,
        top: -70,

        textAlign: "center",
        color: "#000",
        fontWeight: "bold",
    },
    resultesHeaderContainer: {
        bottom: 240,
    },
    curve: {
        left: 0,
        right: 0,
        elevation: 15,

        height: 650,
        width: 1200, // Height of the curve
        backgroundColor: "#fff", // Match the background color of the container
        borderBottomLeftRadius: 1000, // Large radius to make it an ellipse shape
        borderBottomRightRadius: 1000,
    },
    startAnimation: {},
    containerAnime: {
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    Animeh1title: {
        top: 0,
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#5E5E5E",
    },
    Animeh9title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#5E5E5E",
    },
    Animeh1Predict: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#016A70",
    },
    containerAnimeBackground: {
        paddingTop: 10,
        marginLeft: 15,
        marginRight: 15,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        top: -250,
        width: 330,
        justifyContent: "center",
        alignItems: "center",
    },
    containerWarningBackground: {
        marginLeft: 15,
        marginRight: 15,
        top: -240,
        width: 330,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 40,
    },
    warningText: {
        fontSize: 11,
        marginBottom: 50,
        textAlign: "left",
        color: "#5E5E5E",
    },
});

export default Questionnaire;
