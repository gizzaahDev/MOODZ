import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// Set Notification Handler for System Notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const OngoingTask = () => {
    const [pendingActivities, setPendingActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        registerForPushNotificationsAsync(); // Request permission for system notifications
    }, []);

    useEffect(() => {
        const fetchOngoingTasks = async () => {
            const userId = auth().currentUser?.uid;
            if (!userId) return;

            const today = new Date().toISOString().split('T')[0];
            setLoading(true);

            try {
                // Fetch all available activities
                const activitiesSnapshot = await firestore()
                    .collection('EPDSDepressionActivities')
                    .doc(userId)
                    .get();

                const allActivities = activitiesSnapshot.exists ? Object.values(activitiesSnapshot.data()) : [];

                // Fetch completed activities for today
                const completedSnapshot = await firestore()
                    .collection('UsersEpds')
                    .doc(userId)
                    .collection('CompletedActivities')
                    .doc(today)
                    .get();

                const completedActivities = completedSnapshot.exists ? completedSnapshot.data().completedActivities || [] : [];

                // Extract titles of completed activities
                const completedTitles = completedActivities.map(activity => activity.title);

                // Filter out completed activities from all activities
                const pendingTasks = allActivities.filter(activity => 
                    !completedTitles.includes(activity.title)
                );

                setPendingActivities(pendingTasks);
            } catch (error) {
                console.error("Error fetching ongoing tasks:", error);
            }

            setLoading(false);
        };

        fetchOngoingTasks();
    }, []);

    // Send Periodic Notifications Every 5 Minutes
    useEffect(() => {
        if (pendingActivities.length > 0) {
            const notificationInterval = setInterval(() => {
                const firstTask = pendingActivities[0];
                sendNotification(
                    `Hi Moodie!`,
                    `You have to do "${firstTask.title}" to get more hearts 🥰`
                );
            }, 1 * 60 * 1000); // 5 minutes in milliseconds

            return () => clearInterval(notificationInterval);
        }
    }, [pendingActivities]);

    const handleActivityPress = (activity) => {
        console.log("Activity clicked:", activity.title);
    };

    // Send System Notification
    const sendNotification = async (title, body) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: true,
            },
            trigger: null,
        });

        Alert.alert(title, body);
    };

    const renderItem = ({ item, index }) => {
        const inputRange = [-1, 0, (120 * index), (120 * (index + 2))];

        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.3],
        });

        const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [0, 0, 0, -30],
        });

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.95],
        });

        return (
            <Animated.View style={[styles.animatedContainer, { opacity, transform: [{ translateY }, { scale }] }]}>
                <TouchableOpacity
                    style={styles.activityCard}
                    onPress={() => handleActivityPress(item)}
                >
                    <View style={styles.activityContent}>
                        <Text style={styles.activityTitle}>{item.title}</Text>
                        <Text style={styles.activityDescription}>{item.description}</Text>
                        <Text style={styles.activityCategory}>Category: {item.category}</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#4CAF50" />
                </TouchableOpacity>
            </Animated.View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Loading Ongoing Tasks...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ongoing Activities</Text>

            {pendingActivities.length === 0 ? (
                <Text style={styles.emptyText}>All activities completed for today!</Text>
            ) : (
                <AnimatedFlatList
                    data={pendingActivities}
                    keyExtractor={(item) => item.title}
                    renderItem={renderItem}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                />
            )}
        </View>
    );
};

// Function to Request System Notification Permission
async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Permission Denied', 'Enable notifications to receive alerts.');
            return;
        }

        // Get Expo Push Token (not required for local notifications)
        try {
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log('Expo Push Token:', token);
        } catch (error) {
            console.error('Error getting Expo Push Token:', error);
        }
    } else {
        Alert.alert('Use a physical device', 'Push notifications do not work in simulators.');
    }

    return token;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 16,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fafafa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2196F3',
        marginBottom: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginTop: 20,
    },
    animatedContainer: {
        marginBottom: 12,
    },
    activityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    activityDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    activityCategory: {
        fontSize: 12,
        color: '#2196F3',
        marginTop: 4,
    },
});

export default OngoingTask;