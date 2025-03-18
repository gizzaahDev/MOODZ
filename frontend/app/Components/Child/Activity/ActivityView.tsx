import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import React, { useState } from "react";
import DailyActivity from "./DailyActivity";
import DateBoxes from "./DateBoxes";
import FontLoader from "../../../../FontLoader";
import { useTheme } from "../../../ThemeContext";

const ActivityView = () => {
    const { theme } = useTheme();
    const [pressDay, setPressDay] = useState(1);


    return (
        <FontLoader>
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                <Text style={styles.title}>🌿 day {pressDay} of wellness journey !</Text>
                <Image
                    source={require("../../../../assets/images/DateBg.png")}
                    style={{ width: "100%", height: 230, marginBottom: 25 }}
                />

                <View style={[styles.wrapper]}>
                    <View style={styles.dayWrapper}>
                        <DateBoxes pressDay={pressDay} setPressDay={setPressDay} />
                    </View>
                    <View style={styles.actWrapper}>
                        {pressDay && (
                            <DailyActivity pressDay={pressDay} />
                        )}
                    </View>
                </View>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 20 },
    title: {
        fontSize: 28,
        paddingHorizontal: 20,
        fontFamily: "roboto",
        marginBottom: 5,
        fontWeight: "bold",
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
