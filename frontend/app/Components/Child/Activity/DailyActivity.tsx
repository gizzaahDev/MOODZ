import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

interface daProps {
    pressDay: number;
}

const DailyActivity: React.FC<daProps> = ({ pressDay }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [activities, setActivities] = useState<any[]>([]);

    // Fetch logged-in user's UID
    useEffect(() => {
        const fetchUser = () => {
            const user = auth().currentUser;
            if (user) {
                setUserId(user.uid);
            }
        };
        fetchUser();
    }, []);
    const router = useRouter();

    // Fetch activities from Firestore
    useEffect(() => {
        if (!userId) return;

        const result = async () => {
            try {
                // Query the latest document
                const querySnapshot = await firestore()
                    .collection("UserChilds")
                    .doc(userId)
                    .collection("ChildActivity")
                    .orderBy("timestamp", "desc")
                    .limit(1)
                    .get();

                if (!querySnapshot.empty) {
                    const latestDoc = querySnapshot.docs[0];
                    const activitiesData = latestDoc.data().activity;
                    setActivities(activitiesData);
                    console.log("Latest activities:", activitiesData);
                } else {
                    console.log("No activities found");
                }
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        result();
    }, [userId]);

    // filter activity by day
    const filterTasks = activities.filter((item) => item.day === pressDay);

    return (
        <View style={{ flex: 1 }}>
            {filterTasks.map((item) => {
                return (
                    <Activity
                        key={item.id}
                        id={item.id}
                        day={item.day}
                        title={item.title}
                        subtitle={item.subtitle}
                        onPress={() =>
                            router.push({
                                pathname: item.pathname as any,
                                params: item.params,
                            })
                        }
                        circleColor={item.circleColor}
                    />
                );
            })}
        </View>
    );
};

export default DailyActivity;
