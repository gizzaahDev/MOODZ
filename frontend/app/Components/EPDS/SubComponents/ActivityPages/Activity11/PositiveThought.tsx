import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';

const DailyJournal = () => {
    const [response, setResponse] = useState('');
    const [todayEntries, setTodayEntries] = useState([]); // State to store today's entries
    const prompts = [
        "What is one thing I love about myself today?",
        "What progress have I made recently, no matter how small?",
        "Who or what brought me joy today?",
        "What is something I’m looking forward to?",
        "How have I made a positive impact on someone today?",
        "What is a small win I can celebrate today?",
        "What strengths did I use to navigate today’s challenges?",
        "What is something kind I told myself today?",
        "How did I show love or kindness to someone today?",
        "What is one beautiful thing I noticed today?",
        "What made me smile today?"
    ];
    const [randomPrompt, setRandomPrompt] = useState('');

    useEffect(() => {
        // Get a random prompt
        setRandomPrompt(prompts[Math.floor(Math.random() * prompts.length)]);

        // Fetch today's entries
        fetchTodayEntries();
    }, []);

    const fetchTodayEntries = async () => {
        const userId = auth().currentUser?.uid;
        if (!userId) return;

        const today = new Date().toISOString().split('T')[0]; 
        const formattedDate = today; 

        try {
            const userRef = firestore()
                .collection('UsersEpds')
                .doc(userId)
                .collection('CompletedActivities')
                .doc(formattedDate); 

            const userDoc = await userRef.get();

            if (userDoc.exists) {
                const data = userDoc.data();
                const dailyJournal = data?.dailyJournal || {};
                const todayJournal = dailyJournal[formattedDate] || { entries: [] };

                
                setTodayEntries(todayJournal.entries || []);
            } else {
                
                setTodayEntries([]);
            }
        } catch (error) {
            console.error('Error fetching today\'s entries:', error);
            Alert.alert("Error fetching entries. Try again.");
        }
    };

    const handleSubmit = async () => {
        if (!response.trim()) {
            Alert.alert("Please write something before submitting.");
            return;
        }

        try {
            const userId = auth().currentUser?.uid;
            if (!userId) return;

            const today = new Date().toISOString().split('T')[0];
            const userRef = firestore()
                .collection('UsersEpds')
                .doc(userId)
                .collection('CompletedActivities')
                .doc(today);

            const userDoc = await userRef.get();
            const data = userDoc.data() || { dailyJournal: {}, hearts: 0, leaves: 0, activityType: {} };

            let updatedHearts = (data.hearts || 0) + 10;
            let updatedLeaves = data.leaves || 0;
            if (updatedHearts >= 100) {
                updatedHearts = 0;
                updatedLeaves += 1;
            }

            const todayJournal = data.dailyJournal?.[today] || {};

            const newEntry = {
                text: response,
                prompt: randomPrompt,
                timestamp: new Date(), // Use current timestamp
            };

            await userRef.set(
                {
                    hearts: updatedHearts,
                    leaves: updatedLeaves,
                    activityType: {
                        ...data.activityType,
                        category: 'Creative and Cognitive Activities',
                        title: 'Daily Journaling',
                        description: 'Writing prompts like “What made me smile today?”',
                    },
                    dailyJournal: {
                        ...data.dailyJournal,
                        [today]: {
                            totalDays: (todayJournal.totalDays || 0) + 1,
                            streakDays: todayJournal.streakDays || 0,
                            entries: [...(todayJournal.entries || []), newEntry],
                        },
                    },
                },
                { merge: true }
            );

            // Refresh today's entries after submission
            fetchTodayEntries();
            setResponse('sdsd');
            // Alert.alert("Response saved!");
            ToastAndroid.show(`Response saved!`, ToastAndroid.LONG);
            router.push('/Components/EPDS/SubComponents/EPDSMyActivity');

        } catch (error) {
            console.error('Error saving journal entry:', error);
            Alert.alert("Error saving response. Try again.");
        }
    };



    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Today's Entries:</Text>
            <FlatList
                data={todayEntries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.entry}>
                        <Text style={styles.entryPrompt}>{item.prompt}</Text>
                        <Text style={styles.entryText}>{item.text}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.noEntriesText}>No entries for today.</Text>
                }
            />
            <View style={styles.hr} />
            <Text style={styles.prompt}>{randomPrompt}</Text>
            <TextInput
                style={styles.input}
                placeholder="Write your response..."
                value={response}
                onChangeText={setResponse}
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 2, padding: 20, backgroundColor: '#fff' },
    prompt: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        minHeight: 180,
        textAlignVertical: 'top', // Ensures text starts from the top-left
    },
    button: {
        backgroundColor: '#016A70',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 5, marginBottom: 10, alignItems: 'center'
    },
    buttonText: { color: 'white', fontWeight: 'bold' },
    heading: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
    entry: { backgroundColor: '#f9f9f9', padding: 10, marginBottom: 10, borderRadius: 8 },
    entryPrompt: { fontSize: 14, fontWeight: 'bold', color: '#555' },
    entryText: { fontSize: 14, color: '#333' },
    noEntriesText: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 20 },
    hr: {
        borderBottomColor: '#ccc',  
        borderBottomWidth: 1,       
        marginVertical: 10,         
    },
});

export default DailyJournal;