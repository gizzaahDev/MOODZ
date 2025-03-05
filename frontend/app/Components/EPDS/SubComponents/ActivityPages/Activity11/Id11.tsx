import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../../../../../ThemeContext';

const MeditationHome = () => {
    const [totalDays, setTotalDays] = useState(0);
    const [currentDateEntryCount, setCurrentDateEntryCount] = useState(0); // Count of entries for the current date
    const [meditationDates, setMeditationDates] = useState<{ [key: string]: { selected: boolean; selectedColor: string } }>({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [journalEntries, setJournalEntries] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const userId = auth().currentUser?.uid;
    const { theme } = useTheme() as { theme: any };

    useEffect(() => {
        if (userId) {
            fetchProgress();
        }
    }, [userId]);

    const fetchProgress = async () => {
        try {
            const userId = auth().currentUser?.uid;
            if (!userId) return;

            const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
            const userRef = firestore().collection('UsersEpds').doc(userId).collection('CompletedActivities').doc(today);

            const userDoc = await userRef.get();

            if (userDoc.exists) {
                const data = userDoc.data();
                const dailyJournal = data?.dailyJournal || {};
                const todayData = dailyJournal[today] || { entries: [] };

                // Set the count of journal entries for the current date
                setCurrentDateEntryCount(todayData.entries?.length || 0);

                // Set total days (if needed)
                const dates = Object.keys(dailyJournal);
                setTotalDays(dates.length);

                // Mark dates with journal entries in the calendar
                const markedDates: { [key: string]: { selected: boolean; selectedColor: string } } = {};
                dates.forEach((date) => {
                    markedDates[date] = { selected: true, selectedColor: '#016A70' };
                });
                setMeditationDates(markedDates);
            }
        } catch (error) {
            console.error('Error fetching progress:', error);
        }
    };

    const handleDatePress = async (date) => {
        setSelectedDate(date);
        const userId = auth().currentUser?.uid;
        if (!userId) return;

        try {
            const formattedDate = new Date(date).toISOString().split('T')[0]; // Ensure correct date format
            const snapshot = await firestore()
                .collection('UsersEpds')
                .doc(userId)
                .collection('CompletedActivities')
                .doc(formattedDate) // Fetch the journal entry for the specific date
                .get();

            const data = snapshot.data();

            if (data && data.dailyJournal && data.dailyJournal[formattedDate]) {
                setJournalEntries(data.dailyJournal[formattedDate].entries || []);
            } else {
                setJournalEntries([]);
            }

            setModalVisible(true);
        } catch (error) {
            console.error("Error fetching journal entries:", error);
        }
    };


    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.subMiniContainer]}>
                <Text style={[styles.title, { color: theme.textPrimary }]}>Guided Mindfulness Meditation</Text>
                <Text style={[styles.guidelines, { color: theme.textSecondary }]}>
                    Focus on deep breathing and staying present. Follow the instructions during the meditation.
                </Text>
                <ScrollView>
                    <View style={styles.statsContainer}>
                        <View style={styles.containerSub}>
                            <Text style={[styles.progressText, { color: theme.textPrimary }]}>
                                Total Days: {totalDays}
                            </Text>
                            <Text style={[styles.progressText, { color: theme.textPrimary }]}>
                                Today's Journal Entries: {currentDateEntryCount}
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.progressSubTitle, { color: theme.textPrimary }]}>
                        Activity Completed Days
                    </Text>
                    <View style={styles.calendarContainer}>
                        <Calendar
                            markedDates={meditationDates}
                            onDayPress={(day) => handleDatePress(day.dateString)}
                            theme={{
                                calendarBackground: "#fff",
                                selectedDayBackgroundColor: '#016A70',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#016A70',
                                dayTextColor: theme.textPrimary,
                                textDisabledColor: "#ccc",
                            }}
                        />
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/Components/EPDS/SubComponents/ActivityPages/Activity11/PositiveThought')}>
                        <Text style={styles.buttonText}>Start Meditation</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={journalEntries}
                            keyExtractor={(item) => item.id}
                            ListEmptyComponent={<Text style={styles.noEntriesText}>No entries added today</Text>}
                            ListHeaderComponent={
                                <>
                                    <Text style={styles.modalTitle}>Journal Entries for {selectedDate}</Text>
                                </>
                            }
                            ListFooterComponent={
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Close</Text>
                                </TouchableOpacity>
                            }
                            renderItem={({ item }) => (
                                <View style={styles.entry}>
                                    <Text style={styles.entryPrompt}>{item.prompt}</Text>
                                    <Text style={styles.entryText}>{item.text}</Text>
                                    <View style={styles.hr} />
                                </View>
                            )}
                            contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom if necessary
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subMiniContainer: {
        margin: 20,
    },
    noEntriesText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777', // A light gray color for the no entries message
        marginTop: 5,
    },
    hr: {
        borderBottomColor: '#ccc',  // Color of the line
        borderBottomWidth: 1,       // Thickness of the line
        marginVertical: 5,         // Space above and below the line
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    guidelines: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    statsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    containerSub: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressText: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
        width: 200,
        letterSpacing: 0.5,
        lineHeight: 28,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        elevation: 4,
    },
    progressSubTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 10,
        borderRadius: 50,
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
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    calendarContainer: {
        width: '100%',
        marginBottom: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxHeight: '80%', // Limit modal height
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center"
    },
    scrollViewContainer: {
        paddingBottom: 20, // Optional padding to avoid content being cut off at the bottom
    },
    entry: {
        marginBottom: 10,
    },
    entryPrompt: {
        fontWeight: 'bold',
    },
    entryText: {
        marginTop: 5,
    },
    modalButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#016A70',
        borderRadius: 50,
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default MeditationHome;