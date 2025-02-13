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

    { id: '6', category: 'Physical Wellness', title: 'Gentle Yoga (Postpartum-Safe Poses)', description: 'Cat-cow stretch, child’s pose, and light stretches.' },
    { id: '7', category: 'Physical Wellness', title: 'Walking Challenge', description: 'A daily 15–20 minute walk outdoors.' },
    { id: '8', category: 'Physical Wellness', title: 'Pelvic Floor Exercises (Kegels)', description: 'Strengthening postpartum pelvic muscles.' },
    { id: '9', category: 'Physical Wellness', title: 'Stretching Routine', description: 'Neck, shoulder, and back stretches for tension relief.' },
    { id: '10', category: 'Physical Wellness', title: 'Simple Postpartum Exercises', description: 'Light bodyweight exercises like squats or side-lying leg lifts.' },

    { id: '11', category: 'Creative and Cognitive Activities', title: 'Daily Journaling', description: 'Writing prompts like “What made me smile today?”' },
    { id: '12', category: 'Creative and Cognitive Activities', title: 'Gratitude List', description: 'Write 3 things you are grateful for each day.' },
    { id: '13', category: 'Creative and Cognitive Activities', title: 'Creative Art', description: 'Simple coloring or sketching tasks.' },
    { id: '14', category: 'Creative and Cognitive Activities', title: 'Music Therapy', description: 'Listen to a calming playlist (e.g., nature sounds, classical).' },
    { id: '15', category: 'Creative and Cognitive Activities', title: 'Mindful Reading', description: 'Read short uplifting stories or quotes.' },

    { id: '16', category: 'Social Interaction', title: 'Support Group Participation', description: 'Join a virtual postpartum community.' },
    { id: '17', category: 'Social Interaction', title: 'Daily Check-In with a Loved One', description: 'A phone call or video chat.' },
    { id: '18', category: 'Social Interaction', title: 'Thank You Notes', description: 'Write a note of appreciation to someone.' },
    { id: '19', category: 'Social Interaction', title: 'Share a Success Story', description: 'Post an achievement in the app community or group.' },
    { id: '20', category: 'Social Interaction', title: 'Virtual Counseling Session', description: 'Optional therapy with a professional.' },

    { id: '21', category: 'Self-Care and Wellness', title: 'Skincare Routine', description: 'Spend 5–10 minutes pampering yourself.' },
    { id: '22', category: 'Self-Care and Wellness', title: 'Aromatherapy Bath', description: 'Add calming essential oils like lavender to a bath.' },
    { id: '23', category: 'Self-Care and Wellness', title: 'Tea Time Ritual', description: 'Enjoy a warm herbal tea mindfully.' },
    { id: '24', category: 'Self-Care and Wellness', title: 'Home Spa', description: 'Facial massage or foot soak at home.' },
    { id: '25', category: 'Self-Care and Wellness', title: 'Mindful Eating', description: 'Spend time savoring one meal without distractions.' },

    { id: '26', category: 'Mindful Parenting', title: 'Baby Bonding Time', description: 'Mindfully connect with the baby during feeding or playtime.' },
    { id: '27', category: 'Mindful Parenting', title: 'Sing to Your Baby', description: 'Sing a lullaby or favorite tune.' },
    { id: '28', category: 'Mindful Parenting', title: 'Photo Session', description: 'Capture a few moments with your baby and reflect on them.' },
    { id: '29', category: 'Mindful Parenting', title: 'Organize Baby Keepsakes', description: 'Create a memory box for special items.' },
    { id: '30', category: 'Mindful Parenting', title: 'Positive Affirmations', description: 'Repeat affirmations like, “I am a great mom,” daily.' },

    { id: '31', category: 'Engagement and Fun', title: 'Watch a Funny Video', description: 'Spend 5 minutes watching something humorous.' },
    { id: '32', category: 'Engagement and Fun', title: 'Puzzle or Brain Game', description: 'Complete a small puzzle or word game.' },
    { id: '33', category: 'Engagement and Fun', title: 'Gardening', description: 'Take care of plants or start a small herb garden.' },
    { id: '34', category: 'Engagement and Fun', title: 'Cooking or Baking', description: 'Try a simple recipe.' },
    { id: '35', category: 'Engagement and Fun', title: 'DIY Project', description: 'Craft or assemble something creative.' },
];

export default function ChooseActivities() {
    const { theme } = useTheme() as { theme: any };
    const user = auth().currentUser;
    const router = useRouter();
    const [selectedActivities, setSelectedActivities] = useState<{ [key: string]: string[] }>({});


    useEffect(() => {
        loadSelectedActivities();
    }, []);

    // Load previously selected activities from AsyncStorage
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

    // Toggle selection of activities
    const toggleActivity = async (category: string, activityId: string) => {
        const categorySelections = selectedActivities[category] || [];
        let updatedSelections = { ...selectedActivities };
    
        // Check if the activity is already selected
        if (categorySelections.includes(activityId)) {
            // Remove the activity from the selection
            updatedSelections[category] = categorySelections.filter(id => id !== activityId);
        } else {
            // Add the activity ID to the selection
            updatedSelections[category] = [...categorySelections, activityId];
        }
    
        setSelectedActivities(updatedSelections);
        await AsyncStorage.setItem('SelectedActivity', JSON.stringify(updatedSelections));
    
        if (user) {
            // Create an object to hold only the selected activities with their details
            const selectedActivitiesWithDetails: { [key: string]: string[] } = {};
    
            // Iterate over the selected activity IDs to get their details
            Object.keys(updatedSelections).forEach(category => {
                selectedActivitiesWithDetails[category] = updatedSelections[category].map(activityId => {
                    const activity = activities.find(act => act.id === activityId);
                    return activity ? activity.id : null;
                }).filter(activityId => activityId !== null) as string[];
            });
    
            // Create an object to hold activity details under each activityId
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
    
            // Save all selected activities (with details) to Firestore
            await firestore()
                .collection('DepressionActivities')
                .doc(user.uid)
                .set(activitiesDetails);
        }
    };
    
    



    // Get started function to check if all categories have 3 selected activities
    const handleGetStarted = () => {
        const categories = [...new Set(activities.map(a => a.category))];
        for (const category of categories) {
            if (!selectedActivities[category] || selectedActivities[category].length !== 3) {
                ToastAndroid.show(`Please select 3 activities in ${category}`, ToastAndroid.LONG);
                return;
            }
        }
        ToastAndroid.show('All categories are selected correctly!', ToastAndroid.SHORT);
        router.replace('/Components/EPDS/SubComponents/EPDSMyActivity');
        console.log("choosed activities added to database")
    };

    

    return (
        <View style={[styles.viewMain, { backgroundColor: theme.background }]}>
            {/* Header */}
            <Text style={styles.headerTitle}>Choose Your Activities</Text>
            <Text style={styles.subTitle}>Select 3 activities per category.</Text>

            {/* Activities List */}
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

            {/* Get Started Button */}
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