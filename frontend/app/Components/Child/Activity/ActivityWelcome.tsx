import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
    Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../../ThemeContext";
import FontLoader from "@/FontLoader";

const { width } = Dimensions.get("window");

const ActivityWelcome = () => {
    const { theme } = useTheme() as { theme: any };
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();

    const handleNext = () => {
        router.replace("/Components/Child/Activity/ActivityIntro");
    };

    return (
        <FontLoader>
            <View
                style={[styles.blurView, { backgroundColor: theme.background }]}
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.headerTitle,
                            { color: theme.textTernary },
                        ]}
                    >
                        Welcome to Your Wellness Journey!
                    </Text>
                </View>

                {/* Main Content */}
                <View style={styles.content}>
                    <Text
                        style={[styles.contentTextBig, { color: theme.title }]}
                    >
                        You have 10 Days Plan
                    </Text>
                </View>

                <View
                    style={[
                        styles.container,
                        { backgroundColor: theme.background },
                    ]}
                >
                    <Image
                        source={require("../../../../assets/images/AboutGDS.png")}
                        style={{ width: "100%" }}
                    />
                    {/* Next Button */}
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: theme.buttonBackground },
                        ]}
                        onPress={handleNext}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                { color: theme.buttonText },
                            ]}
                        >
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </FontLoader>
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
        marginTop: 20,
        paddingHorizontal: 10,
    },
    contentTextBig: {
        fontSize: 40,
        color: "#666",
        fontFamily: "asul",
        textAlign: "center",
        marginTop: 10,
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        width,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        padding: 15,
        borderRadius: 50,
        alignItems: "center",
        width: "90%",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default ActivityWelcome;
