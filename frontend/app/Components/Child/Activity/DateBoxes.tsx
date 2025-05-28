import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

interface DateBoxesProps {
    pressDay: number;
    setPressDay: (day: number) => void;
    depression: string;
}

const DateBoxes: React.FC<DateBoxesProps> = ({
    pressDay,
    setPressDay,
    depression = "moderate",
}) => {
    // Function to generate dates for the next 10 days
    const generateDates = () => {
        const dates = [];
        const today = new Date();
        const totalDays = depression === "low" ? 5 : 10;

        for (let i = 0; i < totalDays; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i); // Add 'i' days to the current date
            dates.push({ date, day: i + 1 }); // Store date and day number
        }
        return dates;
    };

    // Function to handle date box press
    const handleDatePress = (day: number) => {
        setPressDay(day); // Update pressDay state
        console.log(`Day pressed: ${day}`);
    };

    // Render date boxes
    const renderDateBoxes = () => {
        const dates = generateDates();
        return dates.map(({ date, day }, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.dateBox,
                    pressDay === day ? styles.selectedDateBox : null,
                ]}
                onPress={() => handleDatePress(day)}
            >
                {pressDay === day && <View style={styles.circle} />}
                <Text style={styles.dayText}>{date.getDate()}</Text>
                <Text style={styles.dateText}>
                    {date.toLocaleDateString("en-US", { month: "short" })}
                </Text>
            </TouchableOpacity>
        ));
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            {renderDateBoxes()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: "column",
    },
    dateBox: {
        width: "100%",
        height: 80,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3FAF4",
        borderRadius: 10,
        marginVertical: 5,
    },
    selectedDateBox: {
        backgroundColor: "#FFF",
    },
    dateText: {
        fontSize: 12,
        color: "#333",
        textAlign: "center",
    },
    dayText: {
        fontSize: 21,
        fontWeight: "bold",
        color: "#555",
        textAlign: "center",
    },
    circle: {
        position: "relative",
        bottom: 3,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "red",
    },
});

export default DateBoxes;
