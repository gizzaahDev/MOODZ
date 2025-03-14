import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useTheme } from "../../ThemeContext";

const { width } = Dimensions.get("window");

const data = [
    {
        id: 1,
        imageSrc: require("../../../assets/images/ChildYoga.png"),
        title: "Wellness Plans",
        description:
            "Every child's journey is unique. Receive activities tailored specifically to their growth and development needs.",
        motine: "“You’re stronger than you think.”",
    },
    {
        id: 2,
        imageSrc: require("../../../assets/images/EPDSwel02.png"),
        title: "Track Progress",
        description:
            "Watch your transformation day by day as you build healthy habits and improve your well-being.",
        motine: "“Self-care isn’t selfish—it’s necessary.”",
    },
    {
        id: 3,
        imageSrc: require("../../../assets/images/ChildChat.png"),
        title: "Connect and Empower",
        description:
            "Join a supportive community of parents and share your child's growth journey together.",
        motine: "“Every small step adds up to big changes.”",
    },
    {
        id: 4,
        imageSrc: require("../../../assets/images/ChildAct.png"),
        title: "Simple and Fun Activities",
        description:
            "Fun and simple activities for kids—quick, easy, and engaging!",
        motine: '"You are not alone, and this moment is not forever."',
    },
];

const ActivityIntro = () => {
    const { theme } = useTheme() as { theme: any };
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();

    const handleNext = () => {
        if (currentScreen === data.length - 1) {
            router.replace("/Components/EPDS/SubComponents/ChooseActivities");
        } else {
            setCurrentScreen(currentScreen + 1);
        }
    };

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
                    Welcome to Your Wellness Journey!
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
                            ? "Choose Activities"
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
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default ActivityIntro;
