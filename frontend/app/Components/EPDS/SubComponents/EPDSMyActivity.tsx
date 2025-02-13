import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ScrollView, Animated, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';

export default function EPDSMyActivity() {
    const [groupedActivities, setGroupedActivities] = useState<{ [key: string]: { id: string; title: string; description: string; }[] }>({});
    const currentDate = new Date().toISOString().split('T')[0];
    const [showButton, setShowButton] = useState(true); // State for button visibility
    const scrollY = useRef(new Animated.Value(0)).current; // Track scroll position
    const prevScrollY = useRef(0);
    const [selectedMood, setSelectedMood] = useState<{ emoji: string; label: string } | null>(null);
    const [moodSaved, setMoodSaved] = useState(false);
    const [todayMoodSaved, setTodayMoodSaved] = useState(false);

    // Function to fetch the activities from Firestore
    const fetchActivities = async () => {
        const user = auth().currentUser;
        if (user) {
            const userId = user.uid;
            try {
                // Fetch activities from Firestore
                const activitiesSnapshot = await firestore()
                    .collection('DepressionActivities')
                    .doc(userId)
                    .get();

                if (activitiesSnapshot.exists) {
                    const activitiesData = activitiesSnapshot.data();

                    if (activitiesData) {
                        // Group activities by category
                        const grouped: { [key: string]: { id: string; title: string; description: string; }[] } = {};

                        Object.keys(activitiesData).forEach(activityId => {
                            const activity = activitiesData[activityId];
                            const { category, title, description } = activity;

                            // If category doesn't exist in grouped, create it
                            if (!grouped[category]) {
                                grouped[category] = [];
                            }

                            // Push activity to the correct category group
                            grouped[category].push({
                                id: activityId,
                                title,
                                description,
                            });
                        });

                        setGroupedActivities(grouped);
                    }
                }
            } catch (error) {
                console.error('Error fetching activities: ', error);
            }
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const renderActivity = ({ item }: { item: { id: string; title: string; description: string; } }) => (
        <TouchableOpacity onPress={() => handleNavigate(item.id)}>
            <View style={styles.activityCard}>
                <View style={styles.activityDetails}>
                    <Text style={styles.activityTitle}>{item.title}</Text>
                    <Text style={styles.activityDescription}>{item.description}</Text>
                </View>
                <View style={styles.activityPoints}>
                    <FontAwesome name="heart" size={16} color="#ff1493" />
                    <Text style={styles.pointsText}>+10 </Text>
                    <Entypo name="chevron-thin-right" size={18} color="#008080" />
                </View>
            </View>
        </TouchableOpacity>
    );

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    useEffect(() => {
        const listenerId = scrollY.addListener(({ value }) => {
            // Check scroll direction
            if (value > prevScrollY.current && value > 50) {
                // Scrolling down (hide button)
                if (showButton) {
                    setShowButton(false);
                }
            } else if (value < prevScrollY.current) {
                // Scrolling up (show button)
                if (!showButton) {
                    setShowButton(true);
                }
            }

            // Update the previous scroll position
            prevScrollY.current = value;
        });

        // Cleanup listener
        return () => {
            scrollY.removeListener(listenerId);
        };
    }, [scrollY, showButton]);



    const router = useRouter();

    const handleNavigate = (id: string) => {
        // Map activity id to the correct page
        switch (id) {
            case '1':
                router.replace('/Components/EPDS/SubComponents/ActivityPages/Id01');
                break;
            case '2':
                router.replace('/Components/EPDS/SubComponents/ActivityPages/Id02');
                break;
            // Add more cases for other activity pages
            default:
                console.log('Activity not found');
                break;
        }
    };

    useEffect(() => {
        checkMoodSavedToday();
    }, []);

    const checkMoodSavedToday = async () => {
        try {
            const storedDate = await AsyncStorage.getItem('moodSavedDate');
            const today = new Date().toISOString().split('T')[0];

            if (storedDate === today) {
                setMoodSaved(true); // Hide mood section if already saved today
            } else {
                setMoodSaved(false);
            }
        } catch (error) {
            console.error("Error checking saved mood: ", error);
        }
    };

    const handleMoodSelection = (mood: { emoji: string; label: string }) => {
        setSelectedMood(mood);
        // Show confirmation dialog
        Alert.alert(
            "Are you sure?",
            "Do you want to save your mood?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Mood not saved"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        saveMood(mood);
                    }
                }
            ]
        );
    };

    const saveMood = async (mood: { emoji: string; label: string }) => {
        try {
            const user = auth().currentUser;
            if (!user) {
                console.log("User not logged in");
                return;
            }

            const uid = user.uid;
            const today = new Date().toISOString().split('T')[0];

            await firestore()
                .collection('MoodToday')
                .doc(uid)
                .set({
                    mood: mood.label,
                    emoji: mood.emoji,
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    date: today,
                });

            await AsyncStorage.setItem('moodSavedDate', today);
            setMoodSaved(true); // Hide mood section after saving

            console.log("Mood saved successfully!");
            ToastAndroid.show("Your mood has been saved for today.", ToastAndroid.SHORT);
        } catch (error) {
            console.error("Error saving mood: ", error);
        }
    };


    return (
        <View style={styles.container}>
            {/* Date and Progress Bar */}
            <View style={styles.progressSection}>
                <View style={styles.dateBox}>
                    <Text style={styles.dateText}>{currentDate}</Text>
                </View>
                <View style={styles.progressContainer}>
                    <FontAwesome name="leaf" size={18} color="#008080" />
                    <Text style={styles.progressText}> 18 </Text>
                </View>
            </View>

             {/* Mood Selection */}
             {!moodSaved && (
                <View style={styles.moodSection}>
                    <Text style={styles.moodTitle}>My Mood Today</Text>
                    <View style={styles.moodIcons}>
                        {[
                            { emoji: "😢", label: "Terrible" },
                            { emoji: "😞", label: "Bad" },
                            { emoji: "😐", label: "Okay" },
                            { emoji: "😊", label: "Good" },
                            { emoji: "😃", label: "Excellent" }
                        ].map((mood, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.moodButton}
                                onPress={() => handleMoodSelection(mood)}
                            >
                                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                                <Text style={styles.moodText}>{mood.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
            {/* {moodSaved && (
        <Text style={styles.savedMessage}>Your mood has been saved for today.</Text>
      )} */}
            <FlatList
                data={[]}
                ListHeaderComponent={
                    <>
                        {/* My Tracking Habits */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>My Tracking Habits</Text>
                            <TouchableOpacity>
                                <Text style={styles.addNew}>ADD NEW ➜</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Display Activity List */}
                        {Object.keys(groupedActivities).map(category => (
                            <View key={category} style={styles.categorySection}>
                                <Text style={styles.categoryTitle}>{category}</Text>

                                <FlatList
                                    data={groupedActivities[category]}
                                    renderItem={renderActivity}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        ))}

                        {/* Done for Today */}
                        <Text style={styles.sectionTitle}>Done For Today</Text>
                        <View style={styles.completedCard}>
                            <View style={styles.activityDetails}>
                                <Text style={styles.activityTitle}>Tit</Text>
                                <Text style={styles.activityDescription}>desc</Text>
                            </View>
                            <FontAwesome name="check-circle" size={20} color="green" />
                        </View>
                    </>
                }
                contentContainerStyle={styles.containerA}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                renderItem={null}
                keyExtractor={() => 'dummy'}
            />
            {/* Home Navigation Button */}
            {showButton && (
                <TouchableOpacity style={styles.homeButton} onPress={() => router.push("/(tabs)")} >
                    <FontAwesome5 name="home" size={20} color="#fff" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    containerA: {
        flexGrow: 1,

        backgroundColor: '#f5f5f5',
    },
    progressSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    dateBox: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    moodSection: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    moodTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    moodIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    moodButton: {
        alignItems: 'center',
    },
    moodEmoji: {
        fontSize: 24,
    },
    moodText: {
        fontSize: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addNew: {
        fontSize: 14,
        color: '#007AFF',
    },
    activityCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    activityDetails: {
        flex: 1,

    },
    activityTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    activityDescription: {
        fontSize: 12,
        color: '#666',
    },
    activityCategory: {
        fontSize: 12,
        color: '#777',
    },
    activityPoints: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 2,
    },
    pointsText: {
        fontSize: 14,
        marginLeft: 5,
        color: '#ff1493',
    },
    categorySection: {
        marginBottom: 20,

    },
    completedCard: {
        backgroundColor: '#dff0d8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#008080'
    },
    homeButton: {
        backgroundColor: '#008080',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
});
