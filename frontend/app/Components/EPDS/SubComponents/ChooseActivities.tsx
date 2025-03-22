import { StyleSheet, Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const activities = [
    { id: '1', category: 'Meditation and Relaxation', title: 'Guided Mindfulness Meditation (5–15 minutes)', description: 'Focus on deep breathing and staying present.' },
    { id: '2', category: 'Meditation and Relaxation', title: 'Breathing Exercises', description: 'Techniques like box breathing or 4-7-8 breathing.' },
    { id: '3', category: 'Meditation and Relaxation', title: 'Progressive Muscle Relaxation', description: 'Systematic tensing and relaxing of muscle groups.' },
    { id: '4', category: 'Meditation and Relaxation', title: 'Gratitude Meditation', description: 'Reflect on positive aspects of the day.' },
    { id: '5', category: 'Meditation and Relaxation', title: 'Sleep Relaxation Audio', description: 'A guided session to improve sleep quality.' },

    { id: '6', category: 'Physical Wellness', title: 'Creative Art', description: 'Simple coloring or sketching tasks.' },
    { id: '7', category: 'Physical Wellness', title: 'Walking Challenge', description: 'A daily 15–20 minute walk outdoors.' },
    { id: '8', category: 'Physical Wellness', title: 'Pelvic Floor Exercises (Kegels)', description: 'Strengthening postpartum pelvic muscles.' },

    { id: '11', category: 'Creative and Cognitive Activities', title: 'Daily Journaling', description: 'Writing prompts like “What made me smile today?”' },
    { id: '12', category: 'Creative and Cognitive Activities', title: 'Capture Your Emotions', description: 'Take a moment to recognize and write down your emotions.' },
    { id: '13', category: 'Creative and Cognitive Activities', title: 'Play Funny Video', description: 'Watch a short funny video to lighten your mood and relax.' },

    { id: '16', category: 'Social Interaction', title: 'Support Group Participation', description: 'Join a virtual postpartum community.' },
];

export default function ChooseActivities() {
    const { theme } = useTheme() as { theme: any };
    const user = auth().currentUser;
    const router = useRouter();
    const [selectedActivities, setSelectedActivities] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        loadSelectedActivities();
    }, []);

    const loadSelectedActivities = async () => {
        try {
            const storedSelections = await AsyncStorage.getItem('SelectedActivity');
            if (storedSelections) {
                setSelectedActivities(JSON.parse(storedSelections));
            }
        } catch (error) {
            console.error('Error loading selected activities:', error);
        }
    };

    const toggleActivity = async (category: string, activityId: string) => {
        const categorySelections = selectedActivities[category] || [];
        let updatedSelections = { ...selectedActivities };
    
        if (categorySelections.includes(activityId)) {
            updatedSelections[category] = categorySelections.filter(id => id !== activityId);
        } else {
            updatedSelections[category] = [...categorySelections, activityId];
        }
    
        setSelectedActivities(updatedSelections);
        await AsyncStorage.setItem('SelectedActivity', JSON.stringify(updatedSelections));
    
        if (user) {
            const activitiesDetails: { [activityId: string]: { category: string, title: string, description: string } } = {};
    
            Object.keys(updatedSelections).forEach(category => {
                updatedSelections[category].forEach(activityId => {
                    const activity = activities.find(act => act.id === activityId);
                    if (activity) {
                        activitiesDetails[activityId] = {
                            category: activity.category,
                            title: activity.title,
                            description: activity.description
                        };
                    }
                });
            });
    
            await firestore()
                .collection('EPDSDepressionActivities')
                .doc(user.uid)
                .set(activitiesDetails);
        }
    };

    const handleGetStarted = () => {
        const categories = [...new Set(activities.map(a => a.category))];
        for (const category of categories) {
            if (!selectedActivities[category] || selectedActivities[category].length < 1) {
                ToastAndroid.show(`Please select at least 1 activity in ${category}`, ToastAndroid.LONG);
                return;
            }
        }
        ToastAndroid.show('Activities selected successfully!', ToastAndroid.SHORT);
        router.replace('/Components/EPDS/SubComponents/EPDSMyActivity');
    };

    return (
        <View style={[styles.viewMain, { backgroundColor: theme.background }]}>
            <Text style={styles.headerTitle}>Choose Your Activities</Text>
            <Text style={styles.subTitle}>Select at least 1 activity per category. You can select multiple activities.</Text>

            <FlatList
                data={activities}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        {index === 0 || activities[index - 1].category !== item.category ? (
                            <Text style={styles.categoryTitle}>{item.category}</Text>
                        ) : null}
                        <TouchableOpacity onPress={() => toggleActivity(item.category, item.id)}>
                            <View style={styles.card}>
                                <View style={styles.cardText}>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text style={styles.cardDescription}>{item.description}</Text>
                                </View>
                                <FontAwesome
                                    name={selectedActivities[item.category]?.includes(item.id) ? "heart" : "heart-o"}
                                    size={20}
                                    color="#008080"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />

            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    viewMain: {
        flex: 1,
        padding: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#272727',
        textAlign: 'center',
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    listContainer: {
        paddingBottom: 80,
    },
    itemContainer: {
        marginBottom: 10,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#008080',
        marginBottom: 5,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginLeft: 2,
        marginRight: 2,
    },
    cardText: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDescription: {
        fontSize: 13,
        color: '#666',
    },
    button: {
        backgroundColor: '#008080',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});