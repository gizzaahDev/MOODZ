import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, ToastAndroid } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import auth from '@react-native-firebase/auth';


export default function Home() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userLoggedIn"); // Clear login status
      await auth().signOut(); // Sign out from Firebase
      ToastAndroid.show(
        "Logged Out, You have been successfully logged out.",
        ToastAndroid.SHORT // or ToastAndroid.LONG for a longer display

      );

      router.replace("/Auth/Login"); // Redirect to the login screen
    } catch (error) {
      console.error("Error logging out:", error);
      ToastAndroid.show(
        "Error, Failed to log out. Please try again.",
        ToastAndroid.SHORT // or ToastAndroid.LONG for a longer display

      );

    }
  };

  {/* onPress={() => router.push('/Components/DAS/Questionnaire')} */ }
  {/* onPress={() => router.push('/Components/GDS/Questionnaire')} */ }
  return (
    

        

        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userIcon: {
    width: 40,
    height: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  Heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonWrapper: {
    alignItems: 'center', // Center the button and text
  },
  button: {
    backgroundColor: '#016A70',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center', // Center the icon inside the button
    height: 70, // Adjust button height
    width: 70,
  },
  buttonText: {
    color: '#555',
    fontWeight: 'bold',
    marginTop: 5, // Space between the button and text
    textAlign: 'center',
  },
  scrollView: {
    marginTop: 20,
  },
  paragraphContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  paragraphTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraphDescription: {
    fontSize: 16,
    color: '#333',
  },
});
