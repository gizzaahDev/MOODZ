import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../ThemeContext';

const { width } = Dimensions.get('window');

const onboardingEPDSData = [
    {
        id: 1,
        imageSrc: require('../../../../assets/images/EPDSwel01.png'),
        title: 'Personalized Wellness Plans',
        description:
            'Every mom’s journey is unique. Receive activities tailored specifically to your postpartum needs.',
        motine:'“You’re stronger than you think.”'
    },
    {
        id: 2,
        imageSrc: require('../../../../assets/images/EPDSwel02.png'),
        title: 'Track Your Progress',
        description:
            'Watch your transformation day by day as you build healthy habits and improve your well-being.',
        motine:'“Self-care isn’t selfish—it’s necessary.”'
    },
    {
        id: 3,
        imageSrc: require('../../../../assets/images/EPDSwel03.png'),
        title: 'Connect and Empower',
        description:
            'Join a supportive community of moms and share your journey together.',
        motine:'“Every small step adds up to big changes.”'
    },
    {
        id: 4,
        imageSrc: require('../../../../assets/images/EPDSwel04.png'),
        title: 'Simple and Fun Activities',
        description:
            'Busy schedule? No problem! Enjoy quick and effective tasks designed just for you.',
        motine:'"You are not alone, and this moment is not forever."'
    },
];

const WelcomeScreen = () => {
    const { theme } = useTheme() as { theme: any };
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();

    const handleNext = () => {
        if (currentScreen === onboardingEPDSData.length - 1) {
            router.replace('/Components/EPDS/SubComponents/ChooseActivities');
        } else {
            setCurrentScreen(currentScreen + 1);
        }
    };

    const currentData = onboardingEPDSData[currentScreen];

    return (
        <BlurView intensity={50} style={[styles.blurView, { backgroundColor: theme.background }]}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Welcome to Your</Text>
                <Text style={styles.headerTitle}>Wellness Journey!</Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <Text style={styles.contentText}>
                    Let's take the first step toward a happier, healthier you.
                </Text>
                <Text style={styles.contentTextBig}>
                    "This app is here to support you every step of the way, so you never feel alone."
                </Text>
            </View>

            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={[styles.midContainer]}>
                    <View style={[styles.slide, { width }]}>
                    <Text style={[styles.title, ]}>{currentData.title}</Text>
                        <Text style={[styles.description, { color: theme.textSecondary }]}>
                            {currentData.description}
                        </Text>
                        <Image source={currentData.imageSrc} style={styles.image} resizeMode="contain" />
                        
                    </View>

                    {/* Pagination Dots */}
                    <View style={styles.pagination}>
                        {onboardingEPDSData.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setCurrentScreen(index)}
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor: currentScreen === index ? theme.activeDot : theme.dot,
                                        width: currentScreen === index ? 20 : 10,
                                        height: currentScreen === index ? 5 : 5,
                                        borderRadius: currentScreen === index ? 10 : 10,
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </View>
                {/* Motivational Quote */}
                <View style={styles.quoteContainer}>
                    <Text style={styles.quoteText}>{currentData.motine}</Text>
                </View>
                {/* Next Button */}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.buttonBackground }]}
                    onPress={handleNext}
                >
                    <Text style={[styles.buttonText, { color: theme.buttonText }]}>
                        {currentScreen === onboardingEPDSData.length - 1 ? 'Choose Activities' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    blurView: {
        flex: 1,
        
    },
    container: {
        flex: 1,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    midContainer: {
        marginTop:0,
        backgroundColor: "#fff",
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width:350,
        padding:0,
        height:400
        
    },
    header: {
        
        marginTop:20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#272727',
        textAlign: 'center',
    },
    content: {
        
        margin:20,
    },
    contentText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color:"#016A70"
    },
    contentTextBig: {
        fontSize: 18,
        color: '#666',
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 10,
    },
    quoteContainer: {
        marginTop: 30,
        marginBottom: 20,
        margin:10
    },
    quoteText: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
    },
    slide: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 20,
        color:"#666"
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
    },
    dot: {
        marginHorizontal: 5,
    },
    button: {
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 20,
        width: '90%',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;