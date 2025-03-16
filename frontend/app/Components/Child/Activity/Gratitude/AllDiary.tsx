import { View, Text, Alert, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Diary from "./Diary";
import { useTheme } from "../../../../ThemeContext";
import FontLoader from "../../../../../FontLoader";

type JournalType = {
    id: string;
    day: string;
    text: string;
};

const AllDiary = () => {
    const { theme } = useTheme();
    const [userId, setUserId] = useState<string | null>(null);
    const [journal, setJournal] = useState([]);

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

    // retrieving the all journals from firestore
    useEffect(() => {
        const fetchData = async () => {
            const result = await firestore()
                .collection("ChildGratitude")
                .doc(userId as any)
                .collection("Gratitude")
                .get();

            const entries: any = [];
            result.forEach((doc) => {
                entries.push({ id: doc.id, ...doc.data() });
            });

            setJournal(entries);
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
                <Text style={[styles.title, { color: theme.textTernary }]}>
                    your journals
                </Text>
                <View>
                    <FlatList
                        data={journal}
                        keyExtractor={(item: JournalType) => item.id}
                        renderItem={({ item, index }) => (
                            <Diary
                                key={item.id}
                                id={item.id}
                                day={item.day}
                                text={item.text}
                                index={index}
                            />
                        )}
                        contentContainerStyle={styles.flatlist}
                    />
                </View>
            </View>
        </FontLoader>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingVertical: 20,
    },
    title: {
        fontSize: 30,
        fontFamily: "asul",
        textAlign: "center",
        textTransform: "capitalize",
        marginBottom: 50
    },
    flatlist: {
        gap: 20
    }
});

export default AllDiary;
