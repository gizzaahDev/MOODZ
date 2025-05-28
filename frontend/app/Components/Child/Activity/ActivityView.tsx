import { View, Text, StyleSheet, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import DailyActivity from "./DailyActivity";
import DateBoxes from "./DateBoxes";
import FontLoader from "../../../../FontLoader";
import { useTheme } from "../../../ThemeContext";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ActivityView = () => {
    const { theme } = useTheme();
    const [userId, setUserId] = useState<string | null>(null);
    const [depression, setDepression] = useState("");
    const [pressDay, setPressDay] = useState(1);

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

    // retrieving the depression level from firestore
    useEffect(() => {
        const fetchData = async () => {
            const result = await firestore()
                .collection("UserChilds")
                .doc(userId as any)
                .collection("QuestionnaireChilds")
                .orderBy("timestamp", "desc")
                .limit(1)
                .get();

            if (!result.empty) {
                const depLevel = result.docs[0].get("depLevel") as string;
                setDepression(depLevel);
            } else {
                console.log("No questionnaire found");
            }
        };

        fetchData();
    }, [userId]);

    return (
        <FontLoader>
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                <Text style={styles.title}>
                    🌿 day {pressDay} of wellness journey !
                </Text>
                <Image
                    source={require("../../../../assets/images/DateBg.png")}
                    style={{
                        width: "85%",
                        height: 230,
                        marginBottom: 25,
                        alignSelf: "center",
                    }}
                />

                <View style={[styles.wrapper]}>
                    <View style={styles.dayWrapper}>
                        <DateBoxes
                            pressDay={pressDay}
                            setPressDay={setPressDay}
                            depression={depression}
                        />
                    </View>
                    <View style={styles.actWrapper}>
                        {pressDay && <DailyActivity pressDay={pressDay}/>}
                    </View>
                </View>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 20 },
    title: {
        paddingHorizontal: 30,
        marginBottom: 5,
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "roboto",
        color: "#272727",
        textAlign: "center",
        textTransform: "capitalize",
    },
    wrapper: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 20,
    },
    dayWrapper: { flex: 0.2 },
    actWrapper: { flex: 0.8 },
});

export default ActivityView;
