import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import FontLoader from "@/FontLoader";

type ActivityType = {
    id: string;
    day: number;
    title: string;
    subtitle: string;
    onPress: () => void;
    circleColor: string
};

const Activity = ({ title, subtitle, onPress, circleColor }: ActivityType) => {
    return (
        <FontLoader>
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.textContainer}>
                        <View style={styles.titleContainer}>
                            <View style={[styles.circle, {backgroundColor: circleColor}]} />
                            <Text style={styles.mainText}>{title}</Text>
                        </View>
                        <Text style={styles.subText}>{subtitle}</Text>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>Complete</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3FAF4",
        width: "75%",
        height: 135,
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "flex-end",
        borderRadius: 40,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    textContainer: {
        flex: 1,
        gap: 8,
        paddingVertical: 20,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: 5,
    },
    mainText: {
        fontSize: 20,
        fontFamily: "poppins",
        fontWeight: "700",
    },
    subText: {
        fontSize: 13,
        fontFamily: "roboto",
        color: "#ccc",
    },
    dateContainer: {
        width: 80,
        height: 28,
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightblue",
        borderRadius: 150,
    },
    dateText: {
        fontSize: 12,
    },
});

export default Activity;
