import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the checkmark icon

const Progress = () => {
    const [completedActivities, setCompletedActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompletedActivities = async () => {
            const userId = auth().currentUser?.uid;
            if (!userId) return;

            try {
                const today = new Date().toISOString().split('T')[0];
                const userRef = firestore()
                    .collection('UsersEpds')
                    .doc(userId)
                    .collection('CompletedActivities')
                    .doc(today);

                const userDoc = await userRef.get();
                const data = userDoc.data() || { completedActivities: [], meditationHistory: {} };

                // Get the completed activities array
                const activities = data.completedActivities || [];
                const meditationHistory = data.meditationHistory || {};

                // Add playCount to each activity
                const activitiesWithPlayCount = activities.map(activity => {
                    const activityHistory = meditationHistory[activity.date] || {};
                    return {
                        ...activity,
                        playCount: activityHistory.playCount || 0, // Add playCount
                    };
                });

                setCompletedActivities(activitiesWithPlayCount);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching completed activities:", error);
                setLoading(false);
            }
        };

        fetchCompletedActivities();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Loading Progress...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Completed Activities</Text>

            {completedActivities.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No activities completed yet.</Text>
                </View>
            ) : (
                <FlatList
                    data={completedActivities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.activityCard}>
                            <View style={styles.activityContent}>
                                <Text style={styles.activityTitle}>{item.title}</Text>
                                <Text style={styles.activityDescription}>{item.description}</Text>
                                <Text style={styles.activityCategory}>Category: {item.category}</Text>
                                <Text style={styles.playCount}>Play Count: {item.playCount}</Text> {/* Show play count */}
                            </View>
                            <Icon name="check-circle" size={24} color="#4CAF50" /> {/* Green checkmark */}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

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
        color: '#2E7D32',
        marginBottom: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
    },
    activityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
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
    playCount: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
});

export default Progress;