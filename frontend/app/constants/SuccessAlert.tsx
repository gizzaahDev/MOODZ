import { View, Text, Modal, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useTheme } from "../ThemeContext";
import FontLoader from "../../FontLoader";

interface alert {
    success: boolean;
    setSuccess: (value: boolean) => void;
    lottie: any;
    title: string;
    text: string;
}

const SuccessAlert: React.FC<alert> = ({ success, setSuccess, lottie, title, text }) => {
    const { theme } = useTheme();

    return (
        <FontLoader>
            <Modal
                animationType="fade"
                transparent={true}
                visible={success}
                onRequestClose={() => setSuccess(false)}
            >
                <View
                    style={[
                        styles.modalContainer,
                        { backgroundColor: theme.loadingModalBg },
                    ]}
                >
                    <View
                        style={[
                            styles.modalView,
                            {
                                backgroundColor: theme.loadingModalBackground,
                            },
                        ]}
                    >
                        <LottieView
                            source={lottie}
                            autoPlay
                            loop
                            style={styles.animation}
                        />
                        <Text
                            style={[styles.title, { color: theme.textPrimary }]}
                        >
                            {title}
                        </Text>
                        <Text style={[styles.text, { color: theme.dimText }]}>
                            {text}
                        </Text>
                    </View>
                </View>
            </Modal>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: "75%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 55,
        borderRadius: 10,
    },
    animation: {
        width: 180,
        height: 180,
    },
    title: {
        fontFamily: "robotoBold",
        fontSize: 16,
    },
    text: {
        fontSize: 13,
        marginTop: 10,
    },
});

export default SuccessAlert;
