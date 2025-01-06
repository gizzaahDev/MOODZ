import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';

const UserProfile = () => {
  const router = useRouter(); // Use router for navigation

  // Handle Logout
  const handleLogout = async () => {
    try {
      // Remove login state
      await AsyncStorage.removeItem("userLoggedIn"); // Clear login status

      // Firebase Sign-out
      await auth().signOut(); // Sign out user from Firebase

      ToastAndroid.show(
              "You have been successfully logged out.",
              ToastAndroid.SHORT // or ToastAndroid.LONG for a longer display
              
            );
      // Show success message
      

      // Navigate to login screen
      router.replace("/Auth/Login");
    } catch (error) {
      console.error("Error logging out:", error);
      ToastAndroid.show(
        "Failed to log out. Please try again.",
        ToastAndroid.SHORT // or ToastAndroid.LONG for a longer display
        
      );
      // Show error message
      
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF6347', // Tomato color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
