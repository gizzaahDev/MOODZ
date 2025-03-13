import React, { useEffect } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import LottieView from "lottie-react-native";
import { useTheme } from './ThemeContext';


export default function Index() {
  const router = useRouter();
  const { theme } = useTheme() as { theme: any };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {

        await new Promise((resolve) => setTimeout(resolve, 4000));
        // Check onboarding and login status
        const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
        const loggedIn = await AsyncStorage.getItem("userLoggedIn");

        // Check Firebase User
        const firebaseUser = auth().currentUser;

        if (loggedIn === "true" && firebaseUser) {
          const userEmail = firebaseUser.email || "Unknown User";

          // Show toast with user email
          ToastAndroid.show(
            `Welcome back, ${userEmail}!`,
            ToastAndroid.SHORT
          );

          // Redirect to Home screen
          router.replace("/(tabs)");
        } else if (hasSeenOnboarding === "true") {
          // Redirect to Login screen
          router.replace("/Auth/Login");
        } else {
          // Redirect to Onboarding screen
          router.replace("/OnboardingScreen/Onboarding");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={[styles.container,{ backgroundColor: theme.background }]}>
      {/* Custom Loading Animation */}
      <LottieView
        source={require("../assets/lottie/SplashLoading.json")} // Path to your animation file
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  animation: {
    width: 300,
    height: 300, // Adjust size as needed
  },
});
