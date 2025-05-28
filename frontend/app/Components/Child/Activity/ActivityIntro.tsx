import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
    Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../../ThemeContext";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const { width } = Dimensions.get("window");

const data = [
    {
        id: 1,
        imageSrc: require("../../../../assets/images/ChildYoga.png"),
        title: "Wellness Plans",
        description:
            "Every child's journey is unique. Receive activities tailored specifically to their growth and development needs.",
        motine: "“You’re stronger than you think.”",
    },
    {
        id: 2,
        imageSrc: require("../../../../assets/images/EPDSwel02.png"),
        title: "Track Progress",
        description:
            "Watch your transformation day by day as you build healthy habits and improve your well-being.",
        motine: "“Self-care isn’t selfish—it’s necessary.”",
    },
    {
        id: 3,
        imageSrc: require("../../../../assets/images/ChildChat.png"),
        title: "Connect and Empower",
        description:
            "Join a supportive community of parents and share your child's growth journey together.",
        motine: "“Every small step adds up to big changes.”",
    },
    {
        id: 4,
        imageSrc: require("../../../../assets/images/ChildAct.png"),
        title: "Simple and Fun Activities",
        description:
            "Fun and simple activities for kids—quick, easy, and engaging!",
        motine: '"You are not alone, and this moment is not forever."',
    },
];

const activityData = [
    {
        id: "da1.1",
        day: 1,
        activityId: "ca11",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca11" },
        circleColor: "green",
        status: "pending",
    },
    {
        id: "da1.2",
        day: 1,
        activityId: "ca1",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca1" },
        circleColor: "#ceb500",
        status: "pending",
    },
    {
        id: "da1.3",
        day: 1,
        activityId: "ca8",
        title: "Sound Scaping",
        subtitle: "Soothing waves, peaceful mind, relaxed soul",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
        status: "pending",
    },
    {
        id: "da2.1",
        day: 2,
        activityId: "ca12",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca12" },
        circleColor: "green",
        status: "pending",
    },
    {
        id: "da2.2",
        day: 2,
        activityId: "ca21",
        title: "Story Time",
        subtitle: "Relax your mind with calming stories",
        pathname: "/Components/Child/Activity/StoryTime/StoryTelling",
        params: { aid: "ca21" },
        circleColor: "#ceb500",
        status: "pending",
    },
    {
        id: "da2.3",
        day: 2,
        activityId: "ca6",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca6" },
        circleColor: "#8612b7",
        status: "pending",
    },
    {
        id: "da3.1",
        day: 3,
        activityId: "ca13",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca13" },
        circleColor: "green",
        status: "pending",
    },
    {
        id: "da3.2",
        day: 3,
        activityId: "ca2",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca2" },
        circleColor: "#ceb500",
        status: "pending",
    },
    {
        id: "da3.3",
        day: 3,
        activityId: "ca7",
        title: "Sound Scaping",
        subtitle: "Soothing waves, peaceful mind, relaxed soul",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca7" },
        circleColor: "#8612b7",
        status: "pending",
    },
    {
        id: "da4.1",
        day: 4,
        activityId: "ca14",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca14" },
        circleColor: "green",
        status: "pending",
    },
    {
        id: "da4.2",
        day: 4,
        activityId: "ca22",
        title: "Sound Scaping 3",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca22" },
        circleColor: "#8612b7",
        status: "pending",
    },
    {
        id: "da4.3",
        day: 4,
        activityId: "ca7",
        title: "Sound Scaping 3",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca7" },
        circleColor: "#8612b7",
        status: "pending",
    },
    {
        id: "da5.1",
        day: 5,
        activityId: "ca15",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca15" },
        circleColor: "green",
        status: "pending",
    },
    {
        id: "da5.2",
        day: 5,
        activityId: "ca3",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca3" },
        circleColor: "#ceb500",
        status: "pending",
    },
    {
        id: "da5.3",
        day: 5,
        activityId: "ca10",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca10" },
        circleColor: "#8612b7",
        status: "pending",
    },
    {
        id: "da6.1",
        day: 6,
        activityId: "ca16",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca16" },
        circleColor: "green",
        status: "pending",
    },
    {
        id: "da6.2",
        day: 6,
        activityId: "ca23",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca23" },
        circleColor: "#ceb500",
        status: "pending",
    },
    {
        id: "da6.3",
        day: 6,
        activityId: "ca8",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca8" },
        circleColor: "#8612b7",
        status: "pending",
    },
    {
        id: "da7.1",
        day: 7,
        activityId: "ca17",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca11" },
        circleColor: "green",
        status: "pending",
    },
    {
        id: "da7.2",
        day: 7,
        activityId: "ca4",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca4" },
        circleColor: "#ceb500",
        status: "pending",
    },
    {
        id: "da7.3",
        day: 7,
        activityId: "ca6",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca6" },
        circleColor: "#8612b7",
        status: "pending",
    },
    {
        id: "da8.1",
        day: 8,
        activityId: "ca18",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca18" },
        circleColor: "green",
        status: "pending",
    },
    {
        id: "da8.2",
        day: 8,
        activityId: "ca24",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca24" },
        circleColor: "#ceb500",
        status: "pending",
    },
    {
        id: "da8.3",
        day: 8,
        activityId: "ca9",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca9" },
        circleColor: "#8612b7",
        status: "pending",
    },
    {
        id: "da9.1",
        day: 9,
        activityId: "ca19",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca19" },
        circleColor: "green",
        status: "pending",
    },
    {
        id: "da9.2",
        day: 9,
        activityId: "ca5",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca5" },
        circleColor: "#ceb500",
        status: "pending",
    },
    {
        id: "da9.3",
        day: 9,
        activityId: "ca7",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca7" },
        circleColor: "#8612b7",
        status: "pending",
    },
    {
        id: "da10.1",
        day: 10,
        activityId: "ca20",
        title: "Gratitude Journaling",
        subtitle: "Write down anything you're grateful for today",
        pathname: "Components/Child/Activity/Gratitude/Journal",
        params: { aid: "ca20" },
        circleColor: "green",
        status: "pending",
    },
    {
        id: "da10.2",
        day: 10,
        activityId: "ca25",
        title: "Breathing Exercise",
        subtitle: "Practice deep breathing for relaxation",
        pathname: "/Components/Child/Activity/Breath/Breathing",
        params: { aid: "ca25" },
        circleColor: "#ceb500",
        status: "pending",
    },
    {
        id: "da10.3",
        day: 10,
        activityId: "ca10",
        title: "Sound Scaping",
        subtitle: "Spend 10 minutes soothing",
        pathname: "/Components/Child/Activity/SoundScape/Intro",
        params: { aid: "ca10" },
        circleColor: "#8612b7",
        status: "pending",
    },
];

const ActivityIntro = () => {
    const { theme } = useTheme() as { theme: any };
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();
    const { depLevel } = useLocalSearchParams();
    const [userId, setUserId] = useState<string | null>(null);
    const [activity, setActivity] = useState(activityData);

    // slice activities
    useEffect(() => {
        if (depLevel === "low") {
            const activityPlan = activityData.slice(0, 15);
            setActivity(activityPlan);
        }
    }, [depLevel]);

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

    const handleNext = async () => {
        if (currentScreen === data.length - 1) {
            try {
                const user: any = auth().currentUser;
                if (user) {
                    await firestore()
                        .collection("UserChilds")
                        .doc(userId as string)
                        .collection("ChildActivity")
                        .add({
                            activity,
                            timestamp: firestore.FieldValue.serverTimestamp(),
                        });
                }
            } catch (error) {
                console.error("Error saving game:", error);
                Alert.alert("Error", "Failed to save game data.");
            }
            router.push("/Components/Child/Activity/ActivityView");
        } else {
            setCurrentScreen(currentScreen + 1);
        }
    };

    console.log(activity);

    const currentData = data[currentScreen];

    const swingAnim = useRef(new Animated.Value(0)).current;

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
        <View style={[styles.blurView, { backgroundColor: theme.background }]}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text
                    style={[styles.headerTitle, { color: theme.textTernary }]}
                >
                    Welcome to Your{" "}
                    {depLevel === "low"
                        ? "5"
                        : depLevel === "moderate"
                        ? "10"
                        : "-1"}{" "}
                    Days Wellness Journey!
                </Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <Text
                    style={[
                        styles.contentTextBig,
                        { color: theme.textDimSubTitle },
                    ]}
                >
                    This app is here to support you every step of the way, so
                    you never feel alone.
                </Text>
            </View>

            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                <View
                    style={[
                        styles.midContainer,
                        {
                            backgroundColor: theme.landingSubTextContainer,
                            elevation: theme.ChildMidShadow,
                        },
                    ]}
                >
                    <View style={[styles.slide, { width }]}>
                        <Text style={[styles.title, { color: theme.title }]}>
                            {currentData.title}
                        </Text>
                        <Text
                            style={[
                                styles.description,
                                { color: theme.textSecondary },
                            ]}
                        >
                            {currentData.description}
                        </Text>
                        <Animated.Image
                            source={currentData.imageSrc}
                            style={[
                                styles.image,
                                { transform: [{ translateY: swingAnim }] },
                            ]}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Pagination Dots */}
                    <View style={styles.pagination}>
                        {data.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setCurrentScreen(index)}
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor:
                                            currentScreen === index
                                                ? theme.activeDot
                                                : theme.dot,
                                        width:
                                            currentScreen === index ? 20 : 10,
                                        height: currentScreen === index ? 5 : 5,
                                        borderRadius:
                                            currentScreen === index ? 10 : 10,
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </View>
                {/* Motivational Quote */}
                <View style={styles.quoteContainer}>
                    <Text style={styles.quoteText}>{currentData.motine}</Text>
                </View>
                {/* Next Button */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: theme.buttonBackground },
                    ]}
                    onPress={handleNext}
                >
                    <Text
                        style={[styles.buttonText, { color: theme.buttonText }]}
                    >
                        {currentScreen === data.length - 1
                            ? "Let's Start"
                            : "Next"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    blurView: {
        height: "100%",
        paddingVertical: 10,
    },
    header: {
        marginTop: 60,
        paddingHorizontal: 10,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#272727",
        textAlign: "center",
    },
    content: {
        marginTop: 25,
        paddingHorizontal: 10,
    },
    contentTextBig: {
        fontSize: 16,
        color: "#666",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },
    container: {
        flex: 1,
        width,
        justifyContent: "center",
        alignItems: "center",
    },
    midContainer: {
        marginTop: 0,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        width: 350,
        padding: 0,
        height: 400,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    quoteContainer: {
        marginTop: 30,
        marginBottom: 20,
        margin: 10,
    },
    quoteText: {
        fontSize: 15,
        color: "#666",
        textAlign: "center",
    },
    slide: {
        width,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 30,
        marginBottom: 20,
        color: "#666",
        paddingHorizontal: 15,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
    },
    dot: {
        marginHorizontal: 5,
    },
    button: {
        padding: 15,
        borderRadius: 50,
        alignItems: "center",
        marginBottom: 20,
        width: "90%",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default ActivityIntro;
