import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import FontLoader from "@/FontLoader";

type DiaryType = {
    id: string;
    day: string;
    text: string;
    index: number;
};

const Diary = ({ id, day, text, index }: DiaryType) => {
    return (
        <FontLoader>
            <View style={[styles.container]}>
                <Image
                    source={require("../../../../../assets/images/ChildDiary.png")}
                    style={[styles.img]}
                />
                <View style={styles.textConatiner}>
                    <Text style={[styles.mainText]}>Journal {index + 1}</Text>
                    <Text style={[styles.subText]}>{text}</Text>
                </View>
                <View style={[styles.dateContainer]}>
                    <Text style={[styles.dateText]}>{day}</Text>
                </View>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D2FAD2",
        width: "95%",
        height: 120,
        flexDirection: "row",
        borderRadius: 40,
        paddingHorizontal: 5,
        alignSelf: "center",
    },
    img: {
        width: 90,
        height: 90,
        resizeMode: "cover",
        alignSelf: "center",
    },
    textConatiner: {
        gap: 4,
        paddingTop: 20,
        marginLeft: 25,
    },
    mainText: {
        fontSize: 21,
        fontFamily: "poppins",
        fontWeight: "700",
    },
    subText: {
        fontSize: 14,
        fontFamily: "roboto",
        color: "#ccc",
    },
    dateContainer: {
        position: "relative",
        left: 55,
        top: 20,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightblue",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 150,
    },
    dateText: {
        fontSize: 13,
    },
});

export default Diary;
