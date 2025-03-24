import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useTheme } from "../ThemeContext";
import FontLoader from "../../FontLoader";

interface alert {
    visible: boolean;
    setVisible: (value: boolean) => void;
    lottie: any;
    title: string;
    text: string;
    btn1: string;
    btn2: string;
    onConfirm: () => void;
}

const SureAlert: React.FC<alert> = ({
    visible,
    setVisible,
    lottie,
    title,
    text,
    btn1,
    btn2,
    onConfirm,
}) => {
    const { theme } = useTheme();

    return (
        <FontLoader>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
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
                            duration={2000}
                        />
                        <Text
                            style={[styles.title, { color: theme.textPrimary }]}
                        >
                            {title}
                        </Text>
                        <Text style={[styles.text, { color: theme.dimText }]}>
                            {text}
                        </Text>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.btn,
                                    { backgroundColor: "#016A70" },
                                ]}
                                onPress={() => {
                                    setVisible(false);
                                    onConfirm();
                                }}
                            >
                                <Text
                                    style={[styles.btnText, { color: "#fff" }]}
                                >
                                    {btn1}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.btn,
                                    { backgroundColor: "#bc1929" },
                                ]}
                                onPress={() => {
                                    setVisible(false);
                                }}
                            >
                                <Text
                                    style={[styles.btnText, { color: "#fff" }]}
                                >
                                    {btn2}
                                </Text>
                            </TouchableOpacity>
                        </View>
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
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
        borderRadius: 10,
    },
    animation: {
        width: 180,
        height: 180,
    },
    title: {
        fontFamily: "robotoBold",
        fontSize: 16,
        marginBottom: 10
    },
    text: {
        fontSize: 13,
        textAlign: "center",
        marginTop: 10,
        paddingHorizontal: 15,
    },
    btnContainer: {
        flexDirection: "row",
        gap: 35,
        marginTop: 35,
    },
    btn: {
        padding: 15,
        borderRadius: 8,
    },
    btnText: {
        fontSize: 13,
        paddingHorizontal: 15,
    },
});

export default SureAlert;
