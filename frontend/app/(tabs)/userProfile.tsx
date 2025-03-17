import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { Switch } from 'react-native'; // Use built-in Switch

const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [notificationSoundEnabled, setNotificationSoundEnabled] = useState(true);
  const [password, setPassword] = useState(''); // State to store the user's password

  // Fetch user data on component mount
  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userLoggedIn');
      await auth().signOut();
      ToastAndroid.show('You have been successfully logged out.', ToastAndroid.SHORT);
      router.replace('/Auth/Login');
    } catch (error) {
      console.error('Error logging out:', error);
      ToastAndroid.show('Failed to log out. Please try again.', ToastAndroid.SHORT);
    }
  };

  // Handle Delete Account
  const handleDeleteAccount = async () => {
    try {
      const currentUser = auth().currentUser;

      // Prompt the user to enter their password
      Alert.prompt(
        'Re-authenticate',
        'Please enter your password to confirm account deletion:',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: async (password) => {
              try {
                // Create a credential with the user's email and password
                const credential = auth.EmailAuthProvider.credential(
                  currentUser.email,
                  password
                );

                // Re-authenticate the user
                await currentUser.reauthenticateWithCredential(credential);

                // Delete the account
                await currentUser.delete();
                await AsyncStorage.removeItem('userLoggedIn');
                ToastAndroid.show('Account deleted successfully.', ToastAndroid.SHORT);
                router.replace('/Auth/Login');
              } catch (error) {
                console.error('Error deleting account:', error);
                ToastAndroid.show('Failed to delete account. Please try again.', ToastAndroid.SHORT);
              }
            },
          },
        ],
        'secure-text' // Use secure-text input for password
      );
    } catch (error) {
      console.error('Error deleting account:', error);
      ToastAndroid.show('Failed to delete account. Please try again.', ToastAndroid.SHORT);
    }
  };

  // Handle Notification Sound Toggle
  const toggleNotificationSound = (value) => {
    setNotificationSoundEnabled(value);
    AsyncStorage.setItem('notificationSoundEnabled', value.toString());
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* User Profile Image */}
      <Image
        source={{ uri: user.photoURL || 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />

      {/* User Name */}
      <Text style={styles.userName}>{user.displayName || 'User Name'}</Text>

      {/* User Email */}
      <Text style={styles.userEmail}>{user.email}</Text>

      {/* Notification Sound Toggle */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Notification Sound</Text>
        <Switch
          value={notificationSoundEnabled}
          onValueChange={toggleNotificationSound}
          trackColor={{ false: '#FF6347', true: '#4CAF50' }}
          thumbColor={'#FFF'}
        />
      </View>

      {/* Delete Account Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>

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
    backgroundColor: '#F5F5F5',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});